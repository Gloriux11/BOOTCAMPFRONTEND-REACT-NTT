import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom'
import { MemoryRouter } from "react-router-dom";
import Navbar from "../Navbar";
import { CartContext } from "../../../../context/CartContext";
import { ProductService } from "../../../../services/product.service";

it("should update search query and call onSearch with debounce", async () => {
  const mockSearchProducts = jest.fn().mockResolvedValue([]);
  ProductService.prototype.searchProducts = mockSearchProducts;

  const mockOnSearch = jest.fn(); // Aquí defines mockOnSearch

  const mockCartContext = {
    state: { items: [] },
    dispatch: jest.fn(),
  };

  render(
    <CartContext.Provider value={mockCartContext}>
      <MemoryRouter>
        <Navbar onSearch={mockOnSearch} />
      </MemoryRouter>
    </CartContext.Provider>
  );

  // Obtener todos los inputs con el placeholder "Buscar productos..."
  const inputs = screen.getAllByPlaceholderText("Buscar productos...");

  // Seleccionar el primer input
  const input = inputs[0];
  
  fireEvent.change(input, { target: { value: "test" } });

  expect(input).toHaveValue("test");

  await waitFor(() => {
    expect(mockOnSearch).toHaveBeenCalledWith("test");
  });

  expect(mockSearchProducts).toHaveBeenCalledWith("test");
});
