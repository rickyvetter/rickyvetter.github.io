import { Rx } from '@cycle/core';

const nullCoords = {
    x: 0,
    y: 0
};

export default function intent(DOM) {
    return {
        mouseClickBackground: DOM.select('.rv-container').events('mousedown')
            .filter((me) => me.target.classList.contains('rv-container')),
        mouseMoveBackground: Rx.Observable.merge(
                DOM.select('.rv-container').events('mousemove')
                    .map((me) => {
                        return {
                            x: me.clientX,
                            y: me.clientY
                        };
                    }),
                // allow tilt to change background as well
                Rx.Observable.fromEvent(window, "deviceorientation")
                    .filter((tiltData) => tiltData.beta || tiltData.gamma)
                    .map((tiltData) => {
                        return {
                            x: tiltData.beta,
                            y: tiltData.gamma
                        };
                    })
            )
            .startWith(nullCoords)
    };
}
