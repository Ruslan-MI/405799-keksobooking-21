"use strict";

(() => {
  const {
    MAX_PINS_QUANTITY
  } = window.const;

  const mapFilters = document.querySelector(`.map__filters`);
  const housingType = mapFilters.querySelector(`#housing-type`);
  const housingPrice = mapFilters.querySelector(`#housing-price`);
  const housingRooms = mapFilters.querySelector(`#housing-rooms`);
  const housingGuests = mapFilters.querySelector(`#housing-guests`);
  // const filterWifi = mapFilters.querySelector(`#filter-wifi`);
  // const filterDishwasher = mapFilters.querySelector(`#filter-dishwasher`);
  // const filterParking = mapFilters.querySelector(`#filter-parking`);
  // const filterWasher = mapFilters.querySelector(`#filter-washer`);
  // const filterElevator = mapFilters.querySelector(`#filter-elevator`);
  // const filterConditioner = mapFilters.querySelector(`#filter-conditioner`);

  let ads = [];

  const saveAds = (data) => {
    ads = data;
  };

  const getTypeFilter = (data) => {
    return housingType.value !== `any` ? housingType.value === data.offer.type : true;
  };

  const getPriceCategory = (data) => {
    if (data < 10000) {
      return `low`;
    } else if (data > 10000 && data < 50000) {
      return `middle`;
    } else {
      return `high`;
    }
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

  const getFilter = () => {
    return ads.filter((ad) => {
      return getTypeFilter(ad) && getPriceFilter(ad) && getRoomsFilter(ad) && getGuestsFilter(ad);
    }).slice(0, MAX_PINS_QUANTITY);
  };

  window.filter = {
    saveAds, getFilter
  };
})();
