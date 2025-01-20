import React, { createContext, useState } from 'react';

// Create the AuthContext
export  const AuthContext = createContext();

// Create a provider component
const AuthProvider = ({ children }) => {
  const data=JSON.parse(localStorage.getItem('auth'))
  const [token, setToken] = useState(data?.token);
  const [user, setUser] = useState(data?.user);

  const handleAuth = (newToken,newUser) => {
    if(newToken && newUser){
      setToken(newToken);
      setUser(newUser)
      localStorage.setItem('auth',JSON.stringify({user:newUser,token:newToken}))
    }else{
      localStorage.clear()
    }

  };

  return (
    <AuthContext.Provider value={{ token, handleAuth, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider