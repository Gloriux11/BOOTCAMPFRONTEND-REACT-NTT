export interface FetchParams {
    category?: string;  // Puede ser un string o undefined
    page: number;       // El número de página debe ser un número
    limit?: number;     // El límite de productos a cargar, por defecto será 12 si no se pasa
  }