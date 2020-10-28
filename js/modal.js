"use strict";

(() => {
  const {
    escEvent
  } = window.util;

  const main = document.querySelector(`main`);

  const closeModal = () => {
    document.removeEventListener(`click`, onModalClick);
    document.removeEventListener(`keydown`, onModalEscPress);
    main.lastChild.remove();
  };
  const onModalClick = (evt) => {
    evt.preventDefault();
    closeModal();
  };
  const onModalEscPress = (evt) => {
    escEvent(evt, closeModal);
  };

  const addSuccessModal = () => {
    const successModalTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
    const successModal = successModalTemplate.cloneNode(true);
    const fragment = document.createDocumentFragment();
    fragment.appendChild(successModal);
    main.appendChild(fragment);
    document.addEventListener(`click`, onModalClick);
    document.addEventListener(`keydown`, onModalEscPress);
  };
  const addErrorModal = () => {
    const errorModalTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
    const errorModal = errorModalTemplate.cloneNode(true);
    const fragment = document.createDocumentFragment();
    fragment.appendChild(errorModal);
    main.appendChild(fragment);
    const errorButton = errorModal.querySelector(`.error__button`);
    errorButton.addEventListener(`click`, onModalClick);
    document.addEventListener(`click`, onModalClick);
    document.addEventListener(`keydown`, onModalEscPress);
  };

  window.modal = {
    addSuccessModal, addErrorModal
  };
})();
