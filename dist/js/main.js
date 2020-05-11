"use strict";

var slider = document.querySelector('.sliders-list');
var arrowBottom = document.querySelector('.arrow-bottom');
var arrowTop = document.querySelector('.arrow-top');
var thirdSlideArrowLeft = document.getElementById('slide__control-left');
var thirdSlideArrowRight = document.getElementById('slide__control-right');
var thirdSlide = document.querySelector('.third-slide');
var thirdSlideItems = document.querySelectorAll('.third-slide li');
var sectionSlider = document.querySelector('.sliders');
var pagination = document.querySelector('.slider-pagination');
var circles = document.querySelectorAll('.circle');
var backgrounds = document.querySelectorAll('.background');
var carousel = document.querySelectorAll('.carousel');
var sidebar = document.querySelector('#wrapper');
var btnSideBarClose = document.querySelector('#menu-close');
var hamburger = document.querySelector('#menu-toggle');
$('.carousel').carousel({
  interval: false
});
$('.slider-arrows').click(function () {
  var action = $(this).attr('data-slide');
  $('.carousel').carousel(action);
});

function showBlock(el, speed) {
  var prevEl = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  el.style.display = 'block';
  var step = 1 / speed;
  var interval = setInterval(function () {
    if (+el.style.opacity >= 1) clearInterval(interval);

    if (prevEl) {
      prevEl.style.opacity = +prevEl.style.opacity - step;
      if (+prevEl.style.opacity <= 0) prevEl.style.display = "none";
    }

    el.style.opacity = +el.style.opacity + step;
  }, speed / 1000);
}

function toggleClass(item) {
  for (var i = 0; i < circles.length; i++) {
    if (i !== item) {
      circles[i].classList.remove('active');
    } else circles[i].classList.add('active');
  }
}

function moveSlider() {
  var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'next';
  var step = direction == 'prev' ? -33.3 : 33.3;
  if (slider.dataset.transform === 0 && direction === 'prev' || slider.dataset.transform === -66.6 && direction === 'next') return;
  var transform = slider.dataset.transform - step;
  slider.dataset.transform = transform;

  switch (transform) {
    case 0:
      arrowTop.style.opacity = 0;
      arrowTop.style.zIndex = -100;
      arrowBottom.style.opacity = 1;
      arrowBottom.style.zIndex = 100;
      showBlock(backgrounds[0], 100, backgrounds[1]);
      toggleClass(0);
      break;

    case -33.3:
      arrowTop.style.opacity = 1;
      arrowTop.style.zIndex = 100;
      arrowBottom.style.opacity = 1;
      arrowBottom.style.zIndex = 100;
      direction == 'prev' ? showBlock(backgrounds[1], 90, backgrounds[2]) : showBlock(backgrounds[1], 100, backgrounds[0]);
      toggleClass(1);
      break;

    case -66.6:
      arrowBottom.style.opacity = 0;
      arrowBottom.style.zIndex = -100;
      showBlock(backgrounds[2], 100, backgrounds[1]);
      toggleClass(2);
      break;
  }

  var resolution = document.documentElement.clientWidth >= 1200 ? 'Y' : 'X';
  slider.style.transform = "translate".concat(resolution, "(").concat(transform, "%)");
} //Функция события прогрутки мыши


function wheel(event) {
  var delta = 0;
  if (!event) event = window.event; // Событие IE.
  // Установим кроссбраузерную delta

  if (event.wheelDelta) {
    // IE, Opera, safari, chrome - кратность дельта равна 120
    delta = event.wheelDelta / 120;
  } else if (event.detail) {
    // Mozilla, кратность дельта равна 3
    delta = -event.detail / 3;
  }

  if (delta) {
    // Отменим текущее событие - событие поумолчанию (скролинг окна).
    if (event.preventDefault) {
      event.preventDefault();
    }

    event.returnValue = false; // для IE
    // если дельта больше 0, то колесо крутят вверх, иначе вниз

    var dir = delta > 0 ? 'next' : 'prev';
    if (slider.dataset.transform == 0 && dir === 'prev' || slider.dataset.transform == -66.6 && dir === 'next') return;
    moveSlider(dir);
  }
} // Обработчик событий Скота Эндрю


function addEvent(elm, evType, fn, useCapture) {
  if (elm.addEventListener) {
    elm.addEventListener(evType, fn, useCapture);
    return true;
  } else if (elm.attachEvent) {
    var r = elm.attachEvent('on' + evType, fn);
    return r;
  } else {
    elm['on' + evType] = fn;
  }
}

