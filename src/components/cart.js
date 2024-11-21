// la carpeta que tiene este archivo se llama componente pero tiene mucha m'as l'ogica que solo cart, tal vez puedes considerar separar la parte visual de la logica de negocio 

const cartCountElement = document.querySelector(".cart-count");

/**
 *  Añadir productos al carrito y mostrar controles de cantidad
 * @param {*} card  Elemento del DOM que contiene el producto
 * @param {*} cardId ID del producto
 * @param {*} stock  Stock del producto
 * @param {*} quantityAdded Cantidad de productos añadidos al carrito
 */
export function addToCartButton(card, cardId, stock, quantityAdded) {
  const addToCartBtn = card.querySelector(".add-to-cart-btn");
  const quantityControls = card.querySelector(".quantity-controls");
  const removeBtn = card.querySelector(".remove-btn");
  const decreaseBtn = card.querySelector(".decrease-btn");
  const increaseBtn = card.querySelector(".increase-btn");
  const quantitySpan = card.querySelector(".quantity");

  let quantity = quantityAdded || 1;

  // Evento para agregar al carrito
  addToCartBtn.addEventListener("click", () => {
    addToCartBtn.style.display = "none"; // Ocultar botón de agregar
    quantityControls.style.display = "inherit"; // Mostrar controles de cantidad
    addToCart(cardId, quantity);
  });

  // Evento para eliminar del carrito
  removeBtn.addEventListener("click", () => {
    quantity = 1; // Reiniciar la cantidad
    quantitySpan.textContent = quantity;
    quantityControls.style.display = "none"; // Ocultar controles
    addToCartBtn.style.display = "initial"; // Mostrar botón de agregar
    removeFromCart(cardId);
  });

  // Evento para aumentar la cantidad
  increaseBtn.addEventListener("click", () => {
    if (quantity < stock) {
      quantity++;
      quantitySpan.textContent = quantity;
      decreaseBtn.style.display = "inherit"; // Mostrar botón de disminuir
      removeBtn.style.display = "none"; // Ocultar botón de eliminar
      updateCartQuantity(cardId, quantity);
    }

    if (quantity === stock) {      
      increaseBtn.disabled = true;
    }
  });

  // Evento para disminuir la cantidad
  decreaseBtn.addEventListener("click", () => {
    increaseBtn.disabled = false; // Habilitar botón de aumentar

    if (quantity > 1) {
      quantity--;
      quantitySpan.textContent = quantity;
      updateCartQuantity(cardId, quantity);
    }

    if (quantity === 1) {
      decreaseBtn.style.display = "none"; // Ocultar botón de disminuir
      removeBtn.style.display = "inherit"; // Mostrar botón de eliminar
    }
  });
}

/**
 *  Añadir productos al carrito y guardar en localStorage
 * @param {*} productId ID del producto
 * @param {*} quantity Cantidad de productos añadidos al carrito
 */
export function addToCart(productId, quantity) {
  const cart = JSON.parse(localStorage.getItem("cart")) || {};
  cart[productId] = quantity;
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

/**
 *  Eliminar productos del carrito y actualizar localStorage
 * @param {*} productId ID del producto
 */
export function removeFromCart(productId) {
  const cart = JSON.parse(localStorage.getItem("cart")) || {};
  delete cart[productId];
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

/**
 *  Actualizar la cantidad de productos en el carrito
 * @param {*} productId ID del producto
 * @param {*} quantity Cantidad de productos añadidos al carrito
 */
export function updateCartQuantity(productId, quantity) {
  const cart = JSON.parse(localStorage.getItem("cart")) || {};
  cart[productId] = quantity;
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

/**
 * Actualizar el contador de productos en el carrito
 */
export function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || {};
  const count = Object.keys(cart).length;
  cartCountElement.textContent = count;
}
