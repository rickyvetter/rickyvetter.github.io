import { Rx } from '@cycle/core';
import { h } from '@cycle/dom';

const linkListStyles = {
    display: 'flex',
    fontSize: '1rem',
    WebkitJustifyContent: 'space-around',
    justifyContent: 'space-around',
    width: '20rem',
    marginTop: '20px'
};

const linkStyles = {
    textDecoration: 'none'
};

export default function links(responses) {
    function intent(DOM) {
        return {
            mouseOverLink: Rx.Observable.merge(
                    DOM.select('.rv-link').events('mouseenter')
                        .map(me => me.target.href),
                    DOM.select('.rv-link').events('mouseout')
                        .map(() => null)
                )
                .startWith(null)
        };
    }

    function model(context, actions) {
        let props$ = context.props.getAll();
        return Rx.Observable.combineLatest(
            props$,
            actions.mouseOverLink.startWith(null),
            (props, mouseOver) => { return {props, mouseOver}; }
        );
    }

    function view(state$) {
        let onlineLinks = [
            {
                href: 'https://github.com/rickyvetter',
                name: 'Github',
                alt: 'octocat'
            },
            {
                href: 'https://twitter.com/rickyvetter',
                name: 'Twitter',
                alt: 'bird'
            },
            {
                href: 'https://facebook.com/rickyvetter',
                name: 'Facebook',
                alt: 'thumbsup'
            },
            {
                href: 'https://linkedin.com/in/rickyvetter',
                name: 'LinkedIn',
                alt: 'link'
            },
            {
                href: 'https://cash.me/$rickyvetter',
                name: 'cash.me',
                alt: 'dollar'
            }
        ];

        let offlineLinks = [
            {
                href: 'https://socialtables.com/',
                name: 'Social Tables',
                alt: 'office'
            },
            {
                href: 'http://www.meetup.com/React-DC/',
                name: 'React DC',
                alt: 'busts_in_silhouette'
            }
        ];

        return state$.map(({props, mouseOver}) => {
            function createListLink(link) {
                let computedLinkStyles = Object.assign(
                    {},
                    linkStyles,
                    {
                        color: props.color,
                        textDecoration: mouseOver === link.href ? 'underline' : 'none'
                    }
                );
                return (
                    <li>
                        <a style={computedLinkStyles}
                            className='rv-link'
                            href={link.href}
                            title={link.name}>{`:${link.alt}:`}</a>
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
