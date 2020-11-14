"use strict";

const main = document.querySelector(`main`);
const successModalTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
const errorModalTemplate = document.querySelector(`#error`).content.querySelector(`.error`);

const closeModal = () => {
  document.removeEventListener(`click`, onModalClick);
  document.removeEventListener(`keydown`, onModalEscPress);
  main.querySelectorAll(`.modal`).forEach((element) => {
    element.remove();
  });
};

const onModalClick = (evt) => {
  evt.preventDefault();
  closeModal();
};

const onModalEscPress = (evt) => {
  if (window.util.isEscapePressed(evt)) {
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
  const errorButton = errorModal.querySelector(`.error__button`);

  errorModal.classList.add(`modal`);
  errorButton.addEventListener(`click`, onModalClick);
  document.addEventListener(`click`, onModalClick);
  document.addEventListener(`keydown`, onModalEscPress);

  main.appendChild(errorModal);
};

window.modal = {
  addSuccess: addSuccessModal,
  addError: addErrorModal
};
