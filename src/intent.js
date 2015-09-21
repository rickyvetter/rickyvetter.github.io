import { Rx } from '@cycle/core';

export default function intent(DOM) {
    return {
        mouseClickBackground: DOM.select('.rv-container').events('mousedown')
            .filter((me) => me.target.classList.contains('rv-container')),
        updateBackgroundColor: Rx.Observable.merge(
                // color changes on mouse move
                DOM.select('.rv-container').events('mousemove')
                    // normalizing to number between 0 and 1
                    .map((me) => ({
                            distX: me.clientX / window.innerWidth,
                            distY: me.clientY / window.innerHeight
                        })
                    ),
                // allow tilt to change background as well
                Rx.Observable.fromEvent(window, 'deviceorientation')
                    // this gives a lot of data, so we throttle it
                    .throttleFirst(50)
                    .filter((tiltData) => tiltData.beta || tiltData.gamma)
                    // normalizing to number between 0 and 1
                    .map((tiltData) => ({
                            distX: (tiltData.beta + 180) / 360,
                            distY: (tiltData.gamma + 180) / 360
                        })
                    )
            )
            .map(({distX, distY}) => ({
                    red: Math.floor(distX * 60) + 40,
                    blue: Math.floor(distY * 60) + 40
                })
            )
            .startWith({
                red: 100,
                blue: 100
            })
    };
}
