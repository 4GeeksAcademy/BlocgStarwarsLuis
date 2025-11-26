import { useContext } from "react";
import { Context } from "../main.jsx";
import { Link, useNavigate } from "react-router-dom";

export const ContactList = () => {
  const { store, dispatch } = useContext(Context);
  const navigate = useNavigate();

  const removeContact = (position) => {
    dispatch({ type: "REMOVE_CONTACT", position });
  };

  const contactEdit = (position) => {
    navigate(`/edit/${position}`);
  };

  return (
    <>
      <div className="contact-list-header">
        <div className="contact-list-header"></div>
        <h1> Lista de Contactos </h1>
        <Link to="/create">
          <button className="create-contact-btn">Crear nuevo contacto</button>
        </Link>
      </div>

      <div className="contact-list-container">
        <ul className="contact-ul">
          {store.contactList.map((contact, index) => (
            <li key={index} className="contact-card">
              <div className="contact-details">
                <div className="contact-info">
                  <h3 className="contact-name">
                    <i className="fas fa-user"></i> Nombre: {contact.name}
                  </h3>
                  <p className="contact-email">📧 Email: {contact.email}</p>
                  <p className="contact-phone">📞 Teléfono: {contact.phone}</p>
                  <p className="contact-address">
                    🏠 Dirección: {contact.address}
                  </p>
                </div>
              </div>

              <div className="contact-actions">
                <button onClick={() => contactEdit(index)} className="edit-btn">
                  Editar
                </button>
                <button
                  onClick={() => removeContact(index)}
                  className="delete-btn"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
