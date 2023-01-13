import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));

  const [redirectBack, setRedirectBack] = useState(false);

  return (
    <UserContext.Provider
      value={{
        loggedIn: loggedIn,
        setLoggedIn: setLoggedIn,
        redirectBack: redirectBack,
        setRedirectBack: setRedirectBack
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
