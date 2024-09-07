const modal = document.getElementById('modal');
let modalContent;

/**
 * @description Подготовка к работе слайдера
 */
function initModal() {
  if (modal) {
    modalContent = document.createElement('div');
    modalContent.className = 'modal__content';

    modal.append(modalContent);
    modal.addEventListener('click', closeModal);
  }
}

initModal();

/**
 * @description Функция открытия модального окна
 * @param {Object} data - Данные для отображения
 */
export function openModal(data) {
  const { name, img, type, breed, description, age, inoculations, diseases, parasites } = data;

  modalContent.innerHTML = `    
<button class="modal__button">
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd"
      d="M7.42618 6.00003L11.7046 1.72158C12.0985 1.32775 12.0985 0.689213 11.7046 0.295433C11.3108 -0.0984027 10.6723 -0.0984027 10.2785 0.295433L5.99998 4.57394L1.72148 0.295377C1.32765 -0.098459 0.68917 -0.098459 0.295334 0.295377C-0.0984448 0.689213 -0.0984448 1.32775 0.295334 1.72153L4.57383 5.99997L0.295334 10.2785C-0.0984448 10.6723 -0.0984448 11.3108 0.295334 11.7046C0.68917 12.0985 1.32765 12.0985 1.72148 11.7046L5.99998 7.42612L10.2785 11.7046C10.6723 12.0985 11.3108 12.0985 11.7046 11.7046C12.0985 11.3108 12.0985 10.6723 11.7046 10.2785L7.42618 6.00003Z"
      fill="#292929" />
  </svg>
</button>

<div class="modal__image">
  <img src="${img}" alt="${type} ${name}" />
</div>

<div class="modal__info">
  <div>
    <div class="modal__title">${name}</div>
    <div class="modal__subtitle">${type} - ${breed}</div>
  </div>

  <div class="modal__description">${description}</div>

  <ul class="modal__specifications">
    <li class="modal__specifications-text">
      <span>Age: </span>
      <span>${age}</span>
    </li>
    <li class="modal__specifications-text">
      <span>Inoculations: </span>
      <span>${inoculations.join(', ')}</span>
    </li>
    <li class="modal__specifications-text">
      <span>Diseases:</span>
      <span>${diseases.join(', ')}</span>
    </li>
    <li class="modal__specifications-text">
      <span>Parasites:</span>
      <span>${parasites.join(', ')}</span>
    </li>
  </ul>
</div>`;

  modal.classList.add('open');
  document.body.classList.add('lock');
}

/**
 * @description Функция закрытия модального окна
 * @param {Event} event - Событие click
 */
function closeModal(event) {
  if (event.target.className === 'modal open' || event.target.closest('.modal__button')) {
    modal.classList.remove('open');
    document.body.classList.remove('lock');
  }
}
