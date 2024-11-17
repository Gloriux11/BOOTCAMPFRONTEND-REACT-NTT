import { addToCartButton, updateCartCount } from "./cart";

const searchInput = document.querySelector("#search input");
const cardTemplate = document.querySelector(".product-card-template");
const cardQuantityControlsTemplate = document.querySelector(
  ".quantity-controls-template"
);
const cardContainer = document.getElementById("product-list");

/**
 *  Mostrar productos en el DOM con sus respectivos controles de cantidad
 * @param {*} products  Array de productos
 */
export function displayProducts(products) {
  const cart = JSON.parse(localStorage.getItem("cart")) || {};
  // cardContainer.innerHTML = ""; // Limpiar contenedor

  // Añadir productos al DOM con sus respectivos controles de cantidad
  products.forEach((product) => {
    // Clonar templates
    const card = cardTemplate.content.cloneNode(true);
    const quantityControls =
      cardQuantityControlsTemplate.content.cloneNode(true);

    // Setear atributos y contenido
    card.querySelector(".product-card").setAttribute("data-sku", product.sku);
    card.querySelector(".product-card").id = product.id;
    card.querySelector(".card-img").src = product.images[0];
    card.querySelector(".card-img").alt = product.title;
    card.querySelector(".card-title").textContent = product.brand;
    card.querySelector(".card-content").textContent = product.title;
    card.querySelector(".card-price").textContent = `S/. ${product.price}`;
    card.querySelector(".card-category").textContent = product.category;
    card.querySelector(".add-to-cart-btn").textContent = "Agregar al carrito";

    // Añadir controles de cantidad al producto para poder agregarlo al carrito
    card.querySelector(".product-card").appendChild(quantityControls);

    cardContainer.appendChild(card);

    // Obtener el último card renderizado
    const renderCard = cardContainer.lastElementChild;

    addToCartButton(renderCard, product.id, product.stock, cart[product.id]);

    // Mostrar quantity-controls si el producto está en el carrito
    if (cart[product.id]) {
      const addToCartBtn = renderCard.querySelector(".add-to-cart-btn");
      const quantityControls = renderCard.querySelector(".quantity-controls");
      const quantitySpan = renderCard.querySelector(".quantity");
      const decreaseBtn = renderCard.querySelector(".decrease-btn");
      const removeBtn = renderCard.querySelector(".remove-btn");

      addToCartBtn.style.display = "none"; // Ocultar botón de agregar
      quantityControls.style.display = "inherit"; // Mostrar controles de cantidad
      quantitySpan.textContent = cart[product.id]; // Ajustar cantidad

      if (cart[product.id] > 1) {
        decreaseBtn.style.display = "inherit"; // Mostrar botón de disminuir
        removeBtn.style.display = "none"; // Ocultar botón de eliminar
      }

      // Deshabilitar botón de aumentar si la cantidad es igual al stock
      if (cart[product.id] === product.stock) {
        const increaseBtn = renderCard.querySelector(".increase-btn");
        increaseBtn.disabled = true;
      }

      updateCartCount();
    }
  });
}

export function clearSearchInput() {
  searchInput.value = "";
}
