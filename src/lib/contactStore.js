import { create } from 'zustand';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase';

export const useContactStore = create((set) => ({
  currentContact: null,
  isLoading: true,
  chatId: null,

  fetchContactInfo: async (uid, chatId) => {
    if (!uid) return set({ currentContact: null, isLoading: false, chatId: null });

    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      set({ chatId: chatId });

      if (docSnap.exists()) {
        set({ currentContact: docSnap.data(), isLoading: false, chatId: chatId });
      } else {
        set({ currentContact: null, isLoading: false, chatId: null });
      }

    } catch (err) {
      console.log(`Error fetching contact info: ${err}`);
      return set({ currentContact: null, isLoading: false, chatId: null });
    }
  }
}));
