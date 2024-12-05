import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ForgotPassword from "../ForgotPassword";
import { ForgotPasswordProps } from "../../../../types/ForgotPassword.type";

// Mock de la función validateEmail
jest.mock("./../../../../utils/emailvalidation", () => ({
    validateEmail: jest.fn((email: string) => {
      if (!email.includes("@")) {
        return "Debe ingresar un correo electrónico válido.";
      }
      return "";
    }),
  }));

describe("ForgotPassword Component", () => {
  const defaultProps: ForgotPasswordProps = {
    isOpen: true,
    email: "",
    onClose: jest.fn(),
    onEmailChange: jest.fn(),
    onSubmit: jest.fn(),
  };

  it("should not render when isOpen is false", () => {
    render(<ForgotPassword {...defaultProps} isOpen={false} />);
    expect(screen.queryByText("Resetea tu contraseña")).not.toBeInTheDocument();
  });

  it("should render correctly when isOpen is true", () => {
    render(<ForgotPassword {...defaultProps} />);
    expect(screen.getByText("Resetea tu contraseña")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Correo electrónico")).toBeInTheDocument();
  });

  it("should show error message when email is invalid", () => {
    render(<ForgotPassword {...defaultProps} email="invalid-email" />);
    const submitButton = screen.getByRole("button", { name: /enviar/i });
    fireEvent.click(submitButton);
  
    screen.debug(); // Muestra el estado del DOM en la consola
  
    expect(screen.getByText("Debe ingresar un correo electrónico válido.")).toBeInTheDocument();
  });
  

  it("should call onSubmit when email is valid", () => {
    render(<ForgotPassword {...defaultProps} email="test@example.com" />);
    const submitButton = screen.getByRole("button", { name: /enviar/i });
    fireEvent.click(submitButton);

    expect(defaultProps.onSubmit).toHaveBeenCalledWith("test@example.com");
  });

  it("should clear error message when typing in input field", () => {
    const propsWithError = {
      ...defaultProps,
      email: "invalid-email",
    };

    render(<ForgotPassword {...propsWithError} />);
    const input = screen.getByPlaceholderText("Correo electrónico");

    fireEvent.change(input, { target: { value: "valid@example.com" } });

    expect(defaultProps.onEmailChange).toHaveBeenCalledWith("valid@example.com");
    expect(screen.queryByText("Debe ingresar un correo electrónico válido.")).not.toBeInTheDocument();
  });

  it("should call onClose when Cancelar button is clicked", () => {
    render(<ForgotPassword {...defaultProps} />);
    const cancelButton = screen.getByRole("button", { name: /cancelar/i });
    fireEvent.click(cancelButton);

    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });
});
