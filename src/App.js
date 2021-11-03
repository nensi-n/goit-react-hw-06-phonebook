import { useState, useEffect } from "react";
import "./App.css";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import Container from "./components/Container/Container";
import shortid from "short-id";
import Filter from "./components/Filter/Filter";
import contactFilter from "./utils/filter";

function App() {
  const [state, setState] = useState({
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  });

  useEffect(() => {
    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      setState((prevState) => ({ ...prevState, contacts: parsedContacts }));
    }
  }, []);

  const addContact = (contact) => {
    const contacts = JSON.parse(localStorage.getItem("contacts"));
    const newContact = { id: shortid.generate(), ...contact };
    if (contacts) {
      localStorage.setItem(
        "contacts",
        JSON.stringify([...contacts, newContact])
      );
    } else {
      localStorage.setItem(
        "contacts",
        JSON.stringify([...state.contacts, newContact])
      );
    }
    setState((prevState) => ({
      ...prevState,
      contacts: [...prevState.contacts, newContact],
    }));
  };

  const handleSubmiteForme = (contact) => {
    state.contacts.some(({ name }) => name === contact.name)
      ? alert("Contact alredy exists")
      : addContact(contact);
  };

  const removeContact = (id) => {
    const newContacts = state.contacts.filter((contact) => contact.id !== id);
    setState((prevState) => ({
      ...prevState,
      contacts: newContacts,
    }));
    localStorage.setItem("contacts", JSON.stringify(newContacts));
  };

  const handleChangeFilter = ({ target: { name, value } }) => {
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm onSubmite={handleSubmiteForme} />
      <h2>Contacts</h2>
      <Filter value={state.filter} onChange={handleChangeFilter} />
      <ContactList
        onDelete={removeContact}
        contacts={contactFilter(state.contacts, state.filter)}
      />
    </Container>
  );
}

export default App;
