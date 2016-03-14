import {Observable} from 'rxjs-es/Rx';

export default function intent() {
  return {
    mouseClickBackground: Observable.fromEvent(document, 'mousedown')
      .filter((me) => me.target.classList.contains('rv-container')),
    updateBackgroundColor: Observable.fromEvent(document, 'mousemove')
      .map((me) => ({
          red: Math.floor(me.clientX / window.innerWidth * 60) + 40,
          blue: Math.floor(me.clientY / window.innerHeight * 60) + 40,
        })
      )
      .startWith({red: 100, blue: 100}),
  };
}
