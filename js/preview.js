"use strict";

const {
  FILE_TYPES
} = window.const;

const getPreview = (inputFile, container) => {
  inputFile.addEventListener(`change`, () => {
    const file = inputFile.files[0];

    const matches = FILE_TYPES.some((element) => {
      return file.type.endsWith(element);
    });

    if (matches) {
      const reader = new FileReader();

      const onFileLoad = () => {
        if (container.querySelector(`img`)) {
          container.querySelector(`img`).src = reader.result;
        } else {
          const newImg = document.createElement(`img`);

          newImg.src = reader.result;
          newImg.style.width = container.offsetWidth + `px`;
          newImg.style.height = container.offsetHeight + `px`;
          newImg.style.objectFit = `cover`;

          container.appendChild(newImg);
          container.style.overflow = `hidden`;
        }
      };

      reader.addEventListener(`load`, onFileLoad);

      reader.readAsDataURL(file);
    }
  });
};

window.preview = {
  getPreview
};