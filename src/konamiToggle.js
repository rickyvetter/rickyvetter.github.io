import {Observable} from 'rxjs-es/Rx';

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
const testKonami = (buffer) => codes === buffer.toString();

export default Observable.fromEvent(document, 'keyup')
  .map((e) => e.keyCode)
  .bufferCount(10, 1)
  .filter(testKonami)
  .scan((isKonami) => !isKonami, false)
  .startWith(false);
