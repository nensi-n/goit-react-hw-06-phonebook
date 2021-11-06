import { useState } from "react";
import "../ContactForm/ContactForm.css";
import { addContact } from "../../redux/actions";
import { useDispatch } from "react-redux";
import shortid from "shortid";

function ContactForm() {
  const [state, setState] = useState({ name: "", number: "" });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmite = (e) => {
    e.preventDefault();
    // onSubmite(state);
    dispatch(addContact({ ...state, id: shortid.generate() }));
    setState({ name: "", number: "" });
  };

  return (
    <form id="contact" onSubmit={handleSubmite}>
      <label>
        <p>Name:</p>
        <input
          className="input-field"
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
          value={state.name}
          onChange={handleChange}
        />
      </label>
      <label>
        <p>Number:</p>
        <input
          className="input-field"
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          required
          value={state.number}
          onChange={handleChange}
        />
      </label>
      <button type="submit" className="submit-button">
        Add contact
      </button>
    </form>
  );
}

export default ContactForm;
