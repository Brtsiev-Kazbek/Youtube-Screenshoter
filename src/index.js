import {captureOnKeys} from './capture.js'
import {insertButton} from './insertButton.js'

function main() {
    setTimeout(insertButton, 2000)
    captureOnKeys(
        "ControlLeft",
        "KeyQ"
    );
}

main()