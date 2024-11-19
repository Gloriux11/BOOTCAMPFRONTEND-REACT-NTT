import { Cart } from "../types/cart.type";

const cartCountElement = document.querySelector(".cart-count") as HTMLElement;

/**
 * Añadir productos al carrito y mostrar controles de cantidad
 * @param card Elemento del DOM que contiene el producto
 * @param cardId ID del producto
 * @param stock Stock del producto
 * @param quantityAdded Cantidad de productos añadidos al carrito
 */
export function addToCartButton(
    card: HTMLElement,
    cardId: number,
    stock: number,
    quantityAdded: number = 1
): void {
    const addToCartBtn = card.querySelector(".add-to-cart-btn") as HTMLButtonElement;
    const quantityControls = card.querySelector(".quantity-controls") as HTMLElement;
    const removeBtn = card.querySelector(".remove-btn") as HTMLButtonElement;
    const decreaseBtn = card.querySelector(".decrease-btn") as HTMLButtonElement;
    const increaseBtn = card.querySelector(".increase-btn") as HTMLButtonElement;
    const quantitySpan = card.querySelector(".quantity") as HTMLElement;

    let quantity = quantityAdded;

    // Evento para agregar al carrito
    addToCartBtn.addEventListener("click", () => {
        addToCartBtn.style.display = "none"; // Ocultar botón de agregar
        quantityControls.style.display = "inherit"; // Mostrar controles de cantidad
        addToCart(cardId, quantity);
    });

    // Evento para eliminar del carrito
    removeBtn.addEventListener("click", () => {
        quantity = 1; // Reiniciar la cantidad
        quantitySpan.textContent = quantity.toString();
        quantityControls.style.display = "none"; // Ocultar controles
        addToCartBtn.style.display = "initial"; // Mostrar botón de agregar
        removeFromCart(cardId);
    });

    // Evento para aumentar la cantidad
    increaseBtn.addEventListener("click", () => {
        if (quantity < stock) {
            quantity++;
            quantitySpan.textContent = quantity.toString();
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
            quantitySpan.textContent = quantity.toString();
            updateCartQuantity(cardId, quantity);
        }

        if (quantity === 1) {
            decreaseBtn.style.display = "none"; // Ocultar botón de disminuir
            removeBtn.style.display = "inherit"; // Mostrar botón de eliminar
        }
    });
}

/**
 * Añadir productos al carrito y guardar en localStorage
 * @param productId ID del producto
 * @param quantity Cantidad de productos añadidos al carrito
 */
export function addToCart(productId: number, quantity: number): void {
    const cart: Cart = JSON.parse(localStorage.getItem("cart") || "{}");
    cart[productId] = quantity;
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

/**
 * Eliminar productos del carrito y actualizar localStorage
 * @param productId ID del producto
 */
export function removeFromCart(productId: number): void {
    const cart: Cart = JSON.parse(localStorage.getItem("cart") || "{}");
    delete cart[productId];
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

/**
 * Actualizar la cantidad de productos en el carrito
 * @param productId ID del producto
 * @param quantity Cantidad de productos añadidos al carrito
 */
export function updateCartQuantity(productId: number, quantity: number): void {
    const cart: Cart = JSON.parse(localStorage.getItem("cart") || "{}");
    cart[productId] = quantity;
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

/**
 * Actualizar el contador de productos en el carrito
 */
export function updateCartCount(): void {
    const cart: Cart = JSON.parse(localStorage.getItem("cart") || "{}");
    const count = Object.keys(cart).length;
    cartCountElement.textContent = count.toString();
}