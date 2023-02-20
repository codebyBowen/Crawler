const { crawler } = require('./crawler')
const { getFile } = require('./download')
;(async () => {
  const url = 'https://www.youtube.com/@HLights/videos'
  const videos = await crawler(url)

//   for(let url of videos) {
//     await getFile(url)
//   }
})()