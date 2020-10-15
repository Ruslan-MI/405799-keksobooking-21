"use strict";

const MOCKS_QUANTITY = 8;
const MIN_Y = 130;
const MAX_Y = 630;
const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;
const MAIN_PIN_WIDTH = 65;
const MAIN_PIN_HEIGHT = 65;
const MAIN_PIN_SPIKE_HEIGHT = 16;

const map = document.querySelector(`.map`);

const mocksData = {
  title: [
    `Заголовок 1`, `Заголовок 2`, `Заголовок 3`, `Заголовок 4`, `Заголовок 5`, `Заголовок 6`, `Заголовок 7`, `Заголовок 8`
  ],
  price: [
    1000, 1500, 2000
  ],
  type: [
    `palace`, `flat`, `house`, `bungalow`
  ],
  rooms: [
    1, 2, 3, 4
  ],
  guests: [
    1, 2, 3, 4
  ],
  checkin: [
    `12:00`, `13:00`, `14:00`
  ],
  checkout: [
    `12:00`, `13:00`, `14:00`
  ],
  features: [
    `wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`
  ],
  description: [
    `Описание 1`, `Описание 2`, `Описание 3`, `Описание 4`, `Описание 5`, `Описание 6`, `Описание 7`, `Описание 8`
  ],
  photos: [
    `http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
  ]
};

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

const getMocksArray = (data) => {
  let mocksArray = [];
  const {
    title, price, type, rooms, guests, checkin, checkout, features, description, photos
  } = data;
  for (let i = 0; i < MOCKS_QUANTITY; i++) {
    mocksArray[i] = {
      author: {
        avatar: `img/avatars/user0` + (i + 1) + `.png`
      },
      offer: {
        title: title[getRandomIndex(title)],
        address: `600, 350`,
        price: price[getRandomIndex(price)],
        type: type[getRandomIndex(type)],
        rooms: rooms[getRandomIndex(rooms)],
        guests: guests[getRandomIndex(guests)],
        checkin: checkin[getRandomIndex(checkin)],
        checkout: checkout[getRandomIndex(checkout)],
        features: getRandomElements(features),
        description: description[getRandomIndex(description)],
        photos: getRandomElements(photos)
      },
      location: {
        x: Math.round(Math.random() * map.offsetWidth),
        y: MIN_Y + Math.round(Math.random() * (MAX_Y - MIN_Y))
      }
    };
  }
  return mocksArray;
};

const mocksArray = getMocksArray(mocksData);

const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

const createPin = (data) => {
  const newPin = pinTemplate.cloneNode(true);
  newPin.style.left = data.location.x - PIN_WIDTH / 2 + `px`;
  newPin.style.top = data.location.y - PIN_HEIGHT + `px`;
  newPin.children[0].src = data.author.avatar;
  newPin.children[0].alt = data.offer.title;
  return newPin;
};

const mapPins = map.querySelector(`.map__pins`);

const renderPins = (data, destinationTag) => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < data.length; i++) {
    fragment.appendChild(createPin(data[i]));
  }
  destinationTag.appendChild(fragment);
};

renderPins(mocksArray, mapPins);

const adForm = document.querySelector(`.ad-form`);
const mapFilters = document.querySelector(`.map__filters`);
const mapPinMain = map.querySelector(`.map__pin--main`);
const addressInput = adForm.querySelector(`#address`);

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

const getMainPinCoordinates = () => {
  let totalPinHeight = MAIN_PIN_HEIGHT;
  if (!map.classList.contains(`map--faded`)) {
    totalPinHeight = MAIN_PIN_HEIGHT + MAIN_PIN_SPIKE_HEIGHT;
  }
  addressInput.value = Math.round(mapPinMain.offsetLeft + MAIN_PIN_WIDTH / 2) + `, ` + Math.round(mapPinMain.offsetTop + totalPinHeight);
};

addDisabledForChildren(adForm);
addDisabledForChildren(mapFilters);
getMainPinCoordinates();

const onMainPinClick = (evt) => {
  if (evt.button === 0 || evt.key === `Enter`) {
    map.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);
    removeDisabledForChildren(adForm);
    removeDisabledForChildren(mapFilters);
    getMainPinCoordinates();
    getValidCapacity();
    roomNumber.addEventListener(`change`, getValidCapacity);
    capacity.addEventListener(`change`, getValidRoomNumber);
  }
};

mapPinMain.addEventListener(`mousedown`, (evt) => {
  onMainPinClick(evt);
});

mapPinMain.addEventListener(`keydown`, (evt) => {
  onMainPinClick(evt);
});

const roomNumber = adForm.querySelector(`#room_number`);
const capacity = adForm.querySelector(`#capacity`);

const getValidCapacity = () => {
  if (roomNumber.value === `100`) {
    capacity.value = `0`;
  } else if (roomNumber.value !== `100` && capacity.value === `0`) {
    capacity.value = roomNumber.value;
  } else if (roomNumber.value < capacity.value) {
    capacity.value = roomNumber.value;
  }
};

const getValidRoomNumber = () => {
  if (capacity.value === `0`) {
    roomNumber.value = `100`;
  } else if (capacity.value !== `0` && roomNumber.value === `100`) {
    roomNumber.value = capacity.value;
  } else if (capacity.value > roomNumber.value) {
    roomNumber.value = capacity.value;
  }
};
