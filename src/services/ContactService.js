import { db } from "../firebase";
import { collection, addDoc, getDocs, query, where } from "firebase,firestore";

//Fetch function for a search a specific user
export const fetchContacts = async (userId) => {
  const contactsRef = collection(db, "Users", userId, "contacts");
  const contactDocs = await getDocs(contactsRef);
  return contactDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Function to add a contact to the users contacts list
export const addContact = async (userId, contactId, contactData) => {
  const ContactsRef = collection(db, 'Users', userId, 'contacts');
  await addDoc(contactsRef, { ...contactData, id: contactId });
};
