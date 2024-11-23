import { create } from 'zustand';

const useUserStore = create((set) => ({
  currentUser: null,
  fetchUserInfo: async (uid) => {
    if (!uid) return set({ currentUser: null })

    try {

    } catch (err) {
      console.log(err)
      return set({ currentUser: null })
    }
  }
}));
