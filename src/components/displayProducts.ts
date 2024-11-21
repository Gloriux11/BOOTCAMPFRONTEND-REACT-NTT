import { Product } from "../types/product.type";
import { addToCartButton, updateCartCount } from "./cart";


const searchInput = document.querySelector<HTMLInputElement>("#search input")!;
const cardTemplate = document.querySelector<HTMLTemplateElement>(".product-card-template")!;
const cardQuantityControlsTemplate = document.querySelector<HTMLTemplateElement>(".quantity-controls-template")!;
const cardContainer = document.getElementById("product-list") as HTMLElement;

/**
 *  Mostrar productos en el DOM con sus respectivos controles de cantidad
 * @param {Product[]} products  Array de productos
 */
export function displayProducts(products: Product[]): void {
  // este tipado podr'ia ir en otra carpeta llamada domain o types, importarlo y reutilizarlo
  const cart: { [key: number]: number } = JSON.parse(localStorage.getItem("cart") || "{}");
  // cardContainer.innerHTML = ""; // Limpiar contenedor

  // Añadir productos al DOM con sus respectivos controles de cantidad
  products.forEach((product) => {
    // Clonar templates
    const card = cardTemplate.content.cloneNode(true) as DocumentFragment;
    const quantityControls = cardQuantityControlsTemplate.content.cloneNode(true) as DocumentFragment;

    // Setear atributos y contenido
    (card.querySelector(".product-card") as HTMLElement).setAttribute("data-sku", product.sku);
    (card.querySelector(".product-card") as HTMLElement).id = product.id.toString();
    (card.querySelector(".card-img") as HTMLImageElement).src = product.images[0];
    (card.querySelector(".card-img") as HTMLImageElement).alt = product.title;
    (card.querySelector(".card-title") as HTMLElement).textContent = product.brand;
    (card.querySelector(".card-content") as HTMLElement).textContent = product.title;
    (card.querySelector(".card-price") as HTMLElement).textContent = `S/. ${product.price}`;
    (card.querySelector(".card-category") as HTMLElement).textContent = product.category;
    (card.querySelector(".add-to-cart-btn") as HTMLElement).textContent = "Agregar al carrito";

    // Añadir controles de cantidad al producto para poder agregarlo al carrito
    (card.querySelector(".product-card") as HTMLElement).appendChild(quantityControls);

    cardContainer.appendChild(card);

    // Obtener el último card renderizado
    const renderCard = cardContainer.lastElementChild as HTMLElement;

    addToCartButton(renderCard, product.id, product.stock, cart[product.id]);

    // Mostrar quantity-controls si el producto está en el carrito
    if (cart[product.id]) {
      const addToCartBtn = renderCard.querySelector(".add-to-cart-btn") as HTMLElement;
      const quantityControls = renderCard.querySelector(".quantity-controls") as HTMLElement;
      const quantitySpan = renderCard.querySelector(".quantity") as HTMLElement;
      const decreaseBtn = renderCard.querySelector(".decrease-btn") as HTMLElement;
      const removeBtn = renderCard.querySelector(".remove-btn") as HTMLElement;

      addToCartBtn.style.display = "none"; // Ocultar botón de agregar
      quantityControls.style.display = "inherit"; // Mostrar controles de cantidad
      quantitySpan.textContent = cart[product.id].toString(); // Ajustar cantidad

      if (cart[product.id] > 1) {
        decreaseBtn.style.display = "inherit"; // Mostrar botón de disminuir
        removeBtn.style.display = "none"; // Ocultar botón de eliminar
      }

      // Deshabilitar botón de aumentar si la cantidad es igual al stock
      if (cart[product.id] === product.stock) {
        const increaseBtn = renderCard.querySelector(".increase-btn") as HTMLButtonElement;
        increaseBtn.disabled = true;
      }

      updateCartCount();
    }
  });
}

export function clearSearchInput(): void {
  searchInput.value = "";
}