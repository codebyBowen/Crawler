require("dotenv").config();
const { crawler } = require("./crawler");
const { getFile } = require("./download");
const { whisper } = require("./whisper");
const { downloadAllCaptures } = require("./videoCaptionsCrawler");
(async () => {
  // crawler a channel video urls and shrink them into a 5 elements array
  const url = "https://www.youtube.com/@ruriohama/videos";
  const videoUrls = await crawler(url); // array
  const shuffled = videoUrls.sort(() => 0.5 - Math.random()); // Shuffle the array
  const newUrls = shuffled.slice(0, 5); // Take the first five elements

  // get video capture and save in the Capture folder
  downloadAllCaptures(newUrls);
  
  // use open ai to re generate an article
  
})();
