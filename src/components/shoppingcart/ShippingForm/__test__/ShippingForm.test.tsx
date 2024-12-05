import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import { BrowserRouter, useNavigate } from "react-router-dom";
import ShippingForm from "../ShippingForm";
import useDistricts from "@/hooks/useDistricts";
import { CartContext } from "@/context/CartContext";
import { routes } from "@/routes/routes";

jest.mock("@/hooks/useDistricts");
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
  }));

const mockDistricts = ["District 1", "District 2", "District 3"];
(useDistricts as jest.Mock).mockReturnValue(mockDistricts);

const renderWithContext = (state: any, dispatch: jest.Mock) => {
    return render(
        <CartContext.Provider value={{ state, dispatch }}>
            <BrowserRouter>
                <ShippingForm />
            </BrowserRouter>
        </CartContext.Provider>
    );
};

describe("ShippingForm", () => {
    it("should render form fields", () => {
        const state = { items: [] };
        const dispatch = jest.fn();
        renderWithContext(state, dispatch);

        expect(screen.getByLabelText("Nombre:")).toBeInTheDocument();
        expect(screen.getByLabelText("Apellidos:")).toBeInTheDocument();
        expect(screen.getByLabelText("Distrito:")).toBeInTheDocument();
        expect(screen.getByLabelText("Dirección:")).toBeInTheDocument();
        expect(screen.getByLabelText("Referencia:")).toBeInTheDocument();
        expect(screen.getByLabelText("Celular:")).toBeInTheDocument();
    });

    it("should display validation errors when form is submitted with empty fields", async () => {
        const state = { items: [] };
        const dispatch = jest.fn();
        renderWithContext(state, dispatch);

        fireEvent.click(screen.getByText("Comprar"));

        await waitFor(() => {
            expect(screen.getAllByText("Debe ingresar un valor válido").length).toBe(3);
            expect(screen.getAllByText("Campo obligatorio").length).toBe(3);
        });
    });

    it("should call dispatch with CLEAR_CART and navigate to Principal route on successful form submission", async () => {
        const state = { items: [{ id: 1, title: "Test Product" }] };
        const dispatch = jest.fn();
        const navigate = useNavigate as jest.Mock;
        const mockNavigate = jest.fn();
        navigate.mockReturnValue(mockNavigate);
        renderWithContext(state, dispatch);

        fireEvent.change(screen.getByLabelText("Nombre:"), { target: { value: "John" } });
        fireEvent.change(screen.getByLabelText("Apellidos:"), { target: { value: "Doe" } });
        fireEvent.change(screen.getByLabelText("Distrito:"), { target: { value: "District 1" } });
        fireEvent.change(screen.getByLabelText("Dirección:"), { target: { value: "123 Main St" } });
        fireEvent.change(screen.getByLabelText("Referencia:"), { target: { value: "Near Park" } });
        fireEvent.change(screen.getByLabelText("Celular:"), { target: { value: "123456789" } });

        fireEvent.click(screen.getByText("Comprar"));

        await waitFor(() => {
            expect(dispatch).toHaveBeenCalledWith({ type: "CLEAR_CART", payload: null });
            expect(mockNavigate).toHaveBeenCalledWith(routes.Principal);
        });
    });
});