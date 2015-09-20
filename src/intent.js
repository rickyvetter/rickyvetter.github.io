import { Rx } from '@cycle/core';

export default function intent(DOM) {
    return {
        mouseClickBackground: DOM.select('.rv-container').events('mousedown')
            .filter((me) => me.target.classList.contains('rv-container')),
        updateBackgroundColor: Rx.Observable.merge(
                // color changes on mouse move
                DOM.select('.rv-container').events('mousemove')
                    .map((me) => {
                        // normalizing to number between 0 and 1
                        const distX = Math.abs((me.clientX / window.innerWidth * 2) - 1);
                        const distY = Math.abs((me.clientY / window.innerHeight * 2) - 1);
                        return {
                            red: Math.floor(distX * 60) + 40,
                            blue: Math.floor(distY * 60) + 40
                        };
                    }),
                // allow tilt to change background as well
                Rx.Observable.fromEvent(window, "deviceorientation")
                    .filter((tiltData) => tiltData.beta || tiltData.gamma)
                    .map((tiltData) => {
                        // normalizing to number between 0 and 1
                        const distX = Math.abs(((tiltData.beta + 180) / 360 * 2) - 1);
                        const distY = Math.abs(((tiltData.gamma + 180) / 360 * 2) - 1);
                        return {
                            red: Math.floor(distX * 60) + 40,
                            blue: Math.floor(distY * 60) + 40
                        };
                    })
            )
            .startWith({
                red: 100,
                blue: 100
            })
    };
}
