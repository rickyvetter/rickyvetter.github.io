import { Rx } from '@cycle/core';
import { h } from '@cycle/web';

const linkListStyles = {
    display: 'flex',
    fontSize: '1rem',
    justifyContent: 'space-around',
    width: '20rem',
    marginTop: '20px'
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
        let onlineLinks = [
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

        let offlineLinks = [
            {
                href: 'https://socialtables.com',
                name: 'Social Tables'
            },
            {
                href: 'https://meetup.com/React-DC',
                name: 'React DC'
            }
        ];

        return state$.map((state) => {
            let computedLinkStyles = Object.assign(
                {},
                linkStyles,
                {
                    color: state.props.color
                }
            );
            function createListLink(link) {
                return (
                    <li>
                        <a style={computedLinkStyles}
                            href={link.href}>{link.name}</a>
                    </li>
                );
            }
            let onlineLinkMarkup = onlineLinks.map(createListLink);
            let offlineLinkMarkup = offlineLinks.map(createListLink);

            return (
                <div>
                    <ul style={linkListStyles}>{onlineLinkMarkup}</ul>
                    <ul style={linkListStyles}>{offlineLinkMarkup}</ul>
                </div>
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
