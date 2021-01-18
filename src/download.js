export const createAnchor = (url, fileName) => {
    let anchor = document.createElement('a');
    anchor.href = url;
    anchor.setAttribute('download', fileName);
    anchor.className = 'download-js';
    anchor.innerHTML = 'downloading...';
    anchor.style.display = 'none';
    anchor.addEventListener('click', e => e.stopPropagation(), { once: true });

    return anchor;
};

export const saveDownload = (url, fileName) => {
    let anchor = createAnchor(url, fileName);
    document.body.appendChild(anchor);

    setTimeout(function() {
        anchor.click();
        document.body.removeChild(anchor);
    }, 66);

    return true;
};