(()=>{var e={484:function(e){e.exports=function(){"use strict";var e=6e4,t=36e5,n="millisecond",i="second",s="minute",a="hour",r="day",o="week",c="month",d="quarter",l="year",f="date",p="Invalid Date",u=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,h=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,v={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var t=["th","st","nd","rd"],n=e%100;return"["+e+(t[(n-20)%10]||t[n]||t[0])+"]"}},b=function(e,t,n){var i=String(e);return!i||i.length>=t?e:""+Array(t+1-i.length).join(n)+e},m={s:b,z:function(e){var t=-e.utcOffset(),n=Math.abs(t),i=Math.floor(n/60),s=n%60;return(t<=0?"+":"-")+b(i,2,"0")+":"+b(s,2,"0")},m:function e(t,n){if(t.date()<n.date())return-e(n,t);var i=12*(n.year()-t.year())+(n.month()-t.month()),s=t.clone().add(i,c),a=n-s<0,r=t.clone().add(i+(a?-1:1),c);return+(-(i+(n-s)/(a?s-r:r-s))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(e){return{M:c,y:l,w:o,d:r,D:f,h:a,m:s,s:i,ms:n,Q:d}[e]||String(e||"").toLowerCase().replace(/s$/,"")},u:function(e){return void 0===e}},_="en",y={};y[_]=v;var g="$isDayjsObject",$=function(e){return e instanceof w||!(!e||!e[g])},M=function e(t,n,i){var s;if(!t)return _;if("string"==typeof t){var a=t.toLowerCase();y[a]&&(s=a),n&&(y[a]=n,s=a);var r=t.split("-");if(!s&&r.length>1)return e(r[0])}else{var o=t.name;y[o]=t,s=o}return!i&&s&&(_=s),s||!i&&_},D=function(e,t){if($(e))return e.clone();var n="object"==typeof t?t:{};return n.date=e,n.args=arguments,new w(n)},T=m;T.l=M,T.i=$,T.w=function(e,t){return D(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var w=function(){function v(e){this.$L=M(e.locale,null,!0),this.parse(e),this.$x=this.$x||e.x||{},this[g]=!0}var b=v.prototype;return b.parse=function(e){this.$d=function(e){var t=e.date,n=e.utc;if(null===t)return new Date(NaN);if(T.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var i=t.match(u);if(i){var s=i[2]-1||0,a=(i[7]||"0").substring(0,3);return n?new Date(Date.UTC(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,a)):new Date(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,a)}}return new Date(t)}(e),this.init()},b.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},b.$utils=function(){return T},b.isValid=function(){return!(this.$d.toString()===p)},b.isSame=function(e,t){var n=D(e);return this.startOf(t)<=n&&n<=this.endOf(t)},b.isAfter=function(e,t){return D(e)<this.startOf(t)},b.isBefore=function(e,t){return this.endOf(t)<D(e)},b.$g=function(e,t,n){return T.u(e)?this[t]:this.set(n,e)},b.unix=function(){return Math.floor(this.valueOf()/1e3)},b.valueOf=function(){return this.$d.getTime()},b.startOf=function(e,t){var n=this,d=!!T.u(t)||t,p=T.p(e),u=function(e,t){var i=T.w(n.$u?Date.UTC(n.$y,t,e):new Date(n.$y,t,e),n);return d?i:i.endOf(r)},h=function(e,t){return T.w(n.toDate()[e].apply(n.toDate("s"),(d?[0,0,0,0]:[23,59,59,999]).slice(t)),n)},v=this.$W,b=this.$M,m=this.$D,_="set"+(this.$u?"UTC":"");switch(p){case l:return d?u(1,0):u(31,11);case c:return d?u(1,b):u(0,b+1);case o:var y=this.$locale().weekStart||0,g=(v<y?v+7:v)-y;return u(d?m-g:m+(6-g),b);case r:case f:return h(_+"Hours",0);case a:return h(_+"Minutes",1);case s:return h(_+"Seconds",2);case i:return h(_+"Milliseconds",3);default:return this.clone()}},b.endOf=function(e){return this.startOf(e,!1)},b.$set=function(e,t){var o,d=T.p(e),p="set"+(this.$u?"UTC":""),u=(o={},o[r]=p+"Date",o[f]=p+"Date",o[c]=p+"Month",o[l]=p+"FullYear",o[a]=p+"Hours",o[s]=p+"Minutes",o[i]=p+"Seconds",o[n]=p+"Milliseconds",o)[d],h=d===r?this.$D+(t-this.$W):t;if(d===c||d===l){var v=this.clone().set(f,1);v.$d[u](h),v.init(),this.$d=v.set(f,Math.min(this.$D,v.daysInMonth())).$d}else u&&this.$d[u](h);return this.init(),this},b.set=function(e,t){return this.clone().$set(e,t)},b.get=function(e){return this[T.p(e)]()},b.add=function(n,d){var f,p=this;n=Number(n);var u=T.p(d),h=function(e){var t=D(p);return T.w(t.date(t.date()+Math.round(e*n)),p)};if(u===c)return this.set(c,this.$M+n);if(u===l)return this.set(l,this.$y+n);if(u===r)return h(1);if(u===o)return h(7);var v=(f={},f[s]=e,f[a]=t,f[i]=1e3,f)[u]||1,b=this.$d.getTime()+n*v;return T.w(b,this)},b.subtract=function(e,t){return this.add(-1*e,t)},b.format=function(e){var t=this,n=this.$locale();if(!this.isValid())return n.invalidDate||p;var i=e||"YYYY-MM-DDTHH:mm:ssZ",s=T.z(this),a=this.$H,r=this.$m,o=this.$M,c=n.weekdays,d=n.months,l=n.meridiem,f=function(e,n,s,a){return e&&(e[n]||e(t,i))||s[n].slice(0,a)},u=function(e){return T.s(a%12||12,e,"0")},v=l||function(e,t,n){var i=e<12?"AM":"PM";return n?i.toLowerCase():i};return i.replace(h,(function(e,i){return i||function(e){switch(e){case"YY":return String(t.$y).slice(-2);case"YYYY":return T.s(t.$y,4,"0");case"M":return o+1;case"MM":return T.s(o+1,2,"0");case"MMM":return f(n.monthsShort,o,d,3);case"MMMM":return f(d,o);case"D":return t.$D;case"DD":return T.s(t.$D,2,"0");case"d":return String(t.$W);case"dd":return f(n.weekdaysMin,t.$W,c,2);case"ddd":return f(n.weekdaysShort,t.$W,c,3);case"dddd":return c[t.$W];case"H":return String(a);case"HH":return T.s(a,2,"0");case"h":return u(1);case"hh":return u(2);case"a":return v(a,r,!0);case"A":return v(a,r,!1);case"m":return String(r);case"mm":return T.s(r,2,"0");case"s":return String(t.$s);case"ss":return T.s(t.$s,2,"0");case"SSS":return T.s(t.$ms,3,"0");case"Z":return s}return null}(e)||s.replace(":","")}))},b.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},b.diff=function(n,f,p){var u,h=this,v=T.p(f),b=D(n),m=(b.utcOffset()-this.utcOffset())*e,_=this-b,y=function(){return T.m(h,b)};switch(v){case l:u=y()/12;break;case c:u=y();break;case d:u=y()/3;break;case o:u=(_-m)/6048e5;break;case r:u=(_-m)/864e5;break;case a:u=_/t;break;case s:u=_/e;break;case i:u=_/1e3;break;default:u=_}return p?u:T.a(u)},b.daysInMonth=function(){return this.endOf(c).$D},b.$locale=function(){return y[this.$L]},b.locale=function(e,t){if(!e)return this.$L;var n=this.clone(),i=M(e,t,!0);return i&&(n.$L=i),n},b.clone=function(){return T.w(this.$d,this)},b.toDate=function(){return new Date(this.valueOf())},b.toJSON=function(){return this.isValid()?this.toISOString():null},b.toISOString=function(){return this.$d.toISOString()},b.toString=function(){return this.$d.toUTCString()},v}(),O=w.prototype;return D.prototype=O,[["$ms",n],["$s",i],["$m",s],["$H",a],["$W",r],["$M",c],["$y",l],["$D",f]].forEach((function(e){O[e[1]]=function(t){return this.$g(t,e[0],e[1])}})),D.extend=function(e,t){return e.$i||(e(t,w,D),e.$i=!0),D},D.locale=M,D.isDayjs=$,D.unix=function(e){return D(1e3*e)},D.en=y[_],D.Ls=y,D.p={},D}()}},t={};function n(i){var s=t[i];if(void 0!==s)return s.exports;var a=t[i]={exports:{}};return e[i].call(a.exports,a,a.exports,n),a.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";const e="beforeend";function t(e){const t=document.createElement("div");return t.innerHTML=e,t.firstElementChild}function i(t,n,i=e){n.insertAdjacentElement(i,t.getElement())}var s=n(484),a=n.n(s);function r(e){return e.charAt(0).toUpperCase()+e.slice(1)}function o(e){return a()(e).format("DD/MM/YY HH:mm")}function c(e){return a()(e).format("YYYY-MM-DDTHH:mm")}function d(e){return a()(e).format("HH:mm")}function l(e,t){return`<div class="event__type-item">\n            <input id="event-type-${e}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${e}"  ${t?"checked":""}>\n            <label class="event__type-label  event__type-label--${e}" for="event-type-${e}-1">${r(e)}</label>\n          </div>`}function f(e,t,n,i){return`\n    <div class="event__offer-selector">\n      <input id="event-offer-${e}-1" class="event__offer-checkbox visually-hidden" type="checkbox" name="event-offer-${e}" ${i?"checked":""}>\n      <label class="event__offer-label" for="${e}">\n        <span class="event__offer-title">${t}</span>\n        &plus;&euro;&nbsp;\n        <span class="event__offer-price">${n}</span>\n      </label>\n    </div>\n  `}const p=[{type:"everything",checked:!0},{type:"future"},{type:"present"},{type:"past"}];const u=["taxi","bus","train","ship","drive","flight","check-in","sightseeing","restaurant"];class h{constructor({point:e,allOffers:t,pointDestination:n,allDestination:i}){this.point=e,this.allOffers=t,this.pointDestination=n,this.allDestination=i}getTemplate(){return function(e,t,n,i){const{basePrice:s,type:a}=e,{name:r,description:c,pictures:d}=n,p=u.map((e=>l(e,e===a))).join(""),h=t.offers.map((n=>{const i=e.offers.includes(n.id);return f(t.type,n.title,n.price,i)})).join("");return`<form class="event event--edit" action="#" method="post">\n            <header class="event__header">\n              <div class="event__type-wrapper">\n                <label class="event__type  event__type-btn" for="event-type-toggle-1">\n                  <span class="visually-hidden">Choose event type</span>\n                  <img class="event__type-icon" width="17" height="17" src="img/icons/${a}.png" alt="Event type icon">\n                </label>\n                <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">\n\n                <div class="event__type-list">\n                  <fieldset class="event__type-group">\n                    <legend class="visually-hidden">Event type</legend>\n                    ${p}\n                  </fieldset>\n                </div>\n              </div>\n\n              <div class="event__field-group  event__field-group--destination">\n                <label class="event__label  event__type-output" for="event-destination-1">\n                  ${a}\n                </label>\n                <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${r}" list="destination-list-1">\n                <datalist id="destination-list-1">\n                  ${i.map((e=>`<option value="${e.name}"></option>`)).join("")}\n                </datalist>\n              </div>\n\n              <div class="event__field-group  event__field-group--time">\n                <label class="visually-hidden" for="event-start-time-1">From</label>\n                <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${o(e.dateFrom)}">\n                &mdash;\n                <label class="visually-hidden" for="event-end-time-1">To</label>\n                <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${o(e.dateTo)}">\n              </div>\n\n              <div class="event__field-group  event__field-group--price">\n                <label class="event__label" for="event-price-1">\n                  <span class="visually-hidden">Price</span>\n                  &euro;\n                </label>\n                <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${s}">\n              </div>\n\n              <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n              <button class="event__reset-btn" type="reset">Cancel</button>\n            </header>\n            <section class="event__details">\n              <section class="event__section  event__section--offers">\n                <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n\n                <div class="event__available-offers">\n                  ${h}\n                </div>\n              </section>\n\n                <section class="event__section  event__section--destination">\n                  <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n                  ${c?`<p class="event__destination-description">${c}</p>`:""}\n\n                  <div class="event__photos-container">\n                    <div class="event__photos-tape">\n                      ${0!==d.length?d.map((e=>`<img class="event__photo" src="${e.src}" alt="${e.description}"></img>`)).join(""):""}\n                    </div>\n                  </div>\n                </section>\n            </section>\n          </form>`}(this.point,this.allOffers,this.pointDestination,this.allDestination)}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}class v{constructor({point:e,allOffers:t,pointDestination:n,allDestination:i}){this.point=e,this.allOffers=t,this.pointDestination=n,this.allDestination=i}getTemplate(){return function(e,t,n,i){const{basePrice:s,type:a}=e,{name:r,description:c}=n,d=u.map((e=>l(e,e===a))).join(""),p=t.offers.map((n=>{const i=e.offers.includes(n.id);return f(t.type,n.title,n.price,i)})).join("");return`<form class="event event--edit" action="#" method="post">\n            <header class="event__header">\n              <div class="event__type-wrapper">\n                <label class="event__type  event__type-btn" for="event-type-toggle-1">\n                  <span class="visually-hidden">Choose event type</span>\n                  <img class="event__type-icon" width="17" height="17" src="img/icons/${a}.png" alt="Event type icon">\n                </label>\n                <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">\n\n                <div class="event__type-list">\n                  <fieldset class="event__type-group">\n                    <legend class="visually-hidden">Event type</legend>\n                    ${d}\n                  </fieldset>\n                </div>\n              </div>\n\n              <div class="event__field-group  event__field-group--destination">\n                <label class="event__label  event__type-output" for="event-destination-1">\n                  ${a}\n                </label>\n                <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${r}" list="destination-list-1">\n                <datalist id="destination-list-1">\n                  ${i.map((e=>`<option value="${e.name}"></option>`)).join("")}\n                </datalist>\n              </div>\n\n              <div class="event__field-group  event__field-group--time">\n                <label class="visually-hidden" for="event-start-time-1">From</label>\n                <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${o(e.dateFrom)}">\n                &mdash;\n                <label class="visually-hidden" for="event-end-time-1">To</label>\n                <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${o(e.dateTo)}">\n              </div>\n\n              <div class="event__field-group  event__field-group--price">\n                <label class="event__label" for="event-price-1">\n                  <span class="visually-hidden">Price</span>\n                  &euro;\n                </label>\n                <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${s}">\n              </div>\n\n              <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n              <button class="event__reset-btn" type="reset">Delete</button>\n              <button class="event__rollup-btn" type="button">\n                <span class="visually-hidden">Open event</span>\n              </button>\n            </header>\n            <section class="event__details">\n              ${0!==p.length?`\n              <section class="event__section  event__section--offers">\n                <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n\n                <div class="event__available-offers">\n                  ${p}\n                </div>\n              </section>`:""}\n\n              ${c?`\n                <section class="event__section  event__section--destination">\n                  <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n                  <p class="event__destination-description">${c}</p>\n                </section>\n                `:""}\n            </section>\n          </form>`}(this.point,this.allOffers,this.pointDestination,this.allDestination)}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}class b{getTemplate(){return'<ul class="trip-events__list"></ul>'}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}addItem(e){const t=this.getElement(),n=document.createElement("li");n.className="trip-events__item",n.appendChild(e),t.appendChild(n)}}class m{constructor({point:e,offers:t,destination:n}){this.point=e,this.offers=t,this.destination=n}getTemplate(){return function(e,t,n){const{basePrice:i,type:s,isFavorite:r}=e;return`<div class="event">\n            <time class="event__date" datetime="${o=e.dateFrom,a()(o).format("YYYY-MM-DD")}">${function(e){return a()(e).format("MMM DD")}(e.dateFrom)}</time>\n            <div class="event__type">\n              <img class="event__type-icon" width="42" height="42" src="img/icons/${s}.png" alt="Event type icon">\n            </div>\n            <h3 class="event__title">${s} ${n.name}</h3>\n            <div class="event__schedule">\n              <p class="event__time">\n                <time class="event__start-time" datetime="${c(e.dateFrom)}">${d(e.dateFrom)}</time>\n                &mdash;\n                <time class="event__end-time" datetime="${c(e.dateTo)}">${d(e.dateTo)}</time>\n              </p>\n              <p class="event__duration">${function(e,t){const n=a()(e),i=a()(t).diff(n),s=36e5,r=864e5,o=Math.floor(i/r),c=Math.floor(i%r/s),d=Math.floor(i%s/6e4),l=e=>e<10?`0${e}`:e;return o>0?`${o}D ${l(c)}H ${l(d)}M`:c>0?`${l(c)}H ${l(d)}M`:`${l(d)}M`}(e.dateFrom,e.dateTo)}</p>\n            </div>\n            <p class="event__price">\n              &euro;&nbsp;<span class="event__price-value">${i}</span>\n            </p>\n            <h4 class="visually-hidden">Offers:</h4>\n            <ul class="event__selected-offers">\n              ${t.map((e=>`\n                <li class="event__offer">\n                  <span class="event__offer-title">${e.title}</span>\n                  &plus;&euro;&nbsp;\n                  <span class="event__offer-price">${e.price}</span>\n                </li>\n              `)).join("")}\n            </ul>\n            <button class="event__favorite-btn ${r?"event__favorite-btn--active":""} type="button">\n              <span class="visually-hidden">Add to favorite</span>\n              <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n                <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n              </svg>\n            </button>\n            <button class="event__rollup-btn" type="button">\n              <span class="visually-hidden">Open event</span>\n            </button>\n          </div>`;var o}(this.point,this.offers,this.destination)}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}const _=[{type:"day",checked:!0},{type:"event",disabled:!0},{type:"time"},{type:"price"},{type:"offer",disabled:!0}];class y{getTemplate(){return`<form class="trip-events__trip-sort  trip-sort" action="#" method="get">${_.map((e=>function(e){const{type:t,checked:n=!1,disabled:i=!1}=e;return`<div class="trip-sort__item  trip-sort__item--${t}">\n            <input id="sort-${t}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${t}" ${n?"checked":""} ${i?"disabled":""}>\n            <label class="trip-sort__btn" for="sort-${t}">${r(t)}</label>\n          </div>`}(e))).join("")}</form>`}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}const g=function(e){for(let t=e.length-1;t>0;t--){const n=Math.floor(Math.random()*(t+1));[e[t],e[n]]=[e[n],e[t]]}return e}([{id:"7594223c-c977-4e29-98c1-3e874184ce7b",basePrice:8325,dateFrom:"2024-09-27T22:01:09.952Z",dateTo:"2024-09-29T15:49:09.952Z",destination:"3863e6c2-e62e-4dca-935a-b40ca780180b",isFavorite:!0,offers:["461eac96-a50e-484b-84ab-c120da90c021","0c922f03-4dc0-4fd3-b795-e4fd944707d8","3a03c395-c373-45f5-80db-305737047680","66d15808-5a60-4dcf-a3ea-ecc431981d3a","17ea81f9-febb-4d87-921b-4497fb7b2d8b"],type:"check-in"},{id:"e8bd323c-bc4d-476e-a025-1c2b84b270d8",basePrice:3825,dateFrom:"2024-09-30T02:46:09.952Z",dateTo:"2024-10-01T08:26:09.952Z",destination:"085cb853-3a05-413a-a9c6-bd4e3fc3f21f",isFavorite:!0,offers:["6c6c127a-c278-4ac5-9ff1-a7dbeb31ff86","1cee50cd-1bd5-4478-86a2-7a24daf8569b"],type:"flight"},{id:"47fabaf0-2c9a-444a-b3b0-57500c28330b",basePrice:7283,dateFrom:"2024-10-02T15:04:09.952Z",dateTo:"2024-10-03T03:15:09.952Z",destination:"8dc2a6e7-f41e-4814-91b3-595a757d35e6",isFavorite:!0,offers:[],type:"sightseeing"},{id:"e88e8560-1ca6-4ff3-aee4-3019ca224ced",basePrice:4552,dateFrom:"2024-10-04T11:08:09.952Z",dateTo:"2024-10-06T09:05:09.952Z",destination:"8dc2a6e7-f41e-4814-91b3-595a757d35e6",isFavorite:!0,offers:["600abbe0-fab9-484a-81de-6463770115c3"],type:"ship"},{id:"e02d2fc0-b125-487f-8d6f-ec25af57a0c2",basePrice:4413,dateFrom:"2024-10-08T03:27:09.952Z",dateTo:"2024-10-09T06:06:09.952Z",destination:"085cb853-3a05-413a-a9c6-bd4e3fc3f21f",isFavorite:!0,offers:[],type:"sightseeing"},{id:"64ca2f55-68f6-4c57-9df1-9ac73b8da7ee",basePrice:4504,dateFrom:"2024-10-10T12:53:09.952Z",dateTo:"2024-10-11T05:27:09.952Z",destination:"0f076d37-07ca-4bd2-9405-1db9d63555df",isFavorite:!1,offers:[],type:"ship"},{id:"f80cafbc-b737-479e-9a0b-607038d955c5",basePrice:5984,dateFrom:"2024-10-11T13:25:09.952Z",dateTo:"2024-10-13T07:02:09.952Z",destination:"0f076d37-07ca-4bd2-9405-1db9d63555df",isFavorite:!0,offers:["3e6497ae-795a-4ed9-911f-d04b87e46466","545bd287-cabc-4144-a451-6320fc9812c9"],type:"drive"},{id:"92d64d4c-303f-47ee-9116-87e165fb9d26",basePrice:9293,dateFrom:"2024-10-15T02:46:09.952Z",dateTo:"2024-10-15T09:01:09.952Z",destination:"2184d59b-7448-4f1b-bc2a-87ca1b5d25f6",isFavorite:!0,offers:["7fefcce6-0052-4bad-bdb0-3a2ec3d06577","ef4e353b-1321-4f3e-82f5-8b01e60dde18","1f85122d-99c8-4263-8358-bfc474cccc78","74a22452-6155-4edc-a4f1-bc35c0fb08ba","600abbe0-fab9-484a-81de-6463770115c3"],type:"ship"},{id:"4764ed35-02cf-4ed2-a07a-4c74dbc4ef1c",basePrice:868,dateFrom:"2024-10-17T03:44:09.952Z",dateTo:"2024-10-18T13:03:09.952Z",destination:"63210beb-c938-483a-9f84-aa7ca8637320",isFavorite:!0,offers:["4be2bb22-3992-470f-b0b1-84cd7b1cc0fe","b8265f2c-d1be-4434-b634-14f59db3d923","18d62c22-e8b3-4b63-be10-4c3f108b8e8b"],type:"bus"},{id:"0446ef78-fc04-4ea6-a750-d50b91409d6f",basePrice:6291,dateFrom:"2024-10-19T00:52:09.952Z",dateTo:"2024-10-19T17:27:09.952Z",destination:"085cb853-3a05-413a-a9c6-bd4e3fc3f21f",isFavorite:!1,offers:[],type:"sightseeing"}]),$=[{type:"taxi",offers:[{id:"41377056-069d-44d0-97f8-605503c74807",title:"Upgrade to a business class",price:77},{id:"fc6134f5-f9b0-4f25-be74-52f5eba11d9b",title:"Choose the radio station",price:43},{id:"093af844-6c49-4bf9-a25c-c762f70a50d3",title:"Choose temperature",price:130},{id:"925d1645-a99e-42c5-8953-e574f382abdb",title:"Drive quickly, I'm in a hurry",price:52},{id:"9dc6e213-ed65-4c42-be21-402ef345145e",title:"Drive slowly",price:158}]},{type:"bus",offers:[{id:"4be2bb22-3992-470f-b0b1-84cd7b1cc0fe",title:"Infotainment system",price:76},{id:"b8265f2c-d1be-4434-b634-14f59db3d923",title:"Order meal",price:147},{id:"18d62c22-e8b3-4b63-be10-4c3f108b8e8b",title:"Choose seats",price:167}]},{type:"train",offers:[{id:"e18f4b94-239f-4035-986d-efc226fb0205",title:"Book a taxi at the arrival point",price:103},{id:"69aa9230-3137-4575-9aec-5ded92245aa9",title:"Order a breakfast",price:155},{id:"8ee8ba3b-362e-43ee-acbd-636b1ce931cc",title:"Wake up at a certain time",price:100}]},{type:"flight",offers:[{id:"77ca6b05-22ac-4693-bf9d-241eeca0893b",title:"Choose meal",price:134},{id:"7de07865-8246-493d-aff6-65294b75fb03",title:"Choose seats",price:78},{id:"01ff0c0a-c802-456b-9af6-bdc8c0c1af08",title:"Upgrade to comfort class",price:72},{id:"d916db22-6f4b-41d2-9eec-badb4b2f3fa0",title:"Upgrade to business class",price:126},{id:"6c6c127a-c278-4ac5-9ff1-a7dbeb31ff86",title:"Add luggage",price:162},{id:"1cee50cd-1bd5-4478-86a2-7a24daf8569b",title:"Business lounge",price:124}]},{type:"check-in",offers:[{id:"461eac96-a50e-484b-84ab-c120da90c021",title:"Choose the time of check-in",price:127},{id:"0c922f03-4dc0-4fd3-b795-e4fd944707d8",title:"Choose the time of check-out",price:61},{id:"3a03c395-c373-45f5-80db-305737047680",title:"Add breakfast",price:186},{id:"66d15808-5a60-4dcf-a3ea-ecc431981d3a",title:"Laundry",price:85},{id:"17ea81f9-febb-4d87-921b-4497fb7b2d8b",title:"Order a meal from the restaurant",price:36}]},{type:"sightseeing",offers:[]},{type:"ship",offers:[{id:"a46e3b48-1fd0-4c4e-b9fa-cd0423665872",title:"Choose meal",price:58},{id:"7fefcce6-0052-4bad-bdb0-3a2ec3d06577",title:"Choose seats",price:107},{id:"ef4e353b-1321-4f3e-82f5-8b01e60dde18",title:"Upgrade to comfort class",price:156},{id:"1f85122d-99c8-4263-8358-bfc474cccc78",title:"Upgrade to business class",price:122},{id:"74a22452-6155-4edc-a4f1-bc35c0fb08ba",title:"Add luggage",price:44},{id:"600abbe0-fab9-484a-81de-6463770115c3",title:"Business lounge",price:197}]},{type:"drive",offers:[{id:"3e6497ae-795a-4ed9-911f-d04b87e46466",title:"With automatic transmission",price:116},{id:"545bd287-cabc-4144-a451-6320fc9812c9",title:"With air conditioning",price:145}]},{type:"restaurant",offers:[{id:"9f24f136-bb4a-4c12-a141-b5f2219fbbbe",title:"Choose live music",price:36},{id:"8acf0435-dde2-4542-a186-d59cc6d26e9c",title:"Choose VIP area",price:131}]}],M=[{id:"2184d59b-7448-4f1b-bc2a-87ca1b5d25f6",description:"Valencia - with an embankment of a mighty river as a centre of attraction",name:"Valencia",pictures:[]},{id:"b1d6dbed-0690-4413-bab8-d8a9c16e6846",description:"Hiroshima - middle-eastern paradise",name:"Hiroshima",pictures:[{src:"https://24.objects.htmlacademy.pro/static/destinations/13.jpg",description:"Hiroshima a perfect place to stay with a family"},{src:"https://24.objects.htmlacademy.pro/static/destinations/11.jpg",description:"Hiroshima is a beautiful city"},{src:"https://24.objects.htmlacademy.pro/static/destinations/17.jpg",description:"Hiroshima with a beautiful old town"}]},{id:"ad29a0f1-8aa0-46ac-a44c-f5c0ef158a8c",description:"Vien - full of of cozy canteens where you can try the best coffee in the Middle East",name:"Vien",pictures:[{src:"https://24.objects.htmlacademy.pro/static/destinations/7.jpg",description:"Vien is a beautiful city"}]},{id:"17c4346a-2a7a-48d2-b1d8-0924e888a04f",description:"",name:"Saint Petersburg",pictures:[]},{id:"8dc2a6e7-f41e-4814-91b3-595a757d35e6",description:"Kioto - full of of cozy canteens where you can try the best coffee in the Middle East",name:"Kioto",pictures:[{src:"https://24.objects.htmlacademy.pro/static/destinations/7.jpg",description:"Kioto in a middle of Europe"},{src:"https://24.objects.htmlacademy.pro/static/destinations/3.jpg",description:"Kioto with an embankment of a mighty river as a centre of attraction"},{src:"https://24.objects.htmlacademy.pro/static/destinations/3.jpg",description:"Kioto with a beautiful old town"},{src:"https://24.objects.htmlacademy.pro/static/destinations/6.jpg",description:"Kioto for those who value comfort and coziness"}]},{id:"94a7bc26-34ee-48dc-a577-5a639137630a",description:"Rotterdam - with a beautiful old town",name:"Rotterdam",pictures:[{src:"https://24.objects.htmlacademy.pro/static/destinations/10.jpg",description:"Rotterdam in a middle of Europe"},{src:"https://24.objects.htmlacademy.pro/static/destinations/8.jpg",description:"Rotterdam with a beautiful old town"},{src:"https://24.objects.htmlacademy.pro/static/destinations/13.jpg",description:"Rotterdam middle-eastern paradise"}]},{id:"085cb853-3a05-413a-a9c6-bd4e3fc3f21f",description:"Naples - with an embankment of a mighty river as a centre of attraction",name:"Naples",pictures:[{src:"https://24.objects.htmlacademy.pro/static/destinations/4.jpg",description:"Naples for those who value comfort and coziness"},{src:"https://24.objects.htmlacademy.pro/static/destinations/13.jpg",description:"Naples for those who value comfort and coziness"},{src:"https://24.objects.htmlacademy.pro/static/destinations/6.jpg",description:"Naples with a beautiful old town"}]},{id:"63210beb-c938-483a-9f84-aa7ca8637320",description:"Barcelona - for those who value comfort and coziness",name:"Barcelona",pictures:[{src:"https://24.objects.htmlacademy.pro/static/destinations/11.jpg",description:"Barcelona in a middle of Europe"}]},{id:"3863e6c2-e62e-4dca-935a-b40ca780180b",description:"",name:"Geneva",pictures:[]},{id:"0f076d37-07ca-4bd2-9405-1db9d63555df",description:"",name:"Oslo",pictures:[]}],D=document.querySelector(".trip-main"),T=document.querySelector(".trip-controls__filters"),w=document.querySelector(".trip-events"),O=new class{points=g;getPoints(){return this.points}},j=new class{offers=$;getOffers(){return this.offers}getOffersByType(e){return this.getOffers().find((t=>t.type===e))}getOffersById(e,t){return this.getOffersByType(e).offers.filter((e=>t.includes(e.id)))}},k=new class{destinations=M;getDestinations(){return this.destinations}getDestinationsById(e){return this.getDestinations().find((t=>t.id===e))}},S=new class{eventsList=new b;constructor({container:e,pointsModel:t,offersModel:n,destinationsModel:i}){this.eventsContainer=e,this.pointsModel=t,this.offersModel=n,this.destinationsModel=i}init(){this.eventsListPoints=[...this.pointsModel.getPoints()],i(new y,this.eventsContainer),i(this.eventsList,this.eventsContainer);const e=new v({point:this.eventsListPoints[0],allOffers:this.offersModel.getOffersByType(this.eventsListPoints[0].type),pointDestination:this.destinationsModel.getDestinationsById(this.eventsListPoints[0].destination),allDestination:this.destinationsModel.getDestinations()}).getElement();this.eventsList.addItem(e);for(let e=1;e<this.eventsListPoints.length-1;e++){const t=new m({point:this.eventsListPoints[e],offers:[...this.offersModel.getOffersById(this.eventsListPoints[e].type,this.eventsListPoints[e].offers)],destination:this.destinationsModel.getDestinationsById(this.eventsListPoints[e].destination)}).getElement();this.eventsList.addItem(t)}const t=new h({point:this.eventsListPoints[this.eventsListPoints.length-1],allOffers:this.offersModel.getOffersByType(this.eventsListPoints[this.eventsListPoints.length-1].type),pointDestination:this.destinationsModel.getDestinationsById(this.eventsListPoints[this.eventsListPoints.length-1].destination),allDestination:this.destinationsModel.getDestinations()}).getElement();this.eventsList.addItem(t)}}({container:w,pointsModel:O,offersModel:j,destinationsModel:k});i(new class{getTemplate(){return'<section class="trip-main__trip-info  trip-info">\n            <div class="trip-info__main">\n              <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>\n\n              <p class="trip-info__dates">18&nbsp;&mdash;&nbsp;20 Mar</p>\n            </div>\n\n            <p class="trip-info__cost">\n              Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>\n            </p>\n          </section>'}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}},D,"afterbegin"),i(new class{getTemplate(){return`<form class="trip-filters" action="#" method="get">\n            ${p.map((e=>function(e){const{type:t,checked:n=!1}=e;return`<div class="trip-filters__filter">\n            <input id="filter-${t}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${t}" ${n?"checked":""}>\n            <label class="trip-filters__filter-label" for="filter-${t}">${r(t)}</label>\n          </div>`}(e))).join("")}\n            <button class="visually-hidden" type="submit">Accept filter</button>\n          </form>`}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}},T,e),S.init()})()})();
//# sourceMappingURL=bundle.dfe277ab6e3b65e82903.js.map