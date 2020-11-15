"use strict";

const mapFilters = document.querySelector(`.map__filters`);
const housingType = mapFilters.querySelector(`#housing-type`);
const housingPrice = mapFilters.querySelector(`#housing-price`);
const housingRooms = mapFilters.querySelector(`#housing-rooms`);
const housingGuests = mapFilters.querySelector(`#housing-guests`);

let ads = [];

const saveAds = (data) => {
  ads = data;
};

const getValidityFilter = (data) => {
  return data.offer;
};

const getTypeFilter = (data) => {
  return housingType.value !== `any` ? housingType.value === data.offer.type : true;
};

const getPriceCategory = (data) => {
  if (data < window.const.PriceThreshold.MIDDLE) {
    return `low`;
  } else if (data >= window.const.PriceThreshold.MIDDLE && data < window.const.PriceThreshold.HIGH) {
    return `middle`;
  }
  return `high`;
};

const getPriceFilter = (data) => {
  return housingPrice.value !== `any` ? housingPrice.value === getPriceCategory(data.offer.price) : true;
};

const getRoomsFilter = (data) => {
  return housingRooms.value !== `any` ? housingRooms.value === data.offer.rooms.toString() : true;
};

const getGuestsFilter = (data) => {
  return housingGuests.value !== `any` ? housingGuests.value === data.offer.guests.toString() : true;
};

const getFeatureFilter = (data) => {
  const checkedFeatureFilters = mapFilters.querySelectorAll(`.map__checkbox:checked`);

  return [...checkedFeatureFilters].every((feature) => {
    return data.offer.features.includes(feature.value);
  });
};

const getFilter = () => {
  return ads.filter((ad) => {
    return getValidityFilter(ad) && getTypeFilter(ad) && getPriceFilter(ad) && getRoomsFilter(ad) && getGuestsFilter(ad)
      && getFeatureFilter(ad);
  }).slice(0, window.const.MAX_PINS_QUANTITY);
};

window.filter = {
  saveAds,
  start: getFilter
};
