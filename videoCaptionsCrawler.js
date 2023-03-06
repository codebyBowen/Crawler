const axios = require('axios');
const fs = require('fs');

exports.downloadYoutubeVideoCapture = (videoId) => {
  const options = {
    method: 'GET',
    url: 'https://subtitles-for-youtube.p.rapidapi.com/subtitles/BUBjPPU9NwQ.srt',
    params: {lang: 'en'},
    headers: {
      'X-RapidAPI-Key': `${process.env.X_RapidAPI_Key}`,
      'X-RapidAPI-Host': 'subtitles-for-youtube.p.rapidapi.com'
    }
  };

  return axios
    .request(options)
    .then(function (response) {
      fs.writeFile(`./Captures/${videoId}_output.txt`, response.data, function (err) {
        if (err) {
          console.error(err);
        } else {
          console.log('Response data saved to output.txt');
        }
      });
    })
    .catch(function (error) {
      console.error(error);
    });
}




