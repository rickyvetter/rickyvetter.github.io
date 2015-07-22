import { Rx } from '@cycle/core';

let bool = true;
let rotation = 0;

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
            actions.mouseMoveBackground.startWith({
                x: 0,
                y: 0
            }),
            actions.mouseWheel.startWith([{
                deltaX: 0
            }])
                .map((me) => {
                    rotation = (rotation + me[0].deltaX) % 255;
                    return rotation;
                }),
            (click, move, rotation) => {
                console.log(rotation);
                var distX = Math.abs((move.x / window.innerWidth * 2) - 1);
                var distY = Math.abs((move.y / window.innerHeight * 2) - 1);
                let colors = {
                    purple: `rgb(${(Math.floor(distX * 60) + 40) + rotation}, ${0 + rotation}, ${(Math.floor(distY * 60) + 40) + rotation})`,
                    white: '#ddd'
                };

                return {
                    color: click ? colors.purple : colors.white,
                    backgroundColor: click ? colors.white : colors.purple
                };
            }
        );
}
