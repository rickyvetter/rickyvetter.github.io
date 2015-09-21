/** @jsx hJSX */
import { Rx } from '@cycle/core';
import { hJSX } from '@cycle/dom';

const headerStyles = {
    fontSize: '4em'
};

export default function header(responses) {
    function intent() {
        return {};
    }

    function model(context) {
        const props$ = context.props.getAll();
        return Rx.Observable.combineLatest(props$,
            (props) => ({props})
        );
    }

    function view(state$) {
        return state$.map(() => {
            return (
                <header
                    style={headerStyles}
                    className='site-header'>
                    <h1 className='title'>Ricky Vetter</h1>
                </header>
            );
        });
    }

    const actions = intent(responses.DOM);
    const state = model(responses, actions);
    const vtree$ = view(state);

    return {
        DOM: vtree$,
        events: {}
    };
}
