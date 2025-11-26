import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../main.jsx";

export const ContactEdit = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const { store, dispatch } = useContext(Context);
  const navigate = useNavigate();
  const { position } = useParams();

  useEffect(() => {
    if (store.contactList && store.contactList[position]) {
      const contact = store.contactList[position];
      setEmail(contact.email);
      setName(contact.name);
      setPhone(contact.phone);
      setAddress(contact.address);
    } else {
      navigate("/");
    }
  }, [position, store.contactList, navigate]);

  const handleContacEdit = () => {
    const updatedContact = { name, email, phone, address };
    dispatch({
      type: "EDIT_CONTACT",
      value: updatedContact,
      position: parseInt(position),
    });
    navigate("/");
  };

  return (
    <>
      <div className="form-container">
        <h2 className="form-title">Editar Contacto</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="name" className="label-text">
              Nombre Completo
            </label>
            <input
              type="text"
              id="name"
              className="form-input"
              placeholder="Nombre completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="label-text">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone" className="label-text">
              Teléfono
            </label>
            <input
              type="tel"
              id="phone"
              className="form-input"
              placeholder="Telefono"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="address" className="label-text">
              Dirección
            </label>
            <input
              type="text"
              id="address"
              className="form-input"
              placeholder="DIrección"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <button
            type="button"
            className="save-button"
            onClick={handleContacEdit}
          >
            Guardar
          </button>

          <div className="back-link-container">
            <Link to="/" className="back-link">
              Volver al Inicio.
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};
