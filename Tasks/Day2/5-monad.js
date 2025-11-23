'use strict';

// Rewrite previous example using this Monad
// do not change code of Monad

class Monad {
  #value;

  constructor(value) {
    this.#value = value;
  }

  static of(value) {
    return new Monad(value);
  }

  map(fn) {
    return Monad.of(fn(this.#value));
  }

  chain(fn) {
    return fn(this.#value);
  }

  ap(container) {
    const fn = this.#value;
    return container.map(fn);
  }
}

const concatMonad = (
  Monad.of(1)
    .map(x => x + 9)
    .map(x => x + 1)
    .map(x => x + 7)
);

const multiplyMonad = Monad.of((v) => v * 2);

const sum1 = multiplyMonad.ap(concatMonad).chain(v => v);

console.log('Sum:', +sum1);
