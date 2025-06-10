import { Children, createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import useAxios from "../hooks/useAxios";

export const AuthContext = createContext();

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth);
  };

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUser = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const logInWithGoogle = () => {
    return signInWithPopup(auth, provider);
  };

  const axiosSecure = useAxios();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser?.email) {
        try {
          await axiosSecure.post(
            "/jwt",
            { email: currentUser.email },
            { withCredentials: true }
          );
          console.log("JWT cookie set successfully");
        } catch (error) {
          console.error("Error setting JWT:", error);
        }
      } else {
        try {
          await axiosSecure.post("/logout", {}, { withCredentials: true });
          console.log("JWT cookie cleared");
        } catch (error) {
          console.error("Error clearing JWT:", error);
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const authData = {
    user,
    setUser,
    loading,
    logIn,
    logOut,
    createUser,
    updateUser,
    resetPassword,
    logInWithGoogle,
  };
  return <AuthContext value={authData}>{children}</AuthContext>;
};

export default AuthProvider;
