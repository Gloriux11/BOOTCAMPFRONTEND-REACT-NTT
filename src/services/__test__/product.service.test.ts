// src/__tests__/productService.test.ts
import { ProductService } from "../../services/product.service";  // Ajusta la ruta según corresponda

// Mock de la función global fetch
global.fetch = jest.fn();

describe('ProductService', () => {
  let productService: ProductService;

  beforeEach(() => {
    // Creamos una nueva instancia del servicio antes de cada test
    productService = new ProductService();
  });

  afterEach(() => {
    jest.clearAllMocks();  // Limpiar mocks después de cada test
  });

  it('should fetch products successfully', async () => {
    // Mockeamos el resultado de fetch
    const mockResponse = {
      products: [{ id: 1, name: 'Product 1' }],
    };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    // Llamamos al método fetchProducts
    const products = await productService.fetchProducts();

    // Aseguramos que fetch haya sido llamado correctamente
    expect(fetch).toHaveBeenCalledWith('https://dummyjson.com/products?limit=12&skip=0');

    // Verificamos que el servicio devuelve los productos mockeados
    expect(products).toEqual(mockResponse.products);
  });

  it('should throw an error if fetching products fails', async () => {
    // Simulamos un fallo en la llamada a fetch
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      statusText: 'Not Found',
    });

    // Verificamos que se lanza un error
    await expect(productService.fetchProducts()).rejects.toThrow('Error fetching products: Not Found');
  });
});
