import { Category } from "../types/category.type";
import { Paged } from "../types/paged.type";
import { Product } from "../types/product.type";

/**
 * Servicio para obtener productos y categorías
 * La data será obtenida de la API "'https://dummyjson.com/products'"
 */
export class ProductService {
    baseUrl = "https://dummyjson.com/products";

    /**
     * Obtener productos con los parámetros limit y skip de la API
     * @param {number} limit El número de productos a obtener
     * @param {number} skip El número de productos a saltar
     * @returns {Promise<Product[]>} Una promesa que resuelve a un array de productos
     */
    async fetchProducts(limit: number = 10, skip: number = 0): Promise<Product[]> {
        return await fetch(`${this.baseUrl}?limit=${limit}&skip=${skip}`)
            .then((response) => response.json())
            .then((data: Paged<Product>) => {
                return data.products;
            });
    }

    /**
     * Buscar productos con el query de búsqueda
     * @param {string} query El query de búsqueda
     * @returns {Promise<Product[]>} Una promesa que resuelve a un array de productos
     */
    async searchProducts(query: string): Promise<Product[]> {
        return await fetch(`${this.baseUrl}/search?q=${query}`)
            .then((response) => response.json())
            .then((data) => {
                return data.products;
            });
    }

    /**
     * Obtener todas las categorías
     * @returns {Promise<Category[]>} Una promesa que resuelve a un array de categorías
     */
    async fetchCategories(): Promise<Category[]> {
        return await fetch(`${this.baseUrl}/categories`)
            .then((response) => response.json())
            .then((data) => {
                return data;
            });
    }

    /**
     * Obten productos por categoría
     * @param {string} category La categoría de los productos
     * @param {number} limit El número de productos a obtener
     * @param {number} skip El número de productos a saltar
     * @returns {Promise<Product[]>} Una promesa que resuelve a un array de productos
     */
    async fetchProductsByCategory(category: string, limit: number = 12, skip: number = 0): Promise<Product[]> {
        return await fetch(
            `${this.baseUrl}/category/${category}?limit=${limit}&skip=${skip}`
        )
            .then((response) => response.json())
            .then((data: Paged<Product>) => {
                return data.products;
            });
    }

    /**
     * Obtener el nombre de la categoría por slug
     * @param {string} slug El slug de la categoría
     * @returns {Promise<string>} Una promesa que resuelve a un string con el nombre de la categoría
     */
    async fetchCategoryNameBySlug(slug: string = "beauty"): Promise<string> {
        return await fetch(`${this.baseUrl}/categories`)
            .then((response) => response.json())
            .then((data) => {
                const category = data.find((category: Category) => category.slug === slug);
                return category ? category.name : '';
            });
    }
}