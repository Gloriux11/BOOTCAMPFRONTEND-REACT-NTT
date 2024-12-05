import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import ProductCard from "../ProductCard";
import { CartContext } from "@/context/CartContext";
import { Product } from "@/types/product.type";

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
            <ProductCard product={mockProduct} />
        </CartContext.Provider>
    );
};

describe("ProductCard", () => {
    it("should render product details", () => {
        const state = { items: [] };
        const dispatch = jest.fn();
        renderWithContext(state, dispatch);

        expect(screen.getByText("Test Brand")).toBeInTheDocument();
        expect(screen.getByText("Test Product")).toBeInTheDocument();
        expect(screen.getByText("S/. 100")).toBeInTheDocument();
        expect(screen.getByText("Test Category")).toBeInTheDocument();
    });

    it("should call dispatch with ADD_TO_CART when add to cart button is clicked", () => {
        const state = { items: [] };
        const dispatch = jest.fn();
        renderWithContext(state, dispatch);

        fireEvent.click(screen.getByText("Agregar al carrito"));
        expect(dispatch).toHaveBeenCalledWith({ type: "ADD_TO_CART", payload: mockProduct });
    });

    it("should render QuantityControls when product is in cart", () => {
        const state = { items: [{ ...mockProduct, quantity: 1 }] };
        const dispatch = jest.fn();
        renderWithContext(state, dispatch);

        expect(screen.getByText("1")).toBeInTheDocument(); // Assuming QuantityControls renders the quantity
    });
});