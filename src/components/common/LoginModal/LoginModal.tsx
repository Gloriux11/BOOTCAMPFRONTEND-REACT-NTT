import React from "react";
import { useNavigate } from "react-router-dom";
import "./LoginModal.css";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    if (!isOpen) {
        return null;
    }

    const handleLoginRedirect = () => {
        onClose();
        navigate("/login");
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Debe iniciar sesión</h2>
                <p>Para agregar productos al carrito, debe iniciar sesión.</p>
                <button onClick={handleLoginRedirect}>Iniciar Sesión</button>
                <button onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
};

export default LoginModal;