"use strict";

var slider = document.querySelector('.sliders-list');
var arrowBottom = document.querySelector('.arrow-bottom');
var arrowTop = document.querySelector('.arrow-top');
var sectionSlider = document.querySelector('.sliders');
var pagination = document.querySelectorAll('.circle');
var backgrounds = document.querySelectorAll('.background');
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
  for (var i = 0; i < pagination.length; i++) {
    if (i !== item) {
      pagination[i].classList.remove('active');
    } else pagination[i].classList.add('active');
  }
}

function moveSlider() {
  var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'next';
  var step = direction == 'prev' ? -33.3 : 33.3;
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
//# sourceMappingURL=main.js.map
