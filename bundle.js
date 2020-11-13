(()=>{"use strict";window.const={PinSize:{WIDTH:50,HEIGHT:70},MainPinSize:{WIDTH:65,HEIGHT:65,SPIKE_HEIGHT:16},StatusCode:{OK:200},TIMEOUT_IN_MS:1e4,Url:{DOWNLOAD:"https://21.javascript.pages.academy/keksobooking/data",UPLOAD:"https://21.javascript.pages.academy/keksobooking"},CoordsLimit:{MIN_X:0,MIN_Y:130,MAX_Y:630},MAX_PINS_QUANTITY:5,DEBOUNCE_INTERVAL:500,FILE_TYPES:["gif","jpg","jpeg","png"]},(()=>{const{FILE_TYPES:e}=window.const;window.preview={getPreview:(t,o)=>{t.addEventListener("change",(()=>{const r=t.files[0];if(e.some((e=>r.type.endsWith(e)))){const e=new FileReader,t=()=>{const t=o.querySelector("img");if(t)t.src=e.result;else{const t=document.createElement("img");t.src=e.result,t.style.width=o.offsetWidth+"px",t.style.height=o.offsetHeight+"px",t.style.objectFit="cover",o.appendChild(t),o.style.overflow="hidden"}};e.addEventListener("load",t),e.readAsDataURL(r)}}))}}})(),(()=>{const e=e=>Math.floor(Math.random()*e.length),t=(e,t)=>{Array.isArray(t)&&0===t.length?e.style.display="none":t||(e.style.display="none")},o=e=>{switch(e){case 1:return" комната";default:return" комнаты"}};window.util={getRandomIndex:e,getRandomElements:t=>{let o=[],r=Math.ceil(Math.random()*t.length);for(;o.length!==r;){let r=t[e(t)];o.includes(r)||o.push(r)}return o},addDisabledForChildren:e=>{const t=e.children;for(let e of t)e.setAttribute("disabled","")},removeDisabledForChildren:e=>{const t=e.children;for(let e of t)e.removeAttribute("disabled")},fillingCardElement:(e,o)=>{t(e,o),e.classList.contains("popup__text--price")?e.textContent=o+"₽/ночь":e.classList.contains("popup__avatar")?e.src=o:e.textContent=o},getCardCapacity:(e,r,n)=>{t(e,r),e.textContent=n?r+o(r)+" для "+n+(e=>{switch(e){case 1:return" гостя";default:return" гостей"}})(n):r+o(r)},getCardTime:(e,o,r)=>{t(e,o),e.textContent=r?"Заезд после "+o+", выезд до "+r:"Заезд после "+o},getCurrentFeatures:(e,o)=>{t(e,o),e.innerHTML="";const r=document.createDocumentFragment();o.forEach((e=>{const t=document.createElement("li");t.classList.add("popup__feature","popup__feature--"+e),r.appendChild(t)})),e.appendChild(r)},getCardPhotos:(e,o)=>{t(e,o),e.innerHTML="";const r=document.createDocumentFragment();o.forEach((e=>{const t=document.createElement("img");t.classList.add("popup__photo"),t.src=e,t.style.width="45px",t.style.height="40px",t.alt="Фотография жилья",r.appendChild(t)})),e.appendChild(r)},isEnterPressed:e=>"Enter"===e.key,isEscapePressed:e=>"Escape"===e.key,isTabPressed:e=>"Tab"===e.key,isMainButtonPressed:e=>0===e.button}})(),(()=>{const{DEBOUNCE_INTERVAL:e}=window.const;window.debounce={debounce:t=>{let o=null;return(...r)=>{o&&window.clearTimeout(o),o=window.setTimeout((()=>{t(...r)}),e)}}}})(),(()=>{const{isEscapePressed:e}=window.util,t=document.querySelector("main"),o=document.querySelector("#success").content.querySelector(".success"),r=document.querySelector("#error").content.querySelector(".error"),n=()=>{document.removeEventListener("click",a),document.removeEventListener("keydown",s),t.querySelectorAll(".modal").forEach((e=>{e.remove()}))},a=e=>{e.preventDefault(),n()},s=t=>{e(t)&&(t.preventDefault(),n())};window.modal={addSuccessModal:()=>{const e=o.cloneNode(!0);e.classList.add("modal"),t.appendChild(e),document.addEventListener("click",a),document.addEventListener("keydown",s)},addErrorModal:()=>{const e=r.cloneNode(!0),o=e.querySelector(".error__button");e.classList.add("modal"),o.addEventListener("click",a),document.addEventListener("click",a),document.addEventListener("keydown",s),t.appendChild(e)}}})(),(()=>{const{CoordsLimit:e}=window.const;let t;window.move={getMove:(t,o)=>{t.addEventListener("mousedown",(r=>{r.preventDefault();let n={x:r.clientX,y:r.clientY};const a=r=>{r.preventDefault();const a=n.x-r.clientX,s=n.y-r.clientY;n={x:r.clientX,y:r.clientY};let d=o(),i=t.offsetLeft-a,c=t.offsetTop-s;const l=e.MIN_X-d.x,u=t.parentElement.offsetWidth-d.x,p=e.MIN_Y-d.y,m=e.MAX_Y-d.y;t.style.left=i<l?l+"px":i>u?u+"px":i+"px",t.style.top=c<p?p+"px":c>m?m+"px":c+"px"},s=e=>{e.preventDefault(),document.removeEventListener("mousemove",a),document.removeEventListener("mouseup",s)};document.addEventListener("mousemove",a),document.addEventListener("mouseup",s)}))},getDefaultOffsets:e=>{t={left:e.offsetLeft,top:e.offsetTop}},setDefaultOffsets:e=>{e.style.left=t.left+"px",e.style.top=t.top+"px"}}})(),(()=>{const{StatusCode:e,TIMEOUT_IN_MS:t,Url:o}=window.const,r=(o,r,n,a,s)=>{const d=new XMLHttpRequest;d.responseType="json",d.addEventListener("load",(()=>{d.status===e.OK?a(d.response):s("Статус ответа: "+d.status+" "+d.statusText)})),d.addEventListener("error",(()=>{s("Произошла ошибка соединения")})),d.addEventListener("timeout",(()=>{s("Запрос не успел выполниться за "+d.timeout+"мс")})),d.timeout=t,d.open(o,r),d.send(n)};window.backend={load:(e,t)=>{r("GET",o.DOWNLOAD,void 0,e,t)},save:(e,t,n)=>{r("POST",o.UPLOAD,e,t,n)}}})(),(()=>{const{fillingCardElement:e,getCardCapacity:t,getCardTime:o,getCurrentFeatures:r,getCardPhotos:n,isEscapePressed:a,isTabPressed:s}=window.util,d=document.querySelector(".map"),i=d.querySelector(".map__filters-container"),c=document.querySelector("#card").content.querySelector(".map__card"),l={flat:"Квартира",bungalow:"Бунгало",house:"Дом",palace:"Дворец"},u=e=>{a(e)&&(e.preventDefault(),p(),d.querySelector(".map__pin--active").focus())},p=()=>{const e=d.querySelector(".map__card");e&&(e.remove(),document.removeEventListener("keydown",u))};window.card={renderCard:a=>{p(),d.insertBefore((a=>{const i=c.cloneNode(!0),m=i.querySelector(".popup__close"),f=d.querySelector(".map__pin--active");return e(i.querySelector(".popup__title"),a.offer.title),e(i.querySelector(".popup__text--address"),a.offer.address),e(i.querySelector(".popup__text--price"),a.offer.price),e(i.querySelector(".popup__type"),l[a.offer.type]),t(i.querySelector(".popup__text--capacity"),a.offer.rooms,a.offer.guests),o(i.querySelector(".popup__text--time"),a.offer.checkin,a.offer.checkout),r(i.querySelector(".popup__features"),a.offer.features),e(i.querySelector(".popup__description"),a.offer.description),n(i.querySelector(".popup__photos"),a.offer.photos),e(i.querySelector(".popup__avatar"),a.author.avatar),document.addEventListener("keydown",u),m.addEventListener("click",(()=>{p(),f.focus()})),m.addEventListener("keydown",(e=>{s(e)&&(e.preventDefault(),f.focus())})),i})(a),i),d.querySelector(".popup__close").focus()},removeCard:p}})(),(()=>{const{PinSize:e}=window.const,{renderCard:t}=window.card,o=document.querySelector("#pin").content.querySelector(".map__pin"),r=document.querySelector(".map__pins");window.pin={renderPins:n=>{const a=document.createDocumentFragment();n.forEach((n=>{a.appendChild((n=>{const a=o.cloneNode(!0);return a.style.left=n.location.x-e.WIDTH/2+"px",a.style.top=n.location.y-e.HEIGHT+"px",a.children[0].src=n.author.avatar,a.children[0].alt=n.offer.title,a.addEventListener("click",(()=>{const e=r.querySelector(".map__pin--active");e&&e.classList.remove("map__pin--active"),a.classList.add("map__pin--active"),t(n)})),a})(n))})),r.appendChild(a)},removePins:()=>{r.querySelectorAll(".map__pin:not(.map__pin--main)").forEach((e=>{e.remove()}))}}})(),(()=>{const{MainPinSize:e}=window.const,t=document.querySelector(".ad-form"),o=t.querySelector("#room_number"),r=t.querySelector("#capacity"),n=t.querySelector("#address"),a=t.querySelector("#type"),s=t.querySelector("#price"),d=t.querySelector("#timein"),i=t.querySelector("#timeout"),c=document.querySelector(".map"),l=c.querySelector(".map__pin--main"),u={bungalow:0,flat:1e3,house:5e3,palace:1e4},p=()=>{"100"===o.value?r.value="0":("100"!==o.value&&"0"===r.value||o.value<r.value)&&(r.value=o.value)};o.addEventListener("change",(()=>{p()})),r.addEventListener("change",(()=>{"0"===r.value?o.value="100":("0"!==r.value&&"100"===o.value||r.value>o.value)&&(o.value=r.value)}));const m=()=>{s.placeholder=u[a.value],s.min=u[a.value]};a.addEventListener("change",(()=>{m()}));const f=()=>{i.value=d.value};d.addEventListener("change",(()=>{f()})),i.addEventListener("change",(()=>{d.value=i.value})),window.form={getMainPinCoordinates:()=>{const t=e.WIDTH/2;let o=e.HEIGHT/2;return c.classList.contains("map--faded")||(o=e.HEIGHT+e.SPIKE_HEIGHT),n.value=Math.floor(l.offsetLeft+t)+", "+Math.floor(l.offsetTop+o),{x:t,y:o}},getStartValidation:()=>{p(),m(),f()}}})(),(()=>{const{MAX_PINS_QUANTITY:e}=window.const,t=document.querySelector(".map__filters"),o=t.querySelector("#housing-type"),r=t.querySelector("#housing-price"),n=t.querySelector("#housing-rooms"),a=t.querySelector("#housing-guests");let s=[];window.filter={saveAds:e=>{s=e},getFilter:()=>s.filter((e=>{return e.offer&&(s=e,"any"===o.value||o.value===s.offer.type)&&(e=>"any"===r.value||r.value===(e=>e<1e4?"low":e>=1e4&&e<5e4?"middle":"high")(e.offer.price))(e)&&(e=>"any"===n.value||n.value===e.offer.rooms.toString())(e)&&(e=>"any"===a.value||a.value===e.offer.guests.toString())(e)&&(e=>[...t.querySelectorAll(".map__checkbox:checked")].every((t=>e.offer.features.includes(t.value))))(e);var s})).slice(0,e)}})(),(()=>{const{addDisabledForChildren:e,removeDisabledForChildren:t,isEnterPressed:o,isMainButtonPressed:r}=window.util,{renderPins:n,removePins:a}=window.pin,{getMainPinCoordinates:s,getStartValidation:d}=window.form,{load:i,save:c}=window.backend,{addSuccessModal:l,addErrorModal:u}=window.modal,{getMove:p,getDefaultOffsets:m,setDefaultOffsets:f}=window.move,{removeCard:v}=window.card,{saveAds:y,getFilter:_}=window.filter,{debounce:w}=window.debounce,{getPreview:E}=window.preview,S=document.querySelector(".map"),h=S.querySelector(".map__filters"),g=S.querySelector(".map__pin--main"),L=document.querySelector(".ad-form"),q=L.querySelector(".ad-form__reset"),C=L.querySelector(".ad-form-header__input"),T=L.querySelector(".ad-form-header__preview"),x=T.querySelector("img"),D=L.querySelector(".ad-form__input"),b=L.querySelector(".ad-form__photo"),M=x.src,k=e=>{t(h),y(e),n(_())},P=e=>{const t=document.createElement("div");t.style="z-index: 100; margin: 0 auto; text-align: center; background-color: red;",t.style.position="absolute",t.style.left=0,t.style.right=0,t.style.fontSize="30px",t.textContent=e,document.body.insertAdjacentElement("afterbegin",t)},I=()=>{S.classList.remove("map--faded"),L.classList.remove("ad-form--disabled"),t(L),s(),i(k,P),d(),g.removeEventListener("mousedown",A),g.removeEventListener("keydown",H)},A=e=>{r(e)&&I()},H=e=>{o(e)&&I()},N=()=>{S.classList.add("map--faded"),L.reset(),h.reset(),L.classList.add("ad-form--disabled"),e(L),e(h),f(g),s(),a(),v(),x.src=M,b.querySelector("img").remove(),g.addEventListener("mousedown",A),g.addEventListener("keydown",H)};e(L),e(h),s(),m(g),p(g,s),g.addEventListener("mousedown",A),g.addEventListener("keydown",H),L.addEventListener("submit",(e=>{c(new FormData(L),(()=>{N(),l()}),u),e.preventDefault()})),q.addEventListener("click",(e=>{e.preventDefault(),L.reset(),h.reset(),N()}));const O=w((()=>{v(),a(),n(_())}));h.addEventListener("change",O),E(C,T),E(D,b)})()})();