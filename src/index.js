import { insertButton } from './insertButton';
import { capture } from './capture';
import { hotKey } from './hotKey';

function main() {
    setTimeout(insertButton, 2000);
    hotKey(capture, 'ControlLeft', 'KeyQ');
}

main();
