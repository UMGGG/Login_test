import React, { createContext } from 'react';

interface AuthContextProps {
  isLoggedIn: boolean;
  nickName: string;
  profileURL: string;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setNickName: React.Dispatch<React.SetStateAction<string>>;
  setProfileURL: React.Dispatch<React.SetStateAction<string>>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  isLoggedIn: true,
  nickName: '',
  profileURL: '',
  setIsLoggedIn: () => {},
  setNickName: () => {},
  setProfileURL: () => {},
  logout: () => {},
});

export default AuthContext;
