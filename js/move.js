"use strict";

const {
  MIN_X_COORDS, MIN_Y_COORDS, MAX_Y_COORDS
} = window.const;

let defaultOffsets;

const getMove = (movingElement, getCoords) => {
  movingElement.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();
      const shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      let sizeCorrection = getCoords();
      let currentOffsets = {
        x: movingElement.offsetLeft - shift.x,
        y: movingElement.offsetTop - shift.y
      };

      const currentScope = {
        minX: MIN_X_COORDS - sizeCorrection.x,
        maxX: movingElement.parentElement.offsetWidth - sizeCorrection.x,
        minY: MIN_Y_COORDS - sizeCorrection.y,
        maxY: MAX_Y_COORDS - sizeCorrection.y
      };

      if (currentOffsets.x < currentScope.minX) {
        movingElement.style.left = currentScope.minX + `px`;
      } else if (currentOffsets.x > currentScope.maxX) {
        movingElement.style.left = currentScope.maxX + `px`;
      } else {
        movingElement.style.left = currentOffsets.x + `px`;
      }

      if (currentOffsets.y < currentScope.minY) {
        movingElement.style.top = currentScope.minY + `px`;
      } else if (currentOffsets.y > currentScope.maxY) {
        movingElement.style.top = currentScope.maxY + `px`;
      } else {
        movingElement.style.top = currentOffsets.y + `px`;
      }
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();
      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });
};

const getDefaultOffsets = (movingElement) => {
  defaultOffsets = {
    left: movingElement.offsetLeft,
    top: movingElement.offsetTop
  };
};

const setDefaultOffsets = (movingElement) => {
  movingElement.style.left = defaultOffsets.left + `px`;
  movingElement.style.top = defaultOffsets.top + `px`;
};

window.move = {
  getMove, getDefaultOffsets, setDefaultOffsets
};
