const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

// crawl captions of one link
exports.videoCaptionsCrawler = async (url) => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto(url);
  const html = await page.content();
  // click captions btn and crawl captions
  const results = fetchInfo(html);

  await browser.close();
  return results;
};

const fetchInfo = (html) => {
  const $ = cheerio.load(html);
  let urls = [];
  let results = [];
  $("#contents  ytd-rich-item-renderer").each((i, link) => {
    urls.push(
      "https://www.youtube.com" + $(link).find("#thumbnail").attr("href")
    );
  });
  
};
