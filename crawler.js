const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const axios = require("axios");

// crawl all video urls of one channel
exports.crawler = async (url) => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto(url);
  const html = await page.content();
  const results = parse(html);
  const captions = fetchCaptions(results);

  await browser.close();
  return captions;
};

const parse = (html) => {
  const $ = cheerio.load(html);
  let results = [];
  $("#contents  ytd-rich-item-renderer").each((i, link) => {
    results.push(
      "https://www.youtube.com" + $(link).find("#thumbnail").attr("href")
    );
  });
  console.log("result", results, results.length);
  return results;
};

const fetchCaptions = async (urls) => {
  for (const url of urls) {
    const browser = await puppeteer.launch({
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();
    const captionDownloadUrl = `https://downsub.com/?url=${urlEncode(url)}`;
    console.log("encodeUrl", captionDownloadUrl);
    await page.goto(captionDownloadUrl);
    const html = await page.content();
    const $ = cheerio.load(html);
    // test only youtube data api but needs google project api key
    // try {
    //   axios.get(`https://www.googleapis.com/youtube/v3/captions/MR-XnSMxuQY`)
    //   .then((res) => console.log(res))
    // } catch (error) {
    //   console.log('error:', error)
    // }
    // $('.layout.justify-start.align-center button').each((i, btn) => btn.click())
    // $('#contents  ytd-rich-item-renderer').each((i, link) => {
    //   console.log('link', link)
    //   results.push('https://www.youtube.com' + $(link).find('#thumbnail').attr('href'))
    // })
  }
};

const urlEncode = (url) => {
  let newUrl = url;
  newUrl = url
    .replaceAll("/", "%2F")
    .replaceAll(":", "%3A")
    .replaceAll("=", "%3D")
    .replaceAll("?", "%3F");
  //   let mapObj = {
  //     "/":"%2F",
  //     ":":"%3A",
  //     "=":"%3D",
  //     "?":"%3F"
  //  };
  // let re = new RegExp(Object.keys(mapObj).join("|"),"gi");
  // str = str.replaceAll(re, function(matched){
  //   return mapObj[matched];
  // });
  return newUrl;
};
