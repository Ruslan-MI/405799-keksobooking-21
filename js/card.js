"use strict";

(() => {
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
  const typeCyrillic = {
    flat: `Квартира`,
    bungalow: `Бунгало`,
    house: `Дом`,
    palace: `Дворец`
  };

  const getCurrentFeatures = (destinationTag, data) => {
    const dataFeatures = data.offer.features;
    if (dataFeatures.length === 0) {
      destinationTag.style.display = `none`;
      return;
    }
    const featureElements = destinationTag.children;
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
        featureElements[i].style.display = `none`;
      }
    }
  };

  const getCardPhotos = (destinationTag, data) => {
    const photos = data.offer.photos;
    if (photos.length === 0) {
      destinationTag.style.display = `none`;
      return;
    }
    const photo = destinationTag.children[0];
    photo.src = photos[0];
    const photosQuantity = photos.length;
    if (photosQuantity > 1) {
      const fragment = document.createDocumentFragment();
      for (let i = 1; i < photosQuantity; i++) {
        const newPhoto = photo.cloneNode(true);
        newPhoto.src = photos[i];
        fragment.appendChild(newPhoto);
      }
      destinationTag.appendChild(fragment);
    }
  };

  const fillingCardElement = (cardElement, data, data2) => {
    if (!data) {
      cardElement.style.display = `none`;
      return;
    }
    if (cardElement.classList.contains(`popup__text--price`)) {
      cardElement.textContent = data + `₽/ночь`;
      return;
    } else if (cardElement.classList.contains(`popup__text--capacity`)) {
      let roomCyrillic = ` комнаты`;
      if (data === 1) {
        roomCyrillic = ` комната`;
      }
      if (!data2) {
        cardElement.textContent = data + roomCyrillic;
        return;
      }
      let guestCyrillic = ` гостей`;
      if (data2 === 1) {
        guestCyrillic = ` гостя`;
      }
      cardElement.textContent = data + roomCyrillic + ` для ` + data2 + guestCyrillic;
      return;
    } else if (cardElement.classList.contains(`popup__text--time`)) {
      if (!data2) {
        cardElement.textContent = `Заезд после ` + data;
        return;
      }
      cardElement.textContent = `Заезд после ` + data + `, выезд до ` + data2;
      return;
    } else if (cardElement.classList.contains(`popup__avatar`)) {
      cardElement.src = data;
      return;
    }
    cardElement.textContent = data;
  };

  const createCard = (data) => {
    const newCard = cardTemplate.cloneNode(true);
    fillingCardElement(newCard.querySelector(`.popup__title`), data.offer.title);
    fillingCardElement(newCard.querySelector(`.popup__text--address`), data.offer.address);
    fillingCardElement(newCard.querySelector(`.popup__text--price`), data.offer.price);
    fillingCardElement(newCard.querySelector(`.popup__type`), typeCyrillic[data.offer.type]);
    fillingCardElement(newCard.querySelector(`.popup__text--capacity`), data.offer.rooms, data.offer.guests);
    fillingCardElement(newCard.querySelector(`.popup__text--time`), data.offer.checkin, data.offer.checkout);
    getCurrentFeatures(newCard.querySelector(`.popup__features`), data);
    fillingCardElement(newCard.querySelector(`.popup__description`), data.offer.description);
    getCardPhotos(newCard.querySelector(`.popup__photos`), data);
    fillingCardElement(newCard.querySelector(`.popup__avatar`), data.author.avatar);
    return newCard;
  };

  const renderCards = (data, destinationTag) => {
    const fragment = document.createDocumentFragment();
    // Сейчас нужно создать только первую карточку
    for (let i = 0; i < 1; i++) {
      fragment.appendChild(createCard(data[i]));
    }
    destinationTag.insertBefore(fragment, destinationTag.children[1]);
  };

  window.card = {
    renderCards
  };
})();
