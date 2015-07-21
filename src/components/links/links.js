import { Rx } from '@cycle/core';
import { h } from '@cycle/web';

const linkListStyles = {
    display: 'flex',
    fontSize: '1rem',
    justifyContent: 'space-between',
    width: '20rem'
};

const linkStyles = {
    textDecoration: 'none'
};

export default function links(responses) {
    function intent() {
        return {};
    }

    function model(context) {
        let props$ = context.props.getAll();
        return Rx.Observable.combineLatest(props$,
            (props) => { return {props}; }
        );
    }

    function view(state$) {
        let links = [
            {
                href: 'https://github.com/rickyvetter',
                name: 'Github'
            },
            {
                href: 'https://twitter.com/rickyvetter',
                name: 'Twitter'
            },
            {
                href: 'https://facebook.com/rickyvetter',
                name: 'Facebook'
            },
            {
                href: 'https://linkedin.com/in/rickyvetter',
                name: 'LinkedIn'
            }
        ];

        return state$.map((state) => {
            console.log(state.props.color);
            let computedLinkStyles = Object.assign(
                {},
                linkStyles,
                {
                    color: state.props.color
                }
            );
            console.log(computedLinkStyles);
            let linkMarkup = links.map(
                (link) => (
                    <li>
                        <a style={computedLinkStyles}
                            href={link.href}>{link.name}</a>
                    </li>
                )
            );

            return (
                <ul style={linkListStyles}>{linkMarkup}</ul>
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
