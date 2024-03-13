import React, { useState, createContext } from "react";

export const AuthContext = createContext({ user: "loading" });

const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const { children } = props;

  return (
    <AuthContext.Provider
      value={{ user, authLoading, setUser, setAuthLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
