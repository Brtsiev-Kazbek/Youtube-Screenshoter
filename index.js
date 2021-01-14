const createAnchor = (url, fileName) => {
    let anchor = document.createElement('a');
    anchor.href = url;
    anchor.setAttribute('download', fileName);
    anchor.className = 'download-js';
    anchor.innerHTML = 'downloading...';
    anchor.style.display = 'none';
    anchor.addEventListener('click', e => e.stopPropagation(), { once: true });

    return anchor;
};

const saveDownload = (url, fileName) => {
    let anchor = createAnchor(url, fileName);
    document.body.appendChild(anchor);

    setTimeout(function() {
        anchor.click();
        document.body.removeChild(anchor);
    }, 66);

    return true;
};

const createFilename = (title, seconds) => {
    return `${title} (${new Date(seconds * 1000).toISOString().substr(11, 8)}).png`;
}

const capture = () => {
    let video = document.querySelector('video');
    let canvas = document.createElement('canvas')
    let ctx = canvas.getContext('2d')
    let title = document.querySelector('.title .style-scope').innerText
    let videoCurrentTime = video.currentTime

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
        let link = URL.createObjectURL(blob)
        saveDownload(link, createFilename(title, videoCurrentTime));
        createMiniature(link)
    }, "image/png");

}

const insertButton = () => {
    let controls = document.querySelector('.ytp-right-controls')
    let captureButton = document.createElement('div');

    captureButton.setAttribute('class', 'ytp-button')
    captureButton.setAttribute('style', 'font-size: 1.6em');
    captureButton.innerHTML = '&#128247;'

    controls.insertAdjacentElement('afterbegin', captureButton)
    captureButton.addEventListener('click', capture)
}

const createMiniature = (link) => {

}

const captureOnKeys = (...codes) => {
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

  insertButton()
  captureOnKeys(
    "ControlLeft",
    "KeyQ"
  );