import React from "react";

const districts = [
      "Cercado de Lima",
      "Ate",
      "Barranco",
      "Breña",
      "Callao",
      "Comas",
      "Chorrillos",
      "El Agustino",
      "Jesús María",
      "La Molina",
      "La Victoria",
      "Lince",
      "Los Olivos",
      "Magdalena del Mar",
      "Miraflores",
      "Pueblo Libre",
      "Puente Piedra",
      "Rímac",
      "San Borja",
      "San Isidro",
      "Independencia",
      "San Juan de Miraflores",
      "San Luis",
      "San Martín de Porres",
      "San Miguel",
      "Santiago de Surco",
      "Surquillo",
      "Ventanilla",
      "Villa María del Triunfo",
      "San Juan de Lurigancho",
      "Santa Rosa",
      "Los Olivos",
      "Villa El Salvador",
      "Santa Anita",
    ];

const ShippingForm: React.FC = () => {
  return (
    <form className="shipping-form">
        <h3>Formulario de Envío</h3>
        <div className="form-row">
            <label>Nombre:</label>
            <input type="text" placeholder="Ingresa tu nombre" />
            <label className="error">Ingresa tu nombre</label>
        </div>
        <div className="form-row">
            <label>Apellidos:</label>
            <input type="text" placeholder="Ingresa tus apellidos" />
            <label className="error">Ingresa tus apellidos</label>
        </div>
        <div className="form-row">
            <label>Distrito:</label>
            <select>
                <option value="">Selecciona un distrito</option>
                {districts.map((district) => (
                    <option key={district} value={district}>
                    {district}
                    </option>
                ))}
            </select>
            <label className="error">Selecciona tu distrito</label>
        </div>
        <div className="form-row">
            <label>Dirección:</label>
            <input type="text" placeholder="Ingresa tu dirección" />
            <label className="error">Ingresa tu dirección</label>
        </div>
        <div className="form-row">
            <label>Celular:</label>
            <input type="text" placeholder="Ingresa tu número celular" />
            <label className="error">Ingresa tu número celular</label>
        </div>
        <button type="submit">Ir a Comprar</button>
    </form>
  );
};

export default ShippingForm;