function thirdSlideRight() {
  for (var i = 0; i < thirdSlideItems.length; i++) {
    if (i < 5) thirdSlideItems[i].classList.add('hidden');
  }

  setTimeout(function () {
    for (var _i = 0; _i < thirdSlideItems.length; _i++) {
      if (_i > 4) thirdSlideItems[_i].classList.remove('hidden');
    }
  }, 500);
  thirdSlideArrowRight.style.opacity = 0;
  thirdSlideArrowRight.style.zIndex = -999;
  thirdSlideArrowLeft.style.zIndex = 999;
  thirdSlideArrowLeft.style.opacity = 1;
}

function thirdSlideLeft() {
  for (var i = 0; i < thirdSlideItems.length; i++) {
    if (i > 4) thirdSlideItems[i].classList.add('hidden');
  }

  setTimeout(function () {
    for (var _i2 = 0; _i2 < thirdSlideItems.length; _i2++) {
      if (_i2 < 5) thirdSlideItems[_i2].classList.remove('hidden');
    }
  }, 500);
  thirdSlideArrowLeft.style.opacity = 0;
  thirdSlideArrowLeft.style.zIndex = -999;
  thirdSlideArrowRight.style.zIndex = 999;
  thirdSlideArrowRight.style.opacity = 1;
} // Закрытие сайдбара


btnSideBarClose.addEventListener('click', function () {
  sidebar.classList.remove('toggled');
  btnSideBarClose.style.opacity = 0;
  hamburger.style.display = "block";
}); // Открытие гамбургера

hamburger.addEventListener('click', function (evt) {
  evt.stopPropagation();
  sidebar.classList.toggle('toggled');
  btnSideBarClose.style.opacity = 1;
  hamburger.style.display = "none";
}); // Закрытие гамбургера при клике в любое другое место

document.addEventListener('click', function (evt) {
  var target = evt.target;
  var itsHamburger = target == hamburger;
  var itsMenu = target == sidebar || sidebar.contains(target);
  var menuIsToggled = sidebar.classList.contains('toggled');

  if (!itsMenu && !itsHamburger && menuIsToggled) {
    sidebar.classList.remove('toggled');
    btnSideBarClose.style.opacity = 0;
  }
});
arrowBottom.addEventListener('click', function () {
  moveSlider();
});
arrowTop.addEventListener('click', function () {
  moveSlider('prev');
});
thirdSlideArrowRight.addEventListener('click', function () {
  thirdSlideRight();
});
thirdSlideArrowLeft.addEventListener('click', function () {
  thirdSlideLeft();
});
pagination.addEventListener('click', function (evt) {
  var sliderNumber = +evt.target.getAttribute('id').split('circle-').join('');
  var resolution = document.documentElement.clientWidth >= 1200 ? 'Y' : 'X';
  var prevSlider;

  for (var i = 0; i < circles.length; i++) {
    if (circles[i].classList.contains('active')) {
      prevSlider = circles[i].getAttribute('id').split('circle-').join('');
    }
  }

  switch (sliderNumber) {
    case 1:
      slider.style.transform = "translate".concat(resolution, "(0%)");
      arrowTop.style.opacity = 0;
      arrowTop.style.zIndex = -100;
      arrowBottom.style.opacity = 1;
      arrowBottom.style.zIndex = 100;
      showBlock(backgrounds[0], 100, backgrounds[+prevSlider - 1]);
      toggleClass(0);
      break;

    case 2:
      slider.style.transform = "translate".concat(resolution, "(-33.3%)");
      arrowTop.style.opacity = 1;
      arrowTop.style.zIndex = 100;
      arrowBottom.style.opacity = 1;
      arrowBottom.style.zIndex = 100;
      showBlock(backgrounds[1], 90, backgrounds[+prevSlider - 1]);
      toggleClass(1);
      break;

    case 3:
      slider.style.transform = "translate".concat(resolution, "(-66.6%)");
      arrowBottom.style.opacity = 0;
      arrowBottom.style.zIndex = -100;
      showBlock(backgrounds[2], 100, backgrounds[+prevSlider - 1]);
      toggleClass(2);
      break;
  }
}); // Обработчик стрелок на клавиатуре

window.addEventListener('keydown', function (evt) {
  switch (evt.key) {
    case 'ArrowDown':
      if (slider.dataset.transform != -66.6) moveSlider();
      break;

    case 'ArrowUp':
      if (slider.dataset.transform != 0) moveSlider('prev');
      break;

    case 'ArrowLeft':
      $('.carousel').carousel('prev');
      thirdSlideLeft();
      break;

    case 'ArrowRight':
      $('.carousel').carousel('next');
      thirdSlideRight();
      break;
  }
});
addEvent(window, 'mousewheel', wheel);
addEvent(window, 'DOMMouseScroll', wheel);
//# sourceMappingURL=main.js.map
