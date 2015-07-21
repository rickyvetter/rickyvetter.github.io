import { Rx } from '@cycle/core';

export default function intent(DOM) {
    return {
        mouseClickBackground: Rx.Observable.fromEvent(
            document.getElementById('app'),
            'mousedown',
            (me) => {
                // console.log('ricky', me.target.classlist.contains('rv-container'));
                if(me[0].target.classList.contains('rv-container')) {
                    return true;
                }
                return false;
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
