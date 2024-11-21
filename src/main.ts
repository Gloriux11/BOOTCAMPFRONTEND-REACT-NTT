import { displayCategories, setActiveCategory } from "./components/displayCategories";
import { displayProducts } from "./components/displayProducts";
import { ProductService } from "./services/product.service";
import { debounce } from "./utils/debounce";
import "./style.css";
import { Nullable } from "./types/nullable.type";

const productService = new ProductService();

const searchInput = document.querySelector<HTMLInputElement>("#search input")!;
const productList = document.getElementById("product-list") as HTMLElement;

// Variables para paginación
let limit: number = 12;
let skip: number = 0;
let isLoading: boolean = false;
let allProductsLoaded: boolean = false;
// veo varios string | null podr'ias considerar crear un custom type 
let selectedCategory:  Nullable<string> = null;
let isSearching: boolean = false;

// Fetch inicial de productos
async function loadProducts(): Promise<void> {
  if (isLoading || allProductsLoaded) return;
  isLoading = true;

  let data;
  if (selectedCategory) {
    data = await productService.fetchProductsByCategory(selectedCategory, limit, skip);
  } else {
    data = await productService.fetchProducts(limit, skip);
  }

  if (data.length < limit) {
    allProductsLoaded = true;
  }
  displayProducts(data);
  skip += limit;
  isLoading = false;
}

loadProducts();

// Fetch inicial de categorías
productService.fetchCategories().then((data) => {
  displayCategories(data, handleCategoryClick);
});

// Manejar clic en categoría
function handleCategoryClick(category: string | null): void {
  selectedCategory = category;
  skip = 0;
  allProductsLoaded = false;
  productList.innerHTML = ""; // Limpiar la lista de productos
  loadProducts();
}

// Event listener para el input de búsqueda
searchInput.addEventListener(
  "input",
  debounce((event: Event) => {
    const query = (event.target as HTMLInputElement).value;
    if (query) {
      isSearching = true;
      productService.searchProducts(query).then((data) => {
        productList.innerHTML = ""; // Limpiar la lista de productos
        setActiveCategory(document.getElementById("all") as HTMLElement);
        displayProducts(data);
      });
    } else {
      isSearching = false;
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
      !isLoading && !isSearching
    ) {
      loadProducts();
    }
  }, 300)
);