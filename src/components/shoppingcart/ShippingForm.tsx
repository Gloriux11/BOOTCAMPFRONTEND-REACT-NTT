import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import useDistricts from "../../hooks/useDistricts";

const ShippingForm: React.FC = () => {
  const cartContext = useContext(CartContext);
  if (!cartContext) {
    throw new Error("CartContext must be used within a CartProvider");
  }
  const { dispatch } = cartContext;
  const navigate = useNavigate(); 

  const districts = useDistricts();
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    distrito: "",
    direccion: "",
    referencia: "",
    celular: "",
  });
  const [errors, setErrors] = useState({
    nombre: "",
    apellidos: "",
    distrito: "",
    direccion: "",
    referencia: "",
    celular: "",
  });

  const validate = () => {
    const newErrors: any = {};
    if (!formData.nombre.match(/^[a-zA-Z\s]+$/)) {
      newErrors.nombre = "Debe ingresar un valor válido";
    }
    if (!formData.apellidos.match(/^[a-zA-Z\s]+$/)) {
      newErrors.apellidos = "Debe ingresar un valor válido";
    }
    if (!formData.distrito) {
      newErrors.distrito = "Campo obligatorio";
    }
    if (!formData.direccion) {
      newErrors.direccion = "Campo obligatorio";
    }
    if (!formData.referencia) {
      newErrors.referencia = "Campo obligatorio";
    }
    if (!formData.celular.match(/^\d+$/)) {
      newErrors.celular = "Debe ingresar un valor válido";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
      }); // Agrega esta acción en el reducer
      navigate("/");
    }
  };

  return (
    <form className="shipping-form" onSubmit={handleSubmit}>
      <h3>Formulario de Envío</h3>
      <div className="form-row">
        <label>Nombre:</label>
        <input
          type="text"
          name="nombre"
          placeholder="Ingresa tu nombre"
          value={formData.nombre}
          onChange={handleChange}
        />
        {errors.nombre && <label className="error">{errors.nombre}</label>}
      </div>
      <div className="form-row">
        <label>Apellidos:</label>
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
      <div className="form-row">
        <label>Distrito:</label>
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
      <div className="form-row">
        <label>Dirección:</label>
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
      <div className="form-row">
        <label>Referencia:</label>
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
      <div className="form-row">
        <label>Celular:</label>
        <input
          type="text"
          name="celular"
          placeholder="Ingresa tu número celular"
          value={formData.celular}
          onChange={handleChange}
        />
        {errors.celular && <label className="error">{errors.celular}</label>}
      </div>
      <button type="submit">Comprar</button>
    </form>
  );
};

export default ShippingForm;
