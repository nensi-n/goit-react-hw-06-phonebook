import T from "prop-types";
import "../ContactList/ContactList.css";

function ContactList({ contacts, onDelete }) {
  return (
    <ul className="contact-list">
      {contacts.map((contact) => (
        <li key={contact.id}>
          <p>Name: {contact.name}</p>
          <p>Number: {contact.number}</p>
          <button type="button" onClick={() => onDelete(contact.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: T.arrayOf(
    T.shape({
      id: T.string.isRequired,
      name: T.string.isRequired,
      number: T.string.isRequired,
    })
  ),
  onDelete: T.func.isRequired,
};

export default ContactList;
