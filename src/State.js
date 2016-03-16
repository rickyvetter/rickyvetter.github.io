import {Observable} from 'rxjs-es/Rx';
import backgroundGradient from './actions/backgroundGradient';
import backgroundToggle from './actions/backgroundToggle';
import konamiToggle from './actions/konamiToggle';

const white = '#ddd';

export default Observable.combineLatest(
  backgroundToggle,
  backgroundGradient,
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
