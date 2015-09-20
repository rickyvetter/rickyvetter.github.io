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
                const distX = Math.abs((mouseLocation.x / window.innerWidth * 2) - 1);
                const distY = Math.abs((mouseLocation.y / window.innerHeight * 2) - 1);
                const red = Math.floor(distX * 60) + 40;
                const blue = Math.floor(distY * 60) + 40;
                const colors = {
                    purple: `rgb(${red}, 0, ${blue})`,
                    white: '#ddd'
                };

                return {
                    color: isPurple ? colors.purple : colors.white,
                    backgroundColor: isPurple ? colors.white : colors.purple
                };
            }
        );
}
