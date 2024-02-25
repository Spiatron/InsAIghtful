import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function strict_response(
  system_prompt,
  user_prompt,
  output_format,
  units = undefined,
  model = "gpt-3.5-turbo",
  temperature = 1,
  num_tries = 3,
  verbose = false
) {
  // if the user input is in a list, we also process the output as a list of json
  const list_input = Array.isArray(user_prompt);
  // if the output format contains dynamic elements of < or >, then add to the prompt to handle dynamic elements
  const dynamic_elements = /<.*?>/.test(JSON.stringify(output_format));
  // if the output format contains list elements of [ or ], then we add to the prompt to handle lists
  const list_output = /\[.*?\]/.test(JSON.stringify(output_format));

  for (let i = 0; i < num_tries; i++) {
    console.count("GPT CALL");
    if (i == 1) {
      console.log("Second Try");
    }
    if (i == 2) {
      console.log("Third Try");
    }
    let output_format_prompt = `\nYou are to output ${
      list_output && "an array of objects in"
    } the following in json format: ${JSON.stringify(
      output_format
    )}. \nDo not put quotation marks or escape character \\ in the output fields.`;

    if (list_output) {
      output_format_prompt += `\nIf output field is a list, classify output into the best element of the list.`;
    }

    if (dynamic_elements) {
      output_format_prompt += `\nAny text enclosed by < and > indicates you must generate content to replace it. Example input: Go to <location>, Example output: Go to the garden\nAny output key containing < and > indicates you must generate the key name to replace it. Example input: {'<location>': 'description of location'}, Example output: {school: a place for education}`;
    }

    if (list_input) {
      output_format_prompt += `\nGenerate an array of json, one json for each input element with proper JSON Format.`;
    }

    const response = await openai.createChatCompletion({
      temperature: temperature,
      model: model,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: system_prompt + output_format_prompt,
        },
        { role: "user", content: user_prompt.toString() },
      ],
    });

    const res = response.data.choices[0].message.content;
    console.log(res);

    if (verbose) {
      console.log("System prompt:", system_prompt + output_format_prompt);
      console.log("\nUser prompt:", user_prompt);
      console.log("\nGPT response:", res);
    }

    // try-catch block to ensure output format is adhered to
    try {
      let output = JSON.parse(res);

      if (output.units) {
        if (units == 0 && output.units < 4) {
          console.log("There are less than 4 units in the whole course.");
          continue;
        }
        if (units > 0 && output.units < units) {
          console.log("There are less units than requested in the course.");
          continue;
        }
      }

      if (output.questions && output.questions.length < 3) {
        console.log("There are less than 3 questions in the data.");
        continue;
      }

      if (
        output.summary &&
        (output.summary.split(/\s+/).filter(Boolean).length < 50 ||
          output.summary.split(/\s+/).filter(Boolean).length > 250)
      ) {
        console.log(
          "No summary in the data or the summary length is not within the desired range."
        );
        continue;
      }

      console.log(output);
      return output;
    } catch (e) {
      console.log("An exception occurred:", e);
      console.log("Current invalid json format ", res);
    }
  }

  return [];
}
