const axios = require("axios");

// const api_key = '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';
// try {
//   axios
//     .get(`
//     https://api.openai.com/v1/models`, {Authorization: `Bearer ${api_key}`})
//     .then((res) => console.log(res));
// } catch (error) {
//   console.log("error:", error);
// }
import { Configuration, OpenAIApi } from "openai";

//SECRET KEY: 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
const configuration = new Configuration({
    organization: "YOUR_ORG_ID",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const response = await openai.listEngines();

var request = require('request');

var options = {
  method: 'POST',
  url: 'https://api.openai.com/v1/engines/text-davinci/completions',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer API_KEY'
  },
  body: JSON.stringify({
    prompt: "Once upon a time",
    max_tokens: 50,
    n: 1,
    stop: "",
    temperature: 0.5
  })
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  console.log(body);
});
