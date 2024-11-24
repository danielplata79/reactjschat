import { create } from 'zustand';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const useUserStore = create((set) => ({
  currentUser: null,

  fetchUserInfo: async (uid) => {
    if (!uid) return set({ currentUser: null })

    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        set({ currentUser: docSnap.data() })
      } else {
        set({ currentUser: null });
      }
    } catch (err) {
      console.log(err)
      return set({ currentUser: null })
    }
  }
}));
