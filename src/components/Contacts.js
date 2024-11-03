import React from "react";
import "./Contacts.css"
import { fetchContacts, addContacts } from "../services/ContactService.js";

const Contacts = ({ userId }) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const loadContacts = async () => {
      const contactsData = await fectchContacts(userId)
      setContacts(contactsData);
    }
  })

  return (
    <div>
      <h1>Your Contacts</h1>
      <ul>
        {contacts.map(contact => (
          <li key={contact.id}>{contact.username}</li>
        ))}
      </ul>
    </div>
  )
}

export default Contacts;
