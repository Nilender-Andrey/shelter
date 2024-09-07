/**
 * @typedef {Object} Record
 * @property {number} id
 */

/**
 * @description Возвращает функцию получения набора случайных записей с исключением определенных
 * @param {Record[]} records - Массив обрабатываемых записей
 * @returns {(quantityRecords:number, excludeRecords:Record[]) => Record[]}
 */
export function getRandomRecordsFunction(records) {
  /**
   * @description Возвращает набора случайных записей с исключением определенных
   * @param {number} quantityRecords - Количество возвращаемых записей
   * @param {Record[]} excludeRecords - Исключаемые записи
   * @returns {Record[]}
   */
  return function (quantityRecords, excludeRecords) {
    const shuffled = records
      .filter((record) => !excludeRecords.find((excludeRecord) => excludeRecord.id === record.id))
      .sort(() => 0.5 - Math.random());
    return shuffled.slice(0, quantityRecords);
  };
}

/**
 * @description Откладывает вызовы callback, пока не пройдёт ms миллисекунд бездействия
 * @param {Function} callback - Вызываемая функция
 * @param {number} ms - Время бездействия до вызова
 */
export function debounce(callback, ms) {
  let timeoutID;
  return function () {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }

    timeoutID = setTimeout(() => {
      callback();
    }, ms);
  };
}

/**
 * @description Возвращает массив из 48 карточек образуемый из 8 записей
 * @param {Record[]} records - Массив обрабатываемых записей
 * @returns {Record[]}
 */
export function getCardsForPagination(petsData) {
  const getRandomPetCards = getRandomRecordsFunction(petsData);

  const result = [];

  for (let index = 0; index < 6; index++) {
    let excludeCards = result.length ? result.slice(-3) : [];
    let cards = getRandomPetCards(8, excludeCards);
    result.push(...cards.slice(0, 3), ...excludeCards, ...cards.slice(3));
  }

  return result;
}
