import { Rx } from '@cycle/core';

let isPurple = Math.random() < 0.5;

export default function model(actions) {
    return Rx.Observable
        .combineLatest(
            actions.mouseClickBackground.startWith(true)
                .map(() => {
                    isPurple = !isPurple;
                    return isPurple;
                })
                .startWith(isPurple),
            actions.mouseMoveBackground,
            (isPurple, mouseLocation) => {
                var distX = Math.abs((mouseLocation.x / window.innerWidth * 2) - 1);
                var distY = Math.abs((mouseLocation.y / window.innerHeight * 2) - 1);
                let colors = {
                    purple: `rgb(${Math.floor(distX * 60) + 40}, 0, ${Math.floor(distY * 60) + 40})`,
                    white: '#ddd'
                };

                return {
                    color: isPurple ? colors.purple : colors.white,
                    backgroundColor: isPurple ? colors.white : colors.purple
                };
            }
        );
}
