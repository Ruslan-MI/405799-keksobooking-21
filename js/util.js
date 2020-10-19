"use strict";

(() => {
  const getRandomIndex = (data) => {
    let index = Math.floor(Math.random() * data.length);
    return index;
  };
  const getRandomElements = (data) => {
    let newArray = [];
    let newArrayLength = Math.ceil(Math.random() * data.length);
    while (newArray.length !== newArrayLength) {
      let randomValue = data[window.util.getRandomIndex(data)];
      let isDuplicate = newArray.includes(randomValue);
      if (!isDuplicate) {
        newArray.push(randomValue);
      }
    }
    return newArray;
  };
  const addDisabledForChildren = (parent) => {
    const childrenElements = parent.children;
    for (let childrenElement of childrenElements) {
      childrenElement.setAttribute(`disabled`, ``);
    }
  };
  const removeDisabledForChildren = (parent) => {
    const childrenElements = parent.children;
    for (let childrenElement of childrenElements) {
      childrenElement.removeAttribute(`disabled`);
    }
  };

  window.util = {
    getRandomIndex, getRandomElements, addDisabledForChildren, removeDisabledForChildren
  };
})();
