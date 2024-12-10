import { db } from "../firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

//Fetch function for a search a specific user
export const fetchContacts = async (userId) => {
  try {
    const contactsRef = collection(db, "Users", userId, "contacts");
    const contactDocs = await getDocs(contactsRef);

    if (contactDocs.empty) {
      console.log("No contacts found");
      return [];
    }

    return contactDocs.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }
    ));

  } catch (error) {
    console.log("Error fetching contacts: ", error);
    return [];
  }
};

// Function to add a contact to the users contacts list
export const addContacts = async (userId, contactId, contactData) => {
  const contactsRef = collection(db, 'Users', userId, 'contacts');
  await addDoc(contactsRef, { ...contactData, id: contactId });
};
