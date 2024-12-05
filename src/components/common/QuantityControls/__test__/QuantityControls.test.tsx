import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import { Product } from "@/types/product.type";
import QuantityControls from "../QuantityControls";
import { CartContext } from "@/context/CartContext";


const mockProduct: Product = {
    id: 1,
    title: "Test Product",
    brand: "Test Brand",
    images: [""],
    price: 100,
    stock: 10,
    category: "Test Category",
    description: "",
    rating: 0,
    sku: "",
    thumbnail: ""
};

const renderWithContext = (state: any, dispatch: jest.Mock) => {
  return render(
    <CartContext.Provider value={{ state, dispatch }}>
      <QuantityControls product={mockProduct} />
    </CartContext.Provider>
  );
};

describe("QuantityControls", () => {
  it("should render correctly", () => {
    const state = { items: [{ ...mockProduct, quantity: 1 }] };
    const dispatch = jest.fn();
    renderWithContext(state, dispatch);

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByTitle("Eliminar")).toBeInTheDocument();
    expect(screen.getByTitle("Aumentar")).toBeInTheDocument();
  });

  it("should call dispatch with REMOVE_FROM_CART when remove button is clicked", () => {
    const state = { items: [{ ...mockProduct, quantity: 1 }] };
    const dispatch = jest.fn();
    renderWithContext(state, dispatch);

    fireEvent.click(screen.getByTitle("Eliminar"));
    expect(dispatch).toHaveBeenCalledWith({ type: "REMOVE_FROM_CART", payload: mockProduct });
  });

  it("should call dispatch with INCREASE_QUANTITY when increase button is clicked", () => {
    const state = { items: [{ ...mockProduct, quantity: 1 }] };
    const dispatch = jest.fn();
    renderWithContext(state, dispatch);

    fireEvent.click(screen.getByTitle("Aumentar"));
    expect(dispatch).toHaveBeenCalledWith({ type: "INCREASE_QUANTITY", payload: mockProduct });
  });

  it("should call dispatch with DECREASE_QUANTITY when decrease button is clicked", () => {
    const state = { items: [{ ...mockProduct, quantity: 2 }] };
    const dispatch = jest.fn();
    renderWithContext(state, dispatch);

    fireEvent.click(screen.getByTitle("Disminuir"));
    expect(dispatch).toHaveBeenCalledWith({ type: "DECREASE_QUANTITY", payload: mockProduct });
  });

  it("should disable increase button when quantity is equal to stock", () => {
    const state = { items: [{ ...mockProduct, quantity: mockProduct.stock }] };
    const dispatch = jest.fn();
    renderWithContext(state, dispatch);

    expect(screen.getByTitle("Aumentar")).toBeDisabled();
  });
});