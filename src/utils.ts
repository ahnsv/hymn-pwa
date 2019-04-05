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
  startX: number;
  startY: number;
  distX: number;
  distY: number;
  startTime: number;
  elapsedTime: number;
  allowedTime: number;
  restraint: number;
  threshold: number;
};
export class Swiper {
  ElToBind: HTMLElement;
  _swiperObject: SwipeObject;
  constructor(ElToBind: HTMLElement) {
    this._addTouchEnd = this._addTouchEnd.bind(this);
    this._addTouchMove = this._addTouchMove.bind(this);
    this._addTouchStart = this._addTouchStart.bind(this);
    this.detectDirection = this.detectDirection.bind(this);
    this.ElToBind = ElToBind;
    this._swiperObject = {
      startX: 0,
      startY: 0,
      distX: 0,
      distY: 0,
      startTime: 0,
      elapsedTime: 0,
      allowedTime: 500,
      restraint: 500,
      threshold: 30
    };
  }

  detectDirection(obj: SwipeObject) {
    // TODO: get angle and map which angle and speed to four directions
    const {
      distX,
      distY,
      elapsedTime,
      allowedTime,
      threshold,
      restraint
    } = obj;
    const angle = ["left", "right", "up", "down"];
    const direction = (diffX: number, diffY: number) => {
      if (elapsedTime < allowedTime) {
        if (Math.abs(diffX) >= threshold && Math.abs(diffY) <= restraint) {
          return diffX < 0 ? 0 : 1;
        } else if (
          Math.abs(diffY) >= threshold &&
          Math.abs(diffX) <= restraint
        ) {
          return diffY < 0 ? 2 : 3;
        } else {
          return undefined;
        }
      } else {
        return undefined;
      }
    };
    if (direction(distX, distY) === undefined) {
      return "Non detected";
    }
    console.log(angle[direction(distX, distY) as number])
    return angle[direction(distX, distY) as number];
  }
  /**
   * Add Touch Start Event Listener
   * @param {HTMLElement} el
   */
  _addTouchStart(el: HTMLElement) {
    el.addEventListener("touchstart", ({ changedTouches, timeStamp }) => {
      this._swiperObject = {
        ...this._swiperObject,
        startX: changedTouches[0].clientX,
        startY: changedTouches[0].clientY,
        startTime: timeStamp
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
    el.addEventListener("touchend", ({ changedTouches, timeStamp }) => {
      this._swiperObject = {
        ...this._swiperObject,
        distX: changedTouches[0].clientX - this._swiperObject.startX,
        distY: changedTouches[0].clientY - this._swiperObject.startX,
        elapsedTime: timeStamp - this._swiperObject.startTime
      };
      this.detectDirection(this._swiperObject);
    });
  }

  bindElem(el: HTMLElement) {
    [this._addTouchEnd, this._addTouchMove, this._addTouchStart].forEach(b =>
      b(el)
    );
  }
}
