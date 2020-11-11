"use strict";

const main = document.querySelector(`main`);
const successModalTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
const errorModalTemplate = document.querySelector(`#error`).content.querySelector(`.error`);

const closeModal = () => {
  document.removeEventListener(`click`, onModalClick);
  document.removeEventListener(`keydown`, onModalEscPress);
  main.querySelector(`.modal`).remove();
};

const onModalClick = (evt) => {
  evt.preventDefault();
  closeModal();
};

const onModalEscPress = (evt) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closeModal();
  }
};

const addSuccessModal = () => {
  const successModal = successModalTemplate.cloneNode(true);
  successModal.classList.add(`modal`);
  main.appendChild(successModal);
  document.addEventListener(`click`, onModalClick);
  document.addEventListener(`keydown`, onModalEscPress);
};

const addErrorModal = () => {
  const errorModal = errorModalTemplate.cloneNode(true);
  errorModal.classList.add(`modal`);
  main.appendChild(errorModal);
  const errorButton = errorModal.querySelector(`.error__button`);
  errorButton.addEventListener(`click`, onModalClick);
  document.addEventListener(`click`, onModalClick);
  document.addEventListener(`keydown`, onModalEscPress);
};

window.modal = {
  addSuccessModal, addErrorModal
};
