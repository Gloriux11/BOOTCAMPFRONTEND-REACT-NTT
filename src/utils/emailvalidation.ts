// test
import { RegexPatterns } from "./../types/regex.enum";

/**
 * Valida si un correo electrónico tiene un formato válido.
 * @param email - El correo electrónico a validar.
 * @returns Un mensaje de error si el correo no es válido, o una cadena vacía si es válido.
 */
export const validateEmail = (email: string): string => {
  // Convertimos el patrón a una expresión regular
  const emailRegex = new RegExp(RegexPatterns.EMAIL);

  if (!email.trim() || !emailRegex.test(email)) {
    return "Debe ingresar un correo electrónico válido.";
  }

  return ""; // Sin errores
};
