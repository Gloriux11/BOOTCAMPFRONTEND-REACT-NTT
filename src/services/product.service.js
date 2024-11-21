/**
 * Servicio para obtener productos y categorías
 * La data será obtenida de la API "'https://dummyjson.com/products'"
 */
// genial, falta agregarle manejador de errores
export class ProductService {
  baseUrl = "https://dummyjson.com/products";

  /**
   * Obtener productos con los parámetros limit y skip de la API
   * @param {number} limit El número de productos a obtener
   * @param {number} skip El número de productos a saltar
   * @returns {Promise<Array>} Una promesa que resuelve a un array de productos
   */
  async fetchProducts(limit = 10, skip = 0) {
    return await fetch(`${this.baseUrl}?limit=${limit}&skip=${skip}`)
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  }

  /**
   * Buscar productos con el query de búsqueda
   * @param {*} query El query de búsqueda
   * @returns {Promise<Array>} Una promesa que resuelve a un array de productos
   */
  async searchProducts(query) {
    return await fetch(`${this.baseUrl}/search?q=${query}`)
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  }

  /**
   * Obtener todas las categorías
   * @returns  {Promise<Array>} Una promesa que resuelve a un array de categorías
   */
  async fetchCategories() {
    return await fetch(`${this.baseUrl}/categories`)
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  }

  /**
   * Obten productos por categoría
   * @param {*} category La categoría de los productos
   * @param {number} limit El número de productos a obtener
   * @param {number} skip El número de productos a saltar
   * @returns  {Promise<Array>} Una promesa que resuelve a un array de productos
   */
  async fetchProductsByCategory(category, limit = 12, skip = 0) {
    return await fetch(
      `${this.baseUrl}/category/${category}?limit=${limit}&skip=${skip}`
    )
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  }

  /**
   * Obtener el nombre de la categoría por slug
   * @param {*} slug  El slug de la categoría
   * @returns  {Promise<string>} Una promesa que resuelve a un string con el nombre de la categoría
   */
  async fetchCategoryNameBySlug(slug = "beauty") {
    return await fetch(`${this.baseUrl}/categories`)
      .then((response) => response.json())
      .then((data) => {
        return data.find((category) => category.slug === slug).name;
      });
  }
}
