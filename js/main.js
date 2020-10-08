"use strict";

const MOCKS_QUANTITY = 8;
const MIN_Y = 130;
const MAX_Y = 630;
const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;

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

map.classList.remove(`map--faded`);

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

const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
const typeCyrillic = {
  flat: `Квартира`,
  bungalow: `Бунгало`,
  house: `Дом`,
  palace: `Дворец`
};

const getCurrentFeatures = (data, destinationTag) => {
  const featureElements = destinationTag.children;
  const dataFeatures = data.offer.features;
  const blockElement = featureElements[0].classList[0];
  for (let i = featureElements.length - 1; i >= 0; i--) {
    const blockElementModifier = featureElements[i].classList[1];
    let isCurrentMod = false;
    for (let j = 0; j < dataFeatures.length; j++) {
      const featureModifier = blockElement + `--` + dataFeatures[j];
      if (featureModifier === blockElementModifier) {
        isCurrentMod = true;
        break;
      }
    }
    if (!isCurrentMod) {
      featureElements[i].remove();
    }
  }
  return destinationTag;
};

const getCardPhotos = (data, destinationTag) => {
  const photo = destinationTag.children[0];
  photo.src = data.offer.photos[0];
  const photosQuantity = data.offer.photos.length;
  if (photosQuantity > 1) {
    const fragment = document.createDocumentFragment();
    for (let i = 1; i < photosQuantity; i++) {
      const newPhoto = photo.cloneNode(true);
      newPhoto.src = data.offer.photos[i];
      fragment.appendChild(newPhoto);
    }
    destinationTag.appendChild(fragment);
  }
  return destinationTag;
};

const createCard = (data, dictionary) => {
  const newCard = cardTemplate.cloneNode(true);
  newCard.querySelector(`.popup__title`).textContent = data.offer.title;
  newCard.querySelector(`.popup__text--address`).textContent = data.offer.address;
  newCard.querySelector(`.popup__text--price`).textContent = data.offer.price + `₽/ночь`;
  newCard.querySelector(`.popup__type`).textContent = dictionary[data.offer.type];
  newCard.querySelector(`.popup__text--capacity`).textContent = data.offer.rooms + ` комнаты для ` + data.offer.guests + ` гостей`;
  newCard.querySelector(`.popup__text--time`).textContent = `Заезд после ` + data.offer.checkin + `, выезд до ` + data.offer.checkout;
  getCurrentFeatures(data, newCard.querySelector(`.popup__features`));
  newCard.querySelector(`.popup__description`).textContent = data.offer.description;
  getCardPhotos(data, newCard.querySelector(`.popup__photos`));
  newCard.querySelector(`.popup__avatar`).src = data.author.avatar;
  return newCard;
};

const renderCards = (data, dictionary, destinationTag) => {
  const fragment = document.createDocumentFragment();
  // Сейчас нужно создать только первую карточку
  for (let i = 0; i < 1; i++) {
    fragment.appendChild(createCard(data[i], dictionary));
  }
  destinationTag.insertBefore(fragment, destinationTag.children[1]);
};

renderCards(mocksArray, typeCyrillic, map);
