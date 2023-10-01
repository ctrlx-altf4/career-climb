import { create } from "zustand";

interface AuthState {
  accessToken: null | string;
  isLoggedIn: boolean | null;
  addToken: (token: string) => void;
  updateLoginState: (_state: boolean) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()((set) => ({
  accessToken: null,
  isLoggedIn: null,
  addToken: (token) => {
    //TODO: not a good approach
    localStorage.setItem("accessToken", token);
    set(() => ({ accessToken: token, isLoggedIn: true }));
  },
  updateLoginState: (_state) => {
    set((state) => ({ ...state, isLoggedIn: _state }));
  },
  logout: () => {
    localStorage.clear();
    set({ accessToken: null, isLoggedIn: false });
  },
}));

export default useAuthStore;
