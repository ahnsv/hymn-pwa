export function uuid() {
  /*jshint bitwise:false */
  var i: number, random: number;
  var uuid = "";

  for (i = 0; i < 32; i++) {
    random = (Math.random() * 16) | 0;
    if (i === 8 || i === 12 || i === 16 || i === 20) {
      uuid += "-";
    }
    uuid += (i === 12 ? 4 : i === 16 ? (random & 3) | 8 : random).toString(16);
  }

  return uuid;
}

export function pluralize(count: number, word: string) {
  return count === 1 ? word : word + "s";
}

/**
 * Hypothesis 1: detect four-way swipe - DONE
 * Hypothesis 2: detect gestures with swipe actions
 * Side-note: import rxjs and mix it up with it
 */
type SwipeObject = {
  touchstart?: TouchEvent
  touchend?: TouchEvent
  result?: {direction: string, velocity: {x: number, y: number}, distance: number}
};
interface Directions {
  [key: string]: string
}
export class Swiper {
  ElToBind: HTMLElement;
  _swiperObject: SwipeObject;
  _DIRECTIONS: Directions
  constructor(ElToBind: HTMLElement) {
    this._addTouchEnd = this._addTouchEnd.bind(this);
    this._addTouchMove = this._addTouchMove.bind(this);
    this._addTouchStart = this._addTouchStart.bind(this);
    this.calc = this.calc.bind(this);
    this.ElToBind = ElToBind;
    this._swiperObject = {};
    this._DIRECTIONS = { DIRECTION_LEFT: 'left', DIRECTION_RIGHT: 'right', DIRECTION_UP: 'up', DIRECTION_DOWN: 'down' };
  }

  /**
   * Get direction from touchstart and touchend events
   */
  getDirection = (touch1: TouchEvent, touch2: TouchEvent) => {
    const first = touch1.changedTouches[0]
    const second = touch2.changedTouches[0]
    const x = Math.abs(first.clientX - second.clientX)
    const y = Math.abs(first.clientY - second.clientY)

    if (x >= y) {
      return first.clientX - second.clientX > 0 ? this._DIRECTIONS.DIRECTION_LEFT : this._DIRECTIONS.DIRECTION_RIGHT
    }
    return first.clientY - second.clientY > 0 ? this._DIRECTIONS.DIRECTION_UP : this._DIRECTIONS.DIRECTION_DOWN
  }

  getAngle = (touch1: TouchEvent, touch2: TouchEvent) => {
    const first = touch1.changedTouches[0]
    const second = touch2.changedTouches[0]
    var x = second.clientX - first.clientX,
        y = second.clientY - first.clientY;

    return Math.atan2(y, x) * 180 / Math.PI;
  }

  getDistance = (touch1: TouchEvent, touch2: TouchEvent) => {
    const first = touch1.changedTouches[0]
    const second = touch2.changedTouches[0]
    var x = second.clientX - first.clientX,
        y = second.clientY - first.clientY;

    return Math.sqrt((x * x) + (y * y));
  }

  getVelocity = (touch1: TouchEvent, touch2: TouchEvent) => {
    const first = touch1.changedTouches[0]
    const second = touch2.changedTouches[0]
    const deltaX = second.clientX - first.clientX
    const deltaY = second.clientY - first.clientY
    const deltaTime = touch2.timeStamp - touch1.timeStamp
    return {
      x: Math.abs(deltaX / deltaTime) || 0,
      y: Math.abs(deltaY / deltaTime) || 0
    };
  }

  calc() {
    // TODO: get angle and map which angle and speed to four directions
    const {touchstart, touchend} = this._swiperObject
    this._swiperObject.result = {
      direction: this.getDirection(touchstart!, touchend!),
      velocity: this.getVelocity(touchstart!, touchend!),
      distance: this.getDistance(touchstart!, touchend!)
    }
    if (this._swiperObject.result.velocity.x > 0.6 || this._swiperObject.result.velocity.y > 0.6) {
      return this._swiperObject.result.direction
    }
    return ''
  }
  /**
   * Add Touch Start Event Listener
   * @param {HTMLElement} el
   */
  _addTouchStart(el: HTMLElement) {
    el.addEventListener("touchstart", (e: TouchEvent) => {
      this._swiperObject = {
        touchstart: e
      };
    });
  }

  /**
   * Add Touch Move Event Listener
   * @param {HTMLElement} el
   */
  _addTouchMove(el: HTMLElement) {
    el.addEventListener("touchmove", function (e) {
      e.preventDefault();
    });
  }

  /**
   * Add Touch Move End Listener
   * @param {HTMLElement} el
   */
  _addTouchEnd(el: HTMLElement) {
    el.addEventListener("touchend", (e: TouchEvent) => {
      this._swiperObject = {
        ...this._swiperObject,
        touchend: e
      };
      this.calc()
    });
  }

  bindElem(el: HTMLElement) {
    [this._addTouchEnd, this._addTouchMove, this._addTouchStart].forEach(b =>
      b(el)
    );
  }
}
