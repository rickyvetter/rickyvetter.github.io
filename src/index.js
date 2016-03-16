import ReactDOM from 'react-dom';
import React from 'react';

import RickyVetter from './components/RickyVetter.react';
import State from './State';

const node = document.getElementById('app');

State.subscribe((state) =>
  ReactDOM.render(<RickyVetter {...state} />, node));
