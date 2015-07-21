import { Rx } from '@cycle/core';

export default function model(actions) {
    return Rx.Observable
        .combineLatest(
            actions.changeDetail.startWith(''),
            actions.updateBackground.startWith({
                r: 210,
                g: 10,
                b: 220
            }),
            actions.mouseMoveBackground.startWith({
                x: 0,
                y: 0
            }),
            (detail, c, mouse, size) => {
                var distX = Math.abs((mouse.x / window.innerWidth * 2) - 1);
                var distY = Math.abs((mouse.y / window.innerHeight * 2) - 1);
                return {
                    mouseColor: `rgb(${Math.floor(distX * 60) + 40}, ${0}, ${Math.floor(distY * 60) + 40})`
                };
            }
        );
}
