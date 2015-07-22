import { Rx } from '@cycle/core';
import { h } from '@cycle/web';

const headerStyles = {
    fontSize: '4em'
};

export default function header(responses) {
    function intent(DOM) {
        return {};
    }

    function model(context, actions) {
        let props$ = context.props.getAll();
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

    let actions = intent(responses.DOM);
    let state = model(responses, actions);
    let vtree$ = view(state);

    return {
        DOM: vtree$,
        events: {}
    };
}
