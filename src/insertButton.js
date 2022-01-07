import { capture } from './capture.js';

export const insertButton = () => {
    let controls = document.querySelector('.ytp-right-controls');
    let captureButton = document.createElement('div');

    captureButton.setAttribute('class', 'ytp-button');
    captureButton.setAttribute('style', 'font-size: 1.6em; text-align: center;');
    captureButton.innerHTML = '&#128247;';

    controls.insertAdjacentElement('afterbegin', captureButton);
    captureButton.addEventListener('click', capture);
};
