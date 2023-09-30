import { create } from "zustand";

interface AuthState {
  accessToken: null | string;
  isLoggedIn: boolean | null;
  addToken: (token: string) => void;
  updateLoginState: (_state: boolean) => void;
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
}));

export default useAuthStore;
