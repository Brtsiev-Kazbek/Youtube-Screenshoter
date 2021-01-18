import {saveDownload} from './download.js'
import {createFilename} from './fileName.js'

export const capture = () => {
    let root = document.querySelector('#primary.ytd-watch-flexy')
    let uploadInfo = root.querySelector('#upload-info')
    let video = document.querySelector('video');
    let canvas = document.createElement('canvas')
    let ctx = canvas.getContext('2d')
    let title = root.querySelector('.title.style-scope') ? document.querySelector('.title.style-scope')?.innerText : document.querySelector('.ytp-title-link.yt-uix-sessionlink')?.innerText
    let videoCurrentTime = video.currentTime
    let channel = uploadInfo.querySelector('.yt-simple-endpoint.yt-formatted-string') ? uploadInfo.querySelector('.yt-simple-endpoint.yt-formatted-string').innerHTML : document.querySelector('.ytp-ce-channel-title.ytp-ce-link')?.innerHTML;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
        let link = URL.createObjectURL(blob)
        saveDownload(link, createFilename(channel, title, videoCurrentTime));
    }, "image/png");
}

export const captureOnKeys = (...codes) => {
    let pressed = new Set();

    document.addEventListener('keydown', function(event) {
      pressed.add(event.code);

      for (let code of codes) {
        if (!pressed.has(code)) {
          return;
        }
      }

      
      pressed.clear();

      capture();
    });

    document.addEventListener('keyup', function(event) {
      pressed.delete(event.code);
    });

}