import {Observable} from 'rxjs-es/Rx';

const isPurple = Math.random() < 0.5;
const white = '#ddd';


const codes = [
  38, // up
  38, // up
  40, // down
  40, // down
  37, // left
  39, // right
  37, // left
  39, // right
  66, // b
  65,  // a
].toString();
const isKonami = (buffer) => codes === buffer.toString();

export default function model(actions) {
  return Observable.combineLatest(
    actions.mouseClickBackground
      .scan((isPurple) => !isPurple, isPurple)
      .startWith(isPurple),
    actions.updateBackgroundColor,
    Observable.fromEvent(document, 'keyup')
      .map((e) => e.keyCode)
      .bufferCount(10, 1)
      .filter(isKonami)
      .scan((isKonami) => !isKonami, false)
      .startWith(false),
    (isPurple, {red, blue}, isKonami) => {
      const purple = `rgb(${red}, 0, ${blue})`;

      return {
        color: isPurple ? purple : white,
        backgroundColor: isPurple ? white : purple,
        isKonami,
      };
    },
  )
}
