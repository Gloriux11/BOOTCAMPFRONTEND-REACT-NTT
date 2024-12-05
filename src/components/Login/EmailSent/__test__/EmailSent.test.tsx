import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import EmailSent from "../EmailSent";
import { EmailSentProps } from "./../../../../types/emailsent.type";

describe("EmailSent Component", () => {
  const defaultProps: EmailSentProps = {
    isOpen: true,
    email: "test@example.com",
    onClose: jest.fn(),
  };

  it("should not render if isOpen is false", () => {
    render(<EmailSent {...defaultProps} isOpen={false} />);
    expect(screen.queryByText("Correo Enviado")).not.toBeInTheDocument();
  });

  it("should render correctly when isOpen is true", () => {
    render(<EmailSent {...defaultProps} />);
    expect(screen.getByText("Correo Enviado")).toBeInTheDocument();
    expect(
      screen.getByText(
        "El correo para resetear tu contraseña ha sido enviado a:"
      )
    ).toBeInTheDocument();
    expect(screen.getByText(defaultProps.email)).toBeInTheDocument();
  });

  it("should call onClose when the Accept button is clicked", () => {
    const onCloseMock = jest.fn();
    render(<EmailSent {...defaultProps} onClose={onCloseMock} />);
    const button = screen.getByRole("button", { name: /aceptar/i });
    fireEvent.click(button);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
