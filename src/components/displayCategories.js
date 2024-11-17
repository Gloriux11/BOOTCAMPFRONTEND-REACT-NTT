import { ProductService } from "../services/product.service";
import { clearSearchInput, displayProducts } from "./displayProducts";

const productService = new ProductService();

const categoryTemplate = document.querySelector(".category-template");
const categoriesContainer = document.getElementById("category-list");
const categoryCount = document.getElementById("category-count");

export function displayCategories(categories, handleCategoryClick) {
  categoriesContainer.innerHTML = ""; // Limpiar contenedor

  // Setear el número de categorías
  categoryCount.textContent = `(${categories.length})`;

  // Añadir botón "All" para mostrar todos los productos
  const allButton = categoryTemplate.content.cloneNode(true);
  const allCategoryBtn = allButton.querySelector(".category-btn");
  allButton.querySelector(".category-btn").textContent = "All";
  allButton.querySelector(".category-btn").id = "all";
  allButton.querySelector(".category-btn").classList.add("active");
  allButton.querySelector(".category-btn").addEventListener("click", () => {        
    clearSearchInput();
    handleCategoryClick(null);
    setActiveCategory(allCategoryBtn);
  });
  categoriesContainer.appendChild(allButton);

  // Añadir botones de categorías provenientes de la API
  categories.forEach((category) => {
    const categoryElement = categoryTemplate.content.cloneNode(true);
    const categoryBtn = categoryElement.querySelector(".category-btn");
    categoryElement.querySelector(".category-btn").textContent = category.name;
    categoryElement.querySelector(".category-btn").id = category.slug;
    categoryElement
      .querySelector(".category-btn")
      .addEventListener("click", () => {        
        clearSearchInput();
        handleCategoryClick(category.slug);
        setActiveCategory(categoryBtn);
      });
    categoriesContainer.appendChild(categoryElement);
  });
}

export function setActiveCategory(activeButton) {
  // Remover la clase "active" de todos los botones
  const categoryButtons = document.querySelectorAll(".category-btn");
  categoryButtons.forEach((button) => {
    button.classList.remove("active");
  });

  // Añadir la clase "active" al botón seleccionado
  activeButton.classList.add("active");
}