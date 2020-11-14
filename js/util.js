"use strict";

const getRandomIndex = (data) => {
  let index = Math.floor(Math.random() * data.length);

  return index;
};

const getRandomElements = (data) => {
  let newArray = [];
  let newArrayLength = Math.ceil(Math.random() * data.length);

  while (newArray.length !== newArrayLength) {
    let randomValue = data[getRandomIndex(data)];
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

const hideEmptyCardElement = (cardElement, data) => {
  if (Array.isArray(data)) {
    if (data.length === 0) {
      cardElement.style.display = `none`;
      return;
    }
  }
  if (!data) {
    cardElement.style.display = `none`;
  }
};

const fillingCardElement = (cardElement, data) => {
  hideEmptyCardElement(cardElement, data);
  if (cardElement.classList.contains(`popup__text--price`)) {
    cardElement.textContent = data + `₽/ночь`;
    return;
  } else if (cardElement.classList.contains(`popup__avatar`)) {
    cardElement.src = data;
    return;
  }
  cardElement.textContent = data;
};

const getRoomCyrillic = (quantity) => {
  switch (quantity) {
    case 1:
      return ` комната`;
    default:
      return ` комнаты`;
  }
};

const getGuestCyrillic = (quantity) => {
  switch (quantity) {
    case 1:
      return ` гостя`;
    default:
      return ` гостей`;
  }
};

const getCardCapacity = (cardElement, rooms, guests) => {
  hideEmptyCardElement(cardElement, rooms);
  if (!guests) {
    cardElement.textContent = rooms + getRoomCyrillic(rooms);
    return;
  }
  cardElement.textContent = rooms + getRoomCyrillic(rooms) + ` для ` + guests + getGuestCyrillic(guests);
};

const getCardTime = (cardElement, checkin, checkout) => {
  hideEmptyCardElement(cardElement, checkin);
  if (!checkout) {
    cardElement.textContent = `Заезд после ` + checkin;
    return;
  }
  cardElement.textContent = `Заезд после ` + checkin + `, выезд до ` + checkout;
};

const getCurrentFeatures = (cardElement, data) => {
  hideEmptyCardElement(cardElement, data);
  cardElement.innerHTML = ``;

  const fragment = document.createDocumentFragment();

  data.forEach((element) => {
    const newFeature = document.createElement(`li`);

    newFeature.classList.add(`popup__feature`, `popup__feature--` + element);
    fragment.appendChild(newFeature);
  });

  cardElement.appendChild(fragment);
};

const getCardPhotos = (cardElement, data) => {
  hideEmptyCardElement(cardElement, data);
  cardElement.innerHTML = ``;

  const fragment = document.createDocumentFragment();

  data.forEach((element) => {
    const newPhoto = document.createElement(`img`);

    newPhoto.classList.add(`popup__photo`);
    newPhoto.src = element;
    newPhoto.style.width = `45px`;
    newPhoto.style.height = `40px`;
    newPhoto.alt = `Фотография жилья`;
    fragment.appendChild(newPhoto);
  });
  cardElement.appendChild(fragment);
};

const isEnterPressed = (evt) => {
  return evt.key === `Enter`;
};

const isEscapePressed = (evt) => {
  return evt.key === `Escape`;
};

const isTabPressed = (evt) => {
  return evt.key === `Tab`;
};

const isMainButtonPressed = (evt) => {
  return evt.button === 0;
};

const removeElement = (element) => {
  if (element) {
    element.remove();
  }
};

window.util = {
  getRandomIndex,
  getRandomElements,
  addDisabledForChildren,
  removeDisabledForChildren,
  fillingCardElement,
  getCardCapacity,
  getCardTime,
  getCurrentFeatures,
  getCardPhotos,
  isEnterPressed,
  isEscapePressed,
  isTabPressed,
  isMainButtonPressed,
  removeElement
};
