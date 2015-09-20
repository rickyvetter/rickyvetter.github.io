import { Rx } from '@cycle/core';

export default function intent(DOM) {
    return {
        mouseClickBackground: DOM.select('.rv-container').events('mousedown')
            .filter((me) => me.target.classList.contains('rv-container')),
        mouseMoveBackground: DOM.select('.rv-container').events('mousemove')
            .map((me) => {
                return {
                    x: me.clientX,
                    y: me.clientY
                };
            })
            .startWith({
                    x: 0,
                    y: 0
                })
    };
}
