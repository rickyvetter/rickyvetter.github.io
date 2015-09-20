import Cycle from '@cycle/core';
import { makeDOMDriver } from '@cycle/dom';

import view from './view';
import model from './model';
import intent from './intent';

import links from './components/links/links';
import siteHeader from './components/header/header';

function main({DOM}) {
    return {
        DOM: view(model(intent(DOM)))
    };
}

Cycle.run(main, {
    DOM: makeDOMDriver('#app', {
        'links': links,
        'site-header': siteHeader
    })
});
