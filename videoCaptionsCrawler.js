const axios = require('axios');
const fs = require('fs');


exports.downloadAllCaptures = async (videoUrls) => {
  try {
    const promises = videoUrls.map(url => {
      const videoId = url.split('=')[1];
      return downloadYoutubeVideoCapture(videoId);
    });
    const results = await Promise.all(promises);
    console.log('All captures downloaded:', results);
  } catch (error) {
    console.error('Error downloading captures:', error);
  }
}

const downloadYoutubeVideoCapture =  (videoId) => {
  const options = {
    method: 'GET',
    url: `https://subtitles-for-youtube.p.rapidapi.com/subtitles/${videoId}.srt`,
    params: {lang: 'en'},
    headers: {
      'X-RapidAPI-Key': `${process.env.X_RapidAPI_Key}`,
      'X-RapidAPI-Host': 'subtitles-for-youtube.p.rapidapi.com'
    }
  };

  return new Promise((resolve, reject) => {
    axios
      .request(options)
      .then(function (response) {
        fs.writeFile(`./Captures/${videoId}_output.txt`, response.data, function (err) {
          if (err) {
            reject(err);
          } else {
            console.log(`Capture for ${videoId} saved to disk`);
            resolve(videoId);
          }
        });
      })
      .catch(function (error) {
        reject(error);
      });
  });
}




