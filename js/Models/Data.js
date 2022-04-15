import { viewInput } from "../View/View.js";

// TODO: Check if we can replace by POJO or use prototype instead
// Lets refactor iife to more declarative way
export const counter = {
  count: 0,
  countCompleted: 0,

  increment() {
    ++this.count;
  },
  decrement() {
    --this.count;
  },
  incrementCompleted() {
    ++this.countCompleted;
  },
  decrementCompleted() {
    --this.countCompleted;
  },
  // TODO: Check getter instead
  get getCount() {
    return this.count;
  },
  get getCountCompleted() {
    return this.countCompleted;
  },
  resetCount() {
    return (this.count = 0);
  },
  resetCountCompleted() {
    return (this.countCompleted = 0);
  },
};

export const modelArray = new (function () {
  let array = [];
  this.getArray = function () {
    return array;
  };
  this.setElement = function (elem) {
    array.push(elem);
  };
  this.setArray = function (changeArray) {
    array = changeArray;
  };
})();

export class InputElement {
  element;
  dateCreate;
  destroy = false;
  constructor(value) {
    // TODO: Check if we really need keep reference to certain element, instead of only value
    this.element = viewInput.createInputBlock(value);
    this.dateCreate = Date.now();
  }
}
