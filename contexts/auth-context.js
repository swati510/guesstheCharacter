import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  refreshed:false,
  userId: null,
  login: () => {},
  logout: () => {}
});