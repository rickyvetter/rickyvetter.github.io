import {Observable} from 'rxjs-es/Rx';
import konamiToggle from './konamiToggle';
import {mouseClickBackground, updateBackgroundColor} from './intent.js'

const white = '#ddd';

export default Observable.combineLatest(
  mouseClickBackground,
  updateBackgroundColor,
  konamiToggle,
  (isPurple, {red, blue}, isKonami) => {
    const purple = `rgb(${red}, 0, ${blue})`;

    return {
      color: isPurple ? purple : white,
      backgroundColor: isPurple ? white : purple,
      isKonami,
    };
  },
);
