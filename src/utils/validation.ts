import { RegexPatterns } from "../types/regex.enum"; 
import { FormData } from "../types/formData.type"; 
import { Errors } from "../types/errors.type"; 

// Función para validar un nombre o apellido
export const validateName = (name: string): string => {
  if (!name.trim() || !name.match(new RegExp(RegexPatterns.NAME))) {
    return "Debe ingresar un valor válido";
  }
  return "";
};

// Función para validar el celular
export const validateCelular = (celular: string): string => {
  if (!celular.trim() || !celular.match(new RegExp(RegexPatterns.CELLPHONE))) {
    return "Debe ingresar un valor válido";
  }
  return "";
};

// Función para validar el distrito
export const validateDistrito = (distrito: string): string => {
  if (!distrito.trim()) {
    return "Campo obligatorio";
  }
  return "";
};

// Función para validar la dirección
export const validateDireccion = (direccion: string): string => {
  if (!direccion.trim()) {
    return "Campo obligatorio";
  }
  return "";
};

// Función para validar la referencia
export const validateReferencia = (referencia: string): string => {
  if (!referencia.trim()) {
    return "Campo obligatorio";
  }
  return "";
};

// Función para validar todos los campos
export const validateForm = (formData: FormData): Errors => {
  const errors: Errors = {
    nombre: validateName(formData.nombre),
    apellidos: validateName(formData.apellidos),
    distrito: validateDistrito(formData.distrito),
    direccion: validateDireccion(formData.direccion),
    referencia: validateReferencia(formData.referencia),
    celular: validateCelular(formData.celular),
  };

  return errors;
};
