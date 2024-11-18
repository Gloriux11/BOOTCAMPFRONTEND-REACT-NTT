import { displayCategories, setActiveCategory } from "./components/displayCategories";
import { displayProducts } from "./components/displayProducts";
import { ProductService } from "./services/product.service";
import { debounce } from "./utils/debounce";
import "./style.css";

const productService = new ProductService();

const searchInput = document.querySelector("#search input");
const productList = document.getElementById("product-list");

// Variables para paginación
let limit = 12;
let skip = 0;
let isLoading = false;
let allProductsLoaded = false;
let selectedCategory = null;

// Fetch inicial de productos
async function loadProducts() {
  if (isLoading || allProductsLoaded) return;
  isLoading = true;

  let data;
  if (selectedCategory) {
    data = await productService.fetchProductsByCategory(
      selectedCategory,
      limit,
      skip
    );
  } else {
    data = await productService.fetchProducts(limit, skip);
  }

  if (data.products.length < limit) {
    allProductsLoaded = true;
  }
  displayProducts(data.products);
  skip += limit;
  isLoading = false;
}

loadProducts();

// Fetch inicial de categorías
productService.fetchCategories().then((data) => {
  displayCategories(data, handleCategoryClick);
});

// Manejar clic en categoría
function handleCategoryClick(category) {
  selectedCategory = category;
  skip = 0;
  allProductsLoaded = false;
  productList.innerHTML = ""; // Limpiar la lista de productos
  loadProducts();
}

// Event listener para el input de búsqueda
searchInput.addEventListener(
  "input",
  debounce((event) => {
    const query = event.target.value;
    if (query) {
      productService.searchProducts(query).then((data) => {
        productList.innerHTML = ""; // Limpiar la lista de productos
        setActiveCategory(document.getElementById("all"));
        displayProducts(data.products);
      });
    } else {
      selectedCategory = null;
      skip = 0;
      allProductsLoaded = false;
      productList.innerHTML = ""; // Limpiar la lista de productos
      loadProducts();
    }
  }, 600)
);

// Event listener para el infinite scroll con debounce
window.addEventListener(
  "scroll",
  debounce(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      !isLoading
    ) {
      loadProducts();
    }
  }, 300)
);
