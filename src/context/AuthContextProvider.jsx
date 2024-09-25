import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext } from "react";
import { app } from "../fairebaseConfig";
export const AuthContext = createContext(null);
const auth = getAuth(app);
const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loader, setLoader] = useState(true);
  const register = (email, pass) => {
    setLoader(true);
    return createUserWithEmailAndPassword(auth, email, pass);
  };

  const login = (email, pass) => {
    setLoader(true);
    return signInWithEmailAndPassword(auth, email, pass);
  };

  const logout = () => {
    setLoader(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoader(false);
    });
    return () => {
      unsubscribe;
    };
  }, []);

  const authvalue = { register, login, logout, user, loader };
  return (
    <AuthContext.Provider value={authvalue}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
