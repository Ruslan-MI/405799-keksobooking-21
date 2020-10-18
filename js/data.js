"use strict";

(() => {
  const MOCKS_QUANTITY = 8;
  const MIN_Y = 130;
  const MAX_Y = 630;

  const {
    getRandomIndex, getRandomElements
  } = window.util;

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

  const getMocksArray = (map) => {
    let mocksArray = [];
    const {
      title, price, type, rooms, guests, checkin, checkout, features, description, photos
    } = mocksData;
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

  window.data = {
    getMocksArray
  };
})();
