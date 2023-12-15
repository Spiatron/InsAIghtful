import { YoutubeTranscript } from "youtube-transcript";
// import { strict_output } from "./gpt";

export async function searchYouTube(searchQuery) {
  searchQuery = searchQuery.replaceAll(" ", "+");
  console.count("youtube search");
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API_KEY}&q=${searchQuery}&videoDuration=medium&videoEmbeddable=true&type=video&maxResults=5&regionCode=US`,
    {
      method: "GET",
    }
  );
  const json = await response.json();
  if (!json) {
    console.log("youtube fail");
    return null;
  }
  if (json.items[0] == undefined) {
    console.log("youtube fail");
    return null;
  }
  return json.items[0].id.videoId;
}

export async function getTranscript(videoID) {
  try {
    let transcript_arr = await YoutubeTranscript.fetchTranscript(videoID, {
      lang: "en",
      country: "EN",
    });
    let transcript = "";
    for (let t of transcript_arr) {
      transcript += t.text + " ";
    }
    return transcript.replaceAll("\n", "");
  } catch (error) {
    return "";
  }
}

// export async function getQuestionsFromTranscript(transcript, course_title) {
//   let questions;
//   questions = await strict_output(
//     "You are a helpful AI that is able to generate mcq questions and answers, the length of each answer should not be more than 15 words, store all answers and questions and options in a JSON array",
//     new Array(3).fill(
//       `You are to generate a random hard mcq question about ${course_title} with context of the following transcript: ${transcript}.`
//     ),
//     {
//       question: "question",
//       answer: "answer with max length of 15 words",
//       option1: "option1 with max length of 15 words",
//       option2: "option2 with max length of 15 words",
//       option3: "option3 with max length of 15 words",
//     }
//   );
//   console.log(questions);
//   return questions;
// }
