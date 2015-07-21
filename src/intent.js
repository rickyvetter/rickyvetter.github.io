import { Rx } from '@cycle/core';

export default function intent(DOM) {
    return {
        changeDetail: Rx.Observable.timer(0, 2000)
            .timeInterval()
            .map((x) => x.value),
        updateBackground: Rx.Observable.timer(0, 1000) // TODO: make requestAnimationFrom
            .timeInterval()
            .map((x) => {
                return {
                    r: (100 + x.value) % 255,
                    g: 0,
                    b: 255
                };
            }),
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
