import React, { useState } from "react";

export const AuthContext = React.createContext({
  auth: false,
  login: (formdata: Login) => Promise.resolve(),
});

type Login = {
  username: string;
  password: string;
}

type Props = {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({children}) => {
  const [auth, setAuth] = useState(false)
  async function login({username, password}: Login) {
    if (username !== 'boytrend@gmail.com' || password !== '1234') {
      throw new Error('Username or password is wrong')
    }

    setAuth(true)
  }
  return (
    <AuthContext.Provider value={{ auth, login }}>
      {children}
    </AuthContext.Provider>
  );
}