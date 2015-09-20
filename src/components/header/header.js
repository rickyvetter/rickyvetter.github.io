import { Rx } from '@cycle/core';
import { h } from '@cycle/dom';

const headerStyles = {
    fontSize: '4em'
};

export default function header(responses) {
    function intent(DOM) {
        return {};
    }

    function model(context, actions) {
        const props$ = context.props.getAll();
        return Rx.Observable.combineLatest(props$,
            (props) => { return {props}; }
        );
    }

    function view(state$) {
        return state$.map(state => {
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
