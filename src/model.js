import { Rx } from '@cycle/core';

let bool = Math.random() < 0.5;

export default function model(actions) {
    return Rx.Observable
        .combineLatest(
            actions.mouseClickBackground.startWith(true)
                .map((onTarget) => {
                    // TODO fix this weird state
                    if(onTarget) {
                        bool = !bool;
                    }
                    return bool;
                }),
            actions.mouseMoveBackground,
            (click, move) => {
                var distX = Math.abs((move.x / window.innerWidth * 2) - 1);
                var distY = Math.abs((move.y / window.innerHeight * 2) - 1);
                let colors = {
                    purple: `rgb(${Math.floor(distX * 60) + 40}, ${0}, ${Math.floor(distY * 60) + 40})`,
                    white: '#ddd'
                };

                return {
                    color: click ? colors.purple : colors.white,
                    backgroundColor: click ? colors.white : colors.purple
                };
            }
        );
}
