import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid'

const useCatchStore = create(
  persist(
    (set, get) => ({
      catches: [],

      getCatches: (userId) => {
        return get().catches.filter((c) => c.userId === userId)
      },

      addCatch: (catchData, userId) =>
        set((state) => ({
          catches: [
            ...state.catches,
            {
              ...catchData,
              userId,
              id: uuidv4(),
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          ],
        })),

      updateCatch: (id, updates) =>
        set((state) => ({
          catches: state.catches.map((c) =>
            c.id === id
              ? { ...c, ...updates, updatedAt: new Date().toISOString() }
              : c
          ),
        })),

      deleteCatch: (id) =>
        set((state) => ({
          catches: state.catches.filter((c) => c.id !== id),
        })),
    }),
    { name: 'fishing-log-storage' }
  )
)

export default useCatchStore