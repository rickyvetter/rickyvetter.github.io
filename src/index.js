import Cycle from '@cycle/core';
import { makeDOMDriver } from '@cycle/web';

import view from './view';
import model from './model';
import intent from './intent';

import labeledSlider from './components/labeled-slider/labeled-slider';
import siteHeader from './components/header/header';

function main({DOM}) {
    return {
        DOM: view(model(intent(DOM)))
    };
}

Cycle.run(main, {
    DOM: makeDOMDriver('#app', {
        'labeled-slider': labeledSlider,
        'site-header': siteHeader
    })
});
