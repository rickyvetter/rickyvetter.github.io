import { Rx } from '@cycle/core';

let isPurple = Math.random() < 0.5;

export default function model(actions) {
    return Rx.Observable
        .combineLatest(
            actions.mouseClickBackground
                .map(() => {
                    isPurple = !isPurple;
                    return isPurple;
                })
                .startWith(isPurple),
            actions.updateBackgroundColor,
            (isPurple, {red, blue}) => {
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
