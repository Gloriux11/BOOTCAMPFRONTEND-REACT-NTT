import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom'
import { MemoryRouter } from "react-router-dom";
import Navbar from "../Navbar";
import { CartContext } from "../../../../context/CartContext";
import { ProductService } from "../../../../services/product.service";

jest.mock("../../../../services/product.service");

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  useLocation: () => ({ pathname: "/" }),
}));

describe("Navbar component", () => {
  const mockOnSearch = jest.fn();
  const mockCartContext = {
    state: { items: [] },
    dispatch: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should update search query and call onSearch with debounce", async () => {
    const mockSearchProducts = jest.fn().mockResolvedValue([]);
    ProductService.prototype.searchProducts = mockSearchProducts;

    render(
      <CartContext.Provider value={mockCartContext}>
        <MemoryRouter>
          <Navbar onSearch={mockOnSearch} />
        </MemoryRouter>
      </CartContext.Provider>
    );

    const input = screen.getByPlaceholderText("Buscar productos...");
    fireEvent.change(input, { target: { value: "test" } });

    expect(input).toHaveValue("test");

    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith("test");
    });

    expect(mockSearchProducts).toHaveBeenCalledWith("test");
  });

  it("should clear search results when input is cleared", async () => {
    const mockSearchProducts = jest.fn().mockResolvedValue([]);
    ProductService.prototype.searchProducts = mockSearchProducts;

    render(
      <CartContext.Provider value={mockCartContext}>
        <MemoryRouter>
          <Navbar onSearch={mockOnSearch} />
        </MemoryRouter>
      </CartContext.Provider>
    );

    const input = screen.getByPlaceholderText("Buscar productos...");
    fireEvent.change(input, { target: { value: "test" } });

    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith("test");
    });

    fireEvent.change(input, { target: { value: "" } });

    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith("");
    });

    expect(mockSearchProducts).not.toHaveBeenCalled();
  });
});