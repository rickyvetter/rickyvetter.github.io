import {Observable} from 'rxjs-es/Rx';

const savedColor = localStorage.getItem('isPurple') && JSON.parse(localStorage.getItem('isPurple'));
//check specifically for null because isPurple can be false which would trigger ||
const isPurple = savedColor === null ? Math.random() < 0.5 : savedColor;

export default
  Observable.fromEvent(document, 'mousedown')
    .filter((me) => me.target.classList.contains('rv-container'))
    .scan((isPurple) => {
      localStorage.setItem('isPurple', !isPurple);
      return !isPurple;
    }, isPurple)
    .startWith(isPurple);
