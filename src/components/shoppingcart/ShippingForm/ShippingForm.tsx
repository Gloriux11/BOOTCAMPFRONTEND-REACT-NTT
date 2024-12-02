import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../../context/CartContext";
import { routes } from "../../../routes/routes";
import useDistricts from "../../../hooks/useDistricts";
import { FormData } from "../../../types/formData.type";
import { Errors } from "../../../types/errors.type";
import { validateForm } from "../../../utils/validation";
import "./shippingform.css";

const ShippingForm: React.FC = () => {
  const cartContext = useContext(CartContext);
  if (!cartContext) {
    throw new Error("CartContext must be used within a CartProvider");
  }
  const { dispatch } = cartContext;
  const navigate = useNavigate(); 

  const districts = useDistricts();
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    apellidos: "",
    distrito: "",
    direccion: "",
    referencia: "",
    celular: "",
  });
  const [errors, setErrors] = useState<Errors>({
    nombre: "",
    apellidos: "",
    distrito: "",
    direccion: "",
    referencia: "",
    celular: "",
  });

  const validate = () => {
    const newErrors = validateForm(formData); 
    
    setErrors(newErrors);

    // Si hay errores, retornar false; si no, true
    return Object.keys(newErrors).every((error) => newErrors[error as keyof Errors] === "");
  };
  

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Solo se procede si la validación es exitosa
    if (validate()) {
      alert("Su pedido se registró con éxito");
  
      // Limpiar el formulario y el carrito
      setFormData({
        nombre: "",
        apellidos: "",
        distrito: "",
        direccion: "",
        referencia: "",
        celular: "",
      });
  
      dispatch({
        type: "CLEAR_CART",
        payload: null,
      });
  
      navigate(routes.Principal); // Navegar después de un registro exitoso
    }
  };

  return (
    <form className="shipping-form" onSubmit={handleSubmit}>
      <h3>Formulario de Envío</h3>
      <div className="form-row">
        <label>Nombre:</label>
        <div>
          <input
            type="text"
            name="nombre"
            placeholder="Ingresa tu nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
          {errors.nombre && <label className="error">{errors.nombre}</label>}
        </div>
      </div>
      <div className="form-row">
        <label>Apellidos:</label>
        <div>
          <input
            type="text"
            name="apellidos"
            placeholder="Ingresa tus apellidos"
            value={formData.apellidos}
            onChange={handleChange}
          />
          {errors.apellidos && (
            <label className="error">{errors.apellidos}</label>
          )}
        </div>
      </div>
      <div className="form-row">
        <label>Distrito:</label>
        <div>
        <select
          name="distrito"
          value={formData.distrito}
          onChange={handleChange}
        >
          <option value="">Selecciona un distrito</option>
          {districts.map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </select>
        {errors.distrito && <label className="error">{errors.distrito}</label>}
        </div>
      </div>
      <div className="form-row">
        <label>Dirección:</label>
        <div>
        <input
          type="text"
          name="direccion"
          placeholder="Ingresa tu dirección"
          value={formData.direccion}
          onChange={handleChange}
        />
        {errors.direccion && (
          <label className="error">{errors.direccion}</label>
        )}
        </div>
        
      </div>
      <div className="form-row">
        <label>Referencia:</label>
        <div>
        <input
          type="text"
          name="referencia"
          placeholder="Ingresa una referencia"
          value={formData.referencia}
          onChange={handleChange}
        />
        {errors.referencia && (
          <label className="error">{errors.referencia}</label>
        )}
        </div>
      </div>
      <div className="form-row">
        <label>Celular:</label>
        <div>
          <input
            type="text"
            name="celular"
            placeholder="Ingresa tu número celular"
            value={formData.celular}
            onChange={handleChange}
          />
          {errors.celular && <label className="error">{errors.celular}</label>}
        </div>
      </div>
      <button type="submit">Comprar</button>
    </form>
  );
};

export default ShippingForm;
