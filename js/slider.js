import { openModal } from './modal.js';
import petsData from './pets.js';
import { debounce, getRandomRecordsFunction } from './utile.js';

const gerRandomPetCards = getRandomRecordsFunction(petsData);
const sliderDebounce = debounce(slider, 300);

function slider() {
  const slides = document.querySelector('.slider__slides');
  const widthOffset = document.querySelector('.slider__slides-wrapper').clientWidth;
  let flag = true;

  const options = {
    duration: 1000, //время анимации
    cardWidth: widthOffset >= 580 ? 290 : 270,
  };

  /* Количество умещающихся для показа карточек */
  const numberOfCardsToShow = Math.floor(widthOffset / options.cardWidth);

  // Расчет ширины слайдера
  slides.style.width = 3 * widthOffset + 'px';

  // Сдвиг слайдера
  slides.style.left = -widthOffset + 'px';

  /**
   * Подготовка к работе слайдера
   */
  function initSlider() {
    slides.innerHTML = '';

    document.querySelector('.slider__arrow--direction-right').onclick = generateNextSlide;
    document.querySelector('.slider__arrow--direction-left').onclick = generatePrevSlide;

    var slide = createSlide();
    slides.append(slide);
    slides.append(createSlide(slide.cards));
    slides.prepend(createSlide(slide.cards));
  }

  initSlider();

  /**
   * Создает элемент картинки с изображением заданного индекса
   */
  function createSlide(excludeCards = []) {
    const slideElement = document.createElement('div');
    slideElement.className = 'slider__slide pet-cards';
    slideElement.style.width = widthOffset;
    slideElement.cards = gerRandomPetCards(numberOfCardsToShow, excludeCards);

    const card = slideElement.cards.map((item) => {
      const slideElement = document.createElement('div');
      slideElement.className = 'slider-cards__card pet-card';
      slideElement.innerHTML = `
      <div class="pet-card__image">
        <img width="270" height="270" src="${item.img}" alt="${item.type} ${item.name}">
      </div>
      <div class="pet-card__name">${item.name}</div>
      <button class="button button--style-secondary">Learn more</button>
  `;

      slideElement.addEventListener('click', () => openModal(item));
      return slideElement;
    });

    slideElement.append(...card);
    return slideElement;
  }

  /**
   * Контролирует добавление следующего слайд
   */
  function generateNextSlide() {
    if (!flag) {
      return;
    }
    flag = !flag;

    const excludeCards = document.querySelector('.slider__slide.pet-cards:last-child').cards;
    const slide = createSlide(excludeCards);
    slide.style.width = 0;
    slides.append(slide);

    startAnimate({
      duration: options.duration,
      draw: drawNextSlide,
      removeElement: document.querySelector('.slider__slide.pet-cards'),
    });
  }

  /**
   * Контролирует добавление предыдущего слайд
   */
  function generatePrevSlide() {
    if (!flag) {
      return;
    }
    flag = !flag;

    const excludeCards = document.querySelector('.slider__slide.pet-cards').cards;
    const slide = createSlide(excludeCards);
    slide.style.width = 0;
    slides.prepend(slide);

    startAnimate({
      duration: options.duration,
      draw: drawPrevSlide,
      removeElement: document.querySelector('.slider__slide.pet-cards:last-child'),
    });
  }

  /**
   * @typedef {Object} AnimateProps
   * @property {number} duration - Время анимации
   * @property {Function} draw - Функция анимации
   * @property {Element} removeElement - Удаляемый элемент
   */

  /**
   * Начинает анимацию
   * @param {AnimateProps} animateProps
   */
  function startAnimate({ duration, draw, removeElement }) {
    const start = performance.now();

    requestAnimationFrame(animateCallback(start, { duration, draw, removeElement }));
  }

  /**
   * @description Контролирует анимацию (вызывает  )
   * @param {number} start - Время начала анимации
   * @param {AnimateProps} animateProps
   */
  function animateCallback(start, { duration, draw, removeElement }) {
    return function (time) {
      let step = (time - start) / duration;

      if (step > 1) {
        step = 1;
      }

      draw(step);

      if (step < 1) {
        requestAnimationFrame(animateCallback(start, { duration, draw, removeElement }));
      } else {
        removeElement.remove();
        flag = true;
      }
    };
  }

  /**
   * @description Отрисовка анимации шага при смене предыдущего слайда
   * @param {number} step - Шаг анимации
   */
  function drawPrevSlide(step) {
    document.querySelector('.slider__slide.pet-cards:last-child').style.width = widthOffset * (1 - step) + 'px';
    document.querySelector('.slider__slide.pet-cards').style.width = widthOffset * step + 'px';
  }

  /**
   * @description Отрисовка анимации шага при смене следующего слайда
   * @param {number} step - Шаг анимации
   */
  function drawNextSlide(step) {
    document.querySelector('.slider__slide.pet-cards').style.width = widthOffset * (1 - step) + 'px';
    document.querySelector('.slider__slide.pet-cards:last-child').style.width = widthOffset * step + 'px';
  }
}

slider();
window.addEventListener('resize', sliderDebounce);
