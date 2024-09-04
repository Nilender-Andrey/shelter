import { openModal } from './modal.js';
import petsData from './pets.js';
import { debounce, getCardsForPagination } from './utile.js';

const TOTAL_CARDS = 48;

const sliderDebounce = debounce(updatePagination, 300);

const options = {
  cards: getCardsForPagination(petsData),
  indexCard: 0,
  currentPageNumber: 1,
};

const pagesElement = document.querySelector('.our-friends__pages');
const pageNumberElement = document.querySelector('.our-friends__page-number');
const buttonUpElement = document.querySelector('.our-friends__button--step-up');
const buttonDownElement = document.querySelector('.our-friends__button--step-down');
const buttonStartElement = document.querySelector('.our-friends__button--start');
const buttonFinishElement = document.querySelector('.our-friends__button--finish');

buttonStartElement && (buttonStartElement.onclick = () => changePageNumber(-options.pageNumber));
buttonFinishElement && (buttonFinishElement.onclick = () => changePageNumber(options.pageNumber));
buttonUpElement && (buttonUpElement.onclick = () => changePageNumber(1));
buttonDownElement && (buttonDownElement.onclick = () => changePageNumber(-1));

console.log(options);

/**
 * @description Обновляет состояние страниц плагинации
 */
function updatePagination() {
  options.widthOffset = document.querySelector('.our-friends__pages-wrapper').clientWidth;
  options.cardsNumber = getCardsNumber(options.widthOffset);
  options.pageNumber = TOTAL_CARDS / options.cardsNumber;

  pagesElement.innerHTML = '';
  pagesElement.append(...Array.from(Array(options.pageNumber), (_, index) => createPage(index)));

  changePageNumber(0);
}

/**
 * @description Создает страницу с набором карточек в зависимости от номера страницы
 * @param {number} pageNumber - Номер создаваемой страницы
 * @return {HTMLDivElement}
 */
function createPage(pageNumber) {
  const page = document.createElement('div');
  page.className = 'our-friends__page pet-cards';
  page.style.width = options.widthOffset + 'px';

  const startIndex = pageNumber * options.cardsNumber;
  const endIndex = startIndex + options.cardsNumber;

  const cardsElements = options.cards.slice(startIndex, endIndex).map((item) => {
    const cardElement = document.createElement('div');
    cardElement.className = 'pet-card';
    cardElement.innerHTML = `
      <div class="pet-card__image">
        <img width="270" height="270" src="${item.img}" alt="${item.type} ${item.name}">
      </div>
      <div class="pet-card__name">${item.name}</div>
      <button class="button button--style-secondary">Learn more</button>
  `;

    cardElement.addEventListener('click', () => openModal(item));
    return cardElement;
  });

  page.append(...cardsElements);
  return page;
}

/**
 * @description Возвращает количество карточек для отрисовки в зависимости от ширины
 * @param {number} width - Ширина родительского контейнера
 * @returns {number}
 */
function getCardsNumber(width) {
  if (width >= 890) {
    return 8;
  } else if (width >= 580) {
    return 6;
  } else {
    return 3;
  }
}

/**
 * @description Изменяет значение текущей страницы
 * @param {number} shift - Сдвиг
 */
function changePageNumber(shift) {
  setCurrentPageNumber(shift);
  disableFirstButtons(options.currentPageNumber === 1);
  disableLastButtons(options.currentPageNumber === options.pageNumber);

  pageNumberElement.innerText = options.currentPageNumber;
  pagesElement.style.left = (options.currentPageNumber - 1) * -options.widthOffset + 'px';
}

/**
 * @description Устанавливает текущую страницу с учетом сдвига
 * @param {number} shift - Сдвиг
 */
function setCurrentPageNumber(shift) {
  options.currentPageNumber = Math.min(Math.max(options.currentPageNumber + shift, 1), options.pageNumber);
}

/**
 * @description Изменяет состояние кнопок "назад"
 * @param {boolean} isDisable - Состояние
 */
function disableFirstButtons(isDisable) {
  buttonDownElement.disabled = isDisable;
  buttonStartElement.disabled = isDisable;
}

/**
 * @description Изменяет состояние кнопок "вперед"
 * @param {boolean} isDisable - Состояние
 */
function disableLastButtons(isDisable) {
  buttonUpElement.disabled = isDisable;
  buttonFinishElement.disabled = isDisable;
}

updatePagination();

window.addEventListener('resize', sliderDebounce);
