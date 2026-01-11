import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { AuthContext } from "./AuthContext";
import { API_ENDPOINTS } from "../config/api";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUser = async (updateData) => {
    if (!auth.currentUser) return Promise.reject("No user logged in");
    await updateProfile(auth.currentUser, updateData);
    setUser((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        ...updateData,
        displayName: updateData.displayName || prev.displayName,
        photoURL: updateData.photoURL || prev.photoURL || null,
      };
    });
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Sync Firebase User with MongoDB Role
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser?.email) {
        try {
          // Fetch the role from your backend
          const res = await fetch(API_ENDPOINTS.userRole(currentUser.email));
          const data = await res.json();

          // Combine Firebase user data with MongoDB role
          const userWithRole = { ...currentUser, role: data.role || "user" };
          setUser(userWithRole);
        } catch (error) {
          console.error("Error fetching user role:", error);
          setUser(currentUser);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authData = {
    user,
    setUser, // Crucial for manual updates during login/register
    createUser,
    logOut,
    signIn,
    loading,
    setLoading,
    updateUser,
  };

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
