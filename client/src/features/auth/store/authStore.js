import { create } from "zustand"

const useAuthStore = create((set) => ({

  user: null,
  isLoading : false,
  isAuthenticated: false,
  error:null,


  setUser: (userData) => set({ user: userData }),
  setAuthenticated: (bool) => set({ isAuthenticated: bool }),
  setLoading:(bool) => set({isLoading:bool}),
  setError:(message)=>set({error:message}),
  logout: () => set({ user: null, error: null, isAuthenticated: false })
}))

export default useAuthStore