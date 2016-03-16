import {Observable} from 'rxjs-es/Rx';

const isPurple = Math.random() < 0.5;

export default
  Observable.fromEvent(document, 'mousedown')
    .filter((me) => me.target.classList.contains('rv-container'))
    .scan((isPurple) => !isPurple, isPurple)
    .startWith(isPurple);
