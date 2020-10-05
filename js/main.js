"use strict";

const MOCKS_QUANTITY = 8;
const MIN_Y = 130;
const MAX_Y = 630;
const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;

const map = document.querySelector(`.map`);

const data = {
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

const getRandomIndex = function (array) {
  let index = Math.floor(Math.random() * array.length);
  return index;
};

const getRandomElements = function (array) {
  let newArray = [];
  let newArrayLength = Math.ceil(Math.random() * array.length);
  while (newArray.length !== newArrayLength) {
    let randomValue = array[getRandomIndex(array)];
    let isDuplicate = newArray.includes(randomValue);
    if (!isDuplicate) {
      newArray.push(randomValue);
    }
  }
  return newArray;
};

const getMocksArray = function (dataObject) {
  let mocksArray = [];
  const {
    title, price, type, rooms, guests, checkin, checkout, features, description, photos
  } = dataObject;
  for (let i = 0; i < MOCKS_QUANTITY; i++) {
    mocksArray.push({});
    mocksArray[i].author = {
      avatar: `img/avatars/user0` + (i + 1) + `.png`
    };
    mocksArray[i].offer = {
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
    };
    mocksArray[i].location = {
      x: Math.round(Math.random() * map.offsetWidth),
      y: MIN_Y + Math.round(Math.random() * (MAX_Y - MIN_Y))
    };
  }
  return mocksArray;
};

const mocks = getMocksArray(data);

map.classList.remove(`map--faded`);

const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

const createPin = function (object) {
  const newPin = pinTemplate.cloneNode(true);
  newPin.style.left = object.location.x - PIN_WIDTH / 2 + `px`;
  newPin.style.top = object.location.y - PIN_HEIGHT + `px`;
  newPin.children[0].src = object.author.avatar;
  newPin.children[0].alt = object.offer.title;
  return newPin;
};

const renderPins = function (array) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < array.length; i++) {
    fragment.appendChild(createPin(array[i]));
  }
  return fragment;
};

const mapPins = map.querySelector(`.map__pins`);

mapPins.appendChild(renderPins(mocks));
