import { strict_response } from "./gpt2.0";

export async function generateCoursePlaylist(course_title, course_units) {
  let unitsPrompt = `Creating a course about ${course_title}. The user has requested chapters for each of the units ${
    course_units.length > 0
      ? `(only include these units: ${course_units})`
      : `(create at least 4 units or more if needed)`
  }. For each chapter, provide a detailed YouTube search query for an informative educational video.`;
  const response = await strict_response(
    "You are an AI capable of curating course content, coming up with relevant chapter titles, and finding relevant youtube videos for each chapter",
    unitsPrompt,
    {
      units: [
        {
          title: "title of the unit",
          chapters: [
            "an array of 3 chapters, each chapter should have a youtube_search_query key and a chapter_title key in the JSON object with proper syntax",
          ],
        },
      ],
    },
    course_units.length
  );
  return response;
}

export async function generateImageSearchTerm(course_title) {
  const response = await strict_response(
    "You are an AI capable of finding the most relevant image search term for a course",
    `Please provide a good image search term for the title of a course about ${course_title}. This search term will be fed into the unsplash API, so make sure it is a good search term that will return good results.`,
    {
      image_search_term: "a good search term for the title of the course",
    }
  );
  return response;
}

export async function generateQuestionsFromTranscript(
  course_title,
  transcript
) {
  const response = await strict_response(
    "You are a helpful AI that is able to generate mcq questions and answers, the length of each answer should not be more than 10 words. For each question, ensure that the options are distinct from the answer.",
    `You are to generate 3 random hard mcq questions with 4 options for each question about ${course_title} with context of the following transcript: "${transcript}".`,
    {
      questions: [
        {
          question: "question",
          answer: "answer with max length of 10 words",
          option1: "option1 with max length of 10 words",
          option2: "option2 with max length of 10 words",
          option3: "option3 with max length of 10 words",
        },
      ],
    }
  );
  return response;
}

export async function generateSummaryFromTranscript(course_title, transcript) {
  const response = await strict_response(
    "You are an AI capable of summarising a youtube transcript, the length of the summary should not be less than 125 and more than 275 words.",
    `Summarise in 300 words or less about ${course_title} with context of the following transcript: "${transcript}". Also, do not talk of the sponsors or anything unrelated to the main topic and do not introduce what the summary is about.`,
    {
      summary:
        "summary of the transcript with min length of 125 and max length of 275",
    }
  );
  return response;
}
