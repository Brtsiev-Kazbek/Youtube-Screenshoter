/**
 * @description Утилита для вызова коллбека при нажатии заданной комбинации клавиш.
 * @param {Function} callback Функция-коллбек.
 * @param  {...string} codes Коды клавиш комбинации.
 */
const hotKey = (callback, ...codes) => {
    let pressed = new Set();

    document.addEventListener('keydown', function (event) {
        pressed.add(event.code);

        for (let code of codes) {
            if (!pressed.has(code)) {
                return;
            }
        }

        pressed.clear();

        callback();
    });

    document.addEventListener('keyup', function (event) {
        pressed.delete(event.code);
    });
};

export { hotKey };
