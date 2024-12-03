import { ProductService } from "../product.service";
import { Product } from "../../types/product.type";
import { Category } from "../../types/category.type";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

describe("ProductService", () => {
  let productService: ProductService;

  beforeEach(() => {
    productService = new ProductService();
    fetchMock.resetMocks();
  });

  it("should fetch products with limit and skip", async () => {
    const mockProducts: Product[] = [{
      id: 1, title: "Product 1",
      description: "",
      category: "",
      price: 0,
      rating: 0,
      stock: 0,
      brand: "",
      sku: "",
      images: [],
      thumbnail: ""
    }];
    fetchMock.mockResponseOnce(
      JSON.stringify({ products: mockProducts, total: 1, skip: 0, limit: 12 })
    );

    const products = await productService.fetchProducts(12, 0);
    expect(products).toEqual(mockProducts);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://dummyjson.com/products?limit=12&skip=0"
    );
  });

  it("should search products with query", async () => {
    const mockProducts: Product[] = [{
      id: 1, title: "Product 1",
      description: "",
      category: "",
      price: 0,
      rating: 0,
      stock: 0,
      brand: "",
      sku: "",
      images: [],
      thumbnail: ""
    }];
    fetchMock.mockResponseOnce(
      JSON.stringify({ products: mockProducts, total: 1 })
    );

    const products = await productService.searchProducts("test");
    expect(products).toEqual(mockProducts);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://dummyjson.com/products/search?q=test"
    );
  });

  it("should fetch categories", async () => {
    const mockCategories: Category[] = [{
      name: "Category 1",
      slug: "",
      url: ""
    }];
    fetchMock.mockResponseOnce(JSON.stringify(mockCategories));

    const categories = await productService.fetchCategories();
    expect(categories).toEqual(mockCategories);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://dummyjson.com/products/categories"
    );
  });

  it("should fetch products by category with limit and skip", async () => {
    const mockProducts: Product[] = [{
      id: 1, title: "Product 1",
      description: "",
      category: "",
      price: 0,
      rating: 0,
      stock: 0,
      brand: "",
      sku: "",
      images: [],
      thumbnail: ""
    }];
    fetchMock.mockResponseOnce(
      JSON.stringify({ products: mockProducts, total: 1, skip: 0, limit: 12 })
    );

    const products = await productService.fetchProductsByCategory(
      "electronics",
      12,
      0
    );
    expect(products).toEqual(mockProducts);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://dummyjson.com/products/category/electronics?limit=12&skip=0"
    );
  });

  it("should fetch category name by slug", async () => {
    const mockCategories: Category[] = [
      {
        name: "Beauty", slug: "beauty",
        url: ""
      },
    ];
    fetchMock.mockResponseOnce(JSON.stringify(mockCategories));

    const categoryName = await productService.fetchCategoryNameBySlug("beauty");
    expect(categoryName).toEqual("Beauty");
    expect(fetchMock).toHaveBeenCalledWith(
      "https://dummyjson.com/products/categories"
    );
  });
});