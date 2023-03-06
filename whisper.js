const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

exports.whisper = async function transcribeAudio(model = "whisper-1") {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  const file = fs.createReadStream("./mp3/Japanese.mp3");

  const form = new FormData();
  form.append("model", model);
  form.append("file", file, { filename: "openai.mp3" });
  const path = require("path");

  const filePath = "./transcribingText/transcription.txt";

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/audio/transcriptions",
      form,
      {
        headers: {
          ...form.getHeaders(),
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    fs.writeFile(filePath, JSON.stringify(response.data), (err) => {
      if (err) throw err;
      console.log("Transcription saved to desktop!");
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error transcribing audio");
  }
}
