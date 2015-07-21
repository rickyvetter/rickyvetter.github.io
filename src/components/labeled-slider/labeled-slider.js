import { Rx } from '@cycle/core';
import { h } from '@cycle/web';

export default function labeledSlider(responses) {
    function intent(DOM) {
        return {
            changeValue$: DOM.get('.slider', 'input')
                .map(ev => ev.target.value).share()
        };
    }

    function model(context, actions) {
        let props$ = context.props.getAll();
        return Rx.Observable.combineLatest(props$,
            (props) => { return {props}; }
        );
    }

    function view(state$) {
        return state$.map(state => {
            let {label, unit, min, max} = state.props;
            let value = state.value;
            return h('div.labeled-slider', [
                h('span.label', [label + ' ' + value + unit]),
                h('input.slider', {type: 'range', min, max, value})
            ]);
        });
    }

    let actions = intent(responses.DOM);
    let vtree$ = view(model(responses, actions));

    return {
        DOM: vtree$,
        events: {
            newValue: actions.changeValue$
        }
    };
}
