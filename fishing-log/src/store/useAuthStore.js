import { create } from 'zustand'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { auth } from '../firebase'
import useCatchStore from './useCatchStore'

const useAuthStore = create((set) => ({
  user: null,
  loading: true,
  error: null,

  init: () => {
    onAuthStateChanged(auth, (user) => {
      set({ user, loading: false })
      if (!user) {
        useCatchStore.getState().clearStore()
      }
    })
  },

  signup: async (email, password) => {
    set({ error: null })
    try {
      await createUserWithEmailAndPassword(auth, email, password)
    } catch (err) {
      set({ error: err.message })
    }
  },

  login: async (email, password) => {
    set({ error: null })
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (err) {
      set({ error: err.message })
    }
  },

  logout: async () => {
    await signOut(auth)
    set({ user: null })
  },
}))

export default useAuthStore