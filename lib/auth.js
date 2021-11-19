import React, { useState, useEffect, useContext, createContext } from "react";
import {
  getAuth,
  signOut,
  signInWithPopup,
  onAuthStateChanged,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "./firebase";
import { createUser } from "./db";

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleUser = (rawUser) => {
    if (rawUser) {
      const user = formatUser(rawUser);

      createUser(user.uid, user);
      setLoading(false);
      setUser(user);
      return user;
    } else {
      setLoading(false);
      setUser(false);
      return false;
    }
  };

  const handleLoginError = (error) => {
    console.log("Error while login:", error);
  };

  const signinWithGitHub = () => {
    setLoading(true);
    return signInWithPopup(getAuth(), new GithubAuthProvider())
      .then((response) => handleUser(response.user))
      .catch((error) => handleLoginError(error));
  };

  const signinWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(getAuth(), new GoogleAuthProvider()).then(
      (response) =>
        handleUser(response.user).catch((error) => handleLoginError(error))
    );
  };

  const signout = () => {
    return signOut(getAuth()).then(() => handleUser(false));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), handleUser);

    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
    signinWithGitHub,
    signinWithGoogle,
    signout,
  };
}

const formatUser = (user) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
  };
};
