import React, { useEffect, useState } from "react";
import "./Contacts.css"
import { fetchContacts, addContacts } from "../services/ContactService";

const Contacts = ({ userId }) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const loadContacts = async () => {
      const contactsData = await fetchContacts(userId)
      setContacts(contactsData);
    };
    loadContacts();
  }, [userId]);

  const handleAddContact = async (contactId, contactData) => {
    await addContacts(userId, contactId, contactData);
    setContacts(prev => [...prev, { id: contactId, ...contactData }]);
  };

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
