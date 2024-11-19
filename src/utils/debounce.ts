/**
 * Evita que una función se ejecute más de una vez cada cierto tiempo.
 * @param {Function} func - La función a debouncing.
 * @param {number} wait - El tiempo de espera en milisegundos.
 * @returns {Function} Una función que se ejecuta una vez cada cierto tiempo.
 */
export function debounce<T extends (...args: any[]) => void>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: number | undefined;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}