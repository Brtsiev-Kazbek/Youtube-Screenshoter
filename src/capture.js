import { saveDownload } from './download.js';
import { createFilename } from './fileName.js';
import { getVideoInfo } from './getVideoInfo.js';

export const capture = () => {
    let video = document.querySelector('video');
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    let { channel, title, currentTime } = getVideoInfo();

    canvas.toBlob((blob) => {
        let link = URL.createObjectURL(blob);
        saveDownload(link, createFilename(channel, title, currentTime));
        window.setTimeout(() => URL.revokeObjectURL(link), 1000);
    }, 'image/png');
};

export const captureOnKeys = (...codes) => {
    let pressed = new Set();

    document.addEventListener('keydown', function (event) {
        pressed.add(event.code);

        for (let code of codes) {
            if (!pressed.has(code)) {
                return;
            }
        }

        pressed.clear();

        capture();
    });

    document.addEventListener('keyup', function (event) {
        pressed.delete(event.code);
    });
};
