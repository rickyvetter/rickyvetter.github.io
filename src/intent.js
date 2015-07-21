import { Rx } from '@cycle/core';

export default function intent(DOM) {
    return {
        mouseClickBackground: Rx.Observable.fromEvent(
            document.getElementById('app'),
            'mousedown',
            (me) => {
                return;
            }
        ),
        mouseMoveBackground: Rx.Observable.fromEvent(
            document.getElementById('app'),
            'mousemove',
            (me) => {
                return {
                    x: me[0].clientX,
                    y: me[0].clientY
                };
            }
        )
    };
}

console.log(Object.keys(Rx.Observable).sort());
