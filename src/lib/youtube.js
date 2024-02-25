import { YoutubeTranscript } from "youtube-transcript";

export async function searchYouTube(searchQuery) {
  searchQuery = searchQuery.replaceAll(" ", "+");
  console.count("youtube search");
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API_KEY}&q=${searchQuery}&videoDuration=medium&videoEmbeddable=true&type=video&maxResults=1&regionCode=US&videoCaption=closedCaption`,
    // `https://yt.lemnoslife.com/noKey/search?q=${searchQuery}&videoDuration=medium&videoEmbeddable=true&type=video&maxResults=1&regionCode=US&videoCaption=closedCaption`,
    {
      method: "GET",
    }
  );
  console.log(response.status);
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

// 403
// {
//   error: {
//     code: 403,
//     message: 'The request cannot be completed because you have exceeded your <a href="/youtube/v3/getting-started#quota">quota</a>.',
//     errors: [ [Object] ]
//   }
// }

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
    transcript.replaceAll("\n", " ");
    const MAX_LENGTH = 500;
    transcript = transcript.split(" ").slice(0, MAX_LENGTH).join(" ");
    return transcript;
  } catch (error) {
    console.log("transcript failed");
    return "";
  }
}
