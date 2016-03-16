import ReactDOM from 'react-dom';
import React from 'react';

import View from './view';
import intent from './intent';
import model from './model';

const node = document.getElementById('app');

model.subscribe((state) =>
  ReactDOM.render(<View {...state} />, node));
