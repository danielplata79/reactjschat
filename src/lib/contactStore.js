import { create } from 'zustand';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase';

export const useContactStore = create((set) => ({
  currentContact: null,
  isLoading: true,

  fetchContactInfo: async (uid) => {
    if (!uid) return set({ currentContact: null, isLoading: false });

    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        set({ currentContact: docSnap.data(), isLoading: false });
      } else {
        set({ currentContact: null, isLoading: false });
      }

    } catch (err) {
      console.log(`Error fetching contact info: ${err}`);
      return set({ currentContact: null, isLoading: false });
    }
  }
}));
