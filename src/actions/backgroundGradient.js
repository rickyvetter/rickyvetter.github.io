import {Observable} from 'rxjs-es/Rx';

export default
  Observable.fromEvent(document, 'mousemove')
    .map((me) => ({
      red: Math.floor(me.clientX / window.innerWidth * 60) + 40,
      blue: Math.floor(me.clientY / window.innerHeight * 60) + 40,
    }))
    .startWith({red: 100, blue: 100});
