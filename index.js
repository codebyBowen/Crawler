require("dotenv").config();
const { crawler } = require("./crawler");
const { getFile } = require("./download");
const { whisper } = require("./whisper");
const { downloadYoutubeVideoCapture } = require("./videoCaptionsCrawler");
(async () => {
  // const url = 'https://www.youtube.com/@chuchushoeTW/videos';
  // const videos = await crawler(url)

  // const text = await whisper();

    // for(let url of videos) {
    //   await getFile(url)
    // }
    const capture = downloadYoutubeVideoCapture("BUBjPPU9NwQ");
})();
