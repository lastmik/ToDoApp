import { viewInput } from "../View/View.js";

// TODO: Check if we can replace by POJO or use prototype instead
// Lets refactor iife to more declarative way
export let counter = new (function () {
  let count = 0;
  let countCompleted = 0;
  this.increment = function () {
    ++count;
  };
  this.decrement = function () {
    --count;
  };
  this.incrementCompleted = function () {
    ++countCompleted;
  };
  this.decrementCompleted = function () {
    --countCompleted;
  };
  // TODO: Check getter instead
  this.getCount = function () {
    return count;
  };
  this.getCountCompleted = function () {
    return countCompleted;
  };
  this.resetCount = function () {
    return (count = 0);
  };
  this.resetCountCompleted = function () {
    return (countCompleted = 0);
  };
})();

export let modelArray = new (function () {
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
