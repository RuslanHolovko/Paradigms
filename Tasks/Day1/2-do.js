'use strict';

// Put implementation here
class DoSmth {
  #value;
  #fns = [];

  constructor() {
    return (value) => {
      this.#fns = [];
      this.#value = value;
      return this;
    }
  }

  bind(fn) {
    this.#fns.push(fn);
    return this;
  }

  run() {
    return (...args) => {
      let result = this.#value;

      for (const fn of this.#fns) {
        result = fn(result);
      }

      return (
        typeof result === 'function'
          ? result(...args)
          : result
      );
    };
  }
}

const Do = new DoSmth();

Do({ id: 15 })
  .bind(({ id }) => ({ id, name: 'marcus', age: 42 }))
  .bind(({ name, age }) => (name === 'marcus' ? (log) => log(age) : () => {}))
  .run()(console.log);
