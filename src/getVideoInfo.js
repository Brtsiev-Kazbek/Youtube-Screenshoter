/**
 * @description Получает текст из первого существующего на странице элемента, чьи селекторы передаются в selectors.
 * @param {HTMLElement} root Корневой элемент, внутри которого нужно искать селекторы.
 * @param {string[]} selectors Массив селекторов, по которым хотим найти элемент.
 * @returns {string} Возвращает текстовое содержимое первого встреченного на странице элемента из селекторов.
 */
const getElementText = (root, selectors) => {
    let text = '';
    if (!root) return text;

    for (let i = 0; i < selectors.length; i++) {
        let selector = selectors[i];
        let elem = root.querySelector(selector);
        if (!elem) continue;

        text = elem.textContent;
        break;
    }

    return text;
};

/**
 * @description Собирает информацию а названии канала, названии видео и текущего времени воспроизведения.
 * @returns {object} Объект информации о текущем видео.
 */
const getVideoInfo = () => {
    const root = document.querySelector('#movie_player');
    const channel = getElementText(root, [
        '.ytp-ce-channel-title',
        '.iv-branding-context-name',
        '.ytp-title-expanded-title'
    ]);
    const title = getElementText(root, ['.ytp-title-link']);
    const currentTime = root?.querySelector('video')?.currentTime ?? 0;

    return { channel, title, currentTime };
};

export { getElementText, getVideoInfo };
