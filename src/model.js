import { Rx } from '@cycle/core';

let bool = true;

export default function model(actions) {
    return Rx.Observable
        .combineLatest(
            actions.mouseClickBackground.startWith(false)
                .map(() => {
                    // TODO fix this weird state
                    bool = !bool;
                    return bool;
                }),
            actions.mouseMoveBackground.startWith({
                x: 0,
                y: 0
            }),
            (click, move) => {
                var distX = Math.abs((move.x / window.innerWidth * 2) - 1);
                var distY = Math.abs((move.y / window.innerHeight * 2) - 1);
                var purp = `rgb(${Math.floor(distX * 60) + 40}, ${0}, ${Math.floor(distY * 60) + 40})`;
                var white = '#eee';
                return {
                    color: click ? purp : white,
                    backgroundColor: click ? white : purp
                };
            }
        );
}
