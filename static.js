'use strict';
let fs = require('fs');
let webpack = require('webpack');
let webpackConfig = require('./webpack.config');
let Cycle = require('@cycle/core');
let CycleDOM = require('../../lib/cycle-dom');
let serialize = require('serialize-javascript');
let {Rx} = Cycle;
let {h, makeHTMLDriver} = CycleDOM;
let {app} = require('.src/index');

function wrapVTreeWithHTMLBoilerplate(vtree, context, clientBundle) {
  return h('html', [
    h('head', [
      h('title', 'Cycle Isomorphism Example')
    ]),
    h('body', [
      h('div#app', [vtree]),
      h('script', `window.appContext = ${serialize(context)};`),
      h('script', clientBundle)
    ])
  ]);
}

function prependHTML5Doctype(html) {
  return `<!doctype html>${html}`;
}

function wrapAppResultWithBoilerplate(appFn, context$, bundle$) {
  return function wrappedAppFn(ext) {
    let vtree$ = appFn(ext).DOM;
    let wrappedVTree$ = Rx.Observable.combineLatest(vtree$, context$, bundle$,
      wrapVTreeWithHTMLBoilerplate
    );
    return {
      DOM: wrappedVTree$
    };
  };
}

let clientBundle$ = (() => {
  let replaySubject = new Rx.ReplaySubject(1);
  // returns a Compiler instance
    webpack(webpackConfig, function(err, stats) {
        replaySubject.onCompleted();
    });
  return replaySubject;
})();

let context$ = Rx.Observable.just({route: 'index'});
let wrappedAppFn = wrapAppResultWithBoilerplate(app, context$, clientBundle$);
let [requests, responses] = Cycle.run(wrappedAppFn, {
  DOM: makeHTMLDriver(),
  context: () => context$
});
let html$ = responses.DOM.get(':root').map(prependHTML5Doctype);
html$.subscribe(html => fs.writeFile('test.html', html));
