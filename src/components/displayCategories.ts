import { Category } from "../types/category.type";
import { clearSearchInput } from "./displayProducts";


const categoryTemplate = document.querySelector<HTMLTemplateElement>(".category-template");
const categoriesContainer = document.getElementById("category-list") as HTMLElement;
const categoryCount = document.getElementById("category-count") as HTMLElement;

export function displayCategories(categories: Category[], handleCategoryClick: (slug: string | null) => void): void {
    categoriesContainer.innerHTML = ""; // Limpiar contenedor

    // Setear el número de categorías
    categoryCount.textContent = `(${categories.length})`;

    // Añadir botón "All" para mostrar todos los productos
    const allButton = categoryTemplate!.content.cloneNode(true) as DocumentFragment;
    const allCategoryBtn = allButton.querySelector(".category-btn") as HTMLElement;
    allCategoryBtn.textContent = "All";
    allCategoryBtn.id = "all";
    allCategoryBtn.classList.add("active");
    allCategoryBtn.addEventListener("click", () => {
        clearSearchInput();
        handleCategoryClick(null);
        setActiveCategory(allCategoryBtn);
    });
    categoriesContainer.appendChild(allButton);

    // Añadir botones de categorías provenientes de la API
    categories.forEach((category) => {
        const categoryElement = categoryTemplate!.content.cloneNode(true) as DocumentFragment;
        const categoryBtn = categoryElement.querySelector(".category-btn") as HTMLElement;
        categoryBtn.textContent = category.name;
        categoryBtn.id = category.slug;
        categoryBtn.addEventListener("click", () => {
            clearSearchInput();
            handleCategoryClick(category.slug);
            setActiveCategory(categoryBtn);
        });
        categoriesContainer.appendChild(categoryElement);
    });
}

export function setActiveCategory(activeButton: HTMLElement): void {
    // Remover la clase "active" de todos los botones
    const categoryButtons = document.querySelectorAll<HTMLElement>(".category-btn");
    categoryButtons.forEach((button) => {
        button.classList.remove("active");
    });

    // Añadir la clase "active" al botón seleccionado
    activeButton.classList.add("active");
}