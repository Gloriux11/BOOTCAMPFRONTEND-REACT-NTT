/**
 * Evita que una función se ejecute más de una vez cada cierto tiempo.
 * @param {*} func
 * @param {*} wait
 * @returns {Function} Una función que se ejecuta una vez cada cierto tiempo
 */
export function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}
