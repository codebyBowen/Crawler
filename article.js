const fs = require("fs");
const axios = require("axios");
const readline = require("readline");

//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
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const generateText = async (prompt, model, length) => {
  const response = await axios.post("https://api.openai.com/v1/completions", {
    prompt: prompt,
    max_tokens: length,
    n: 1,
    stop: null,
    temperature: 0.5
  }, {
    headers: {
      "Authorization": `Bearer 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`,
      "Content-Type": "application/json"
    }
  });

  return response.data.choices[0].text;
};

rl.question("请输入关键词：", async keyword => {
  rl.question("请输入文章字数：", async length => {
    const text = await generateText(`${keyword}`, "text-davinci-002", length);
    console.log(text);
    fs.writeFileSync(`${process.env.HOME}/Desktop/${keyword}.txt`, text);
    console.log(`文件已保存在桌面，文件名为 ${keyword}.txt`);
    rl.close();
  });
});
