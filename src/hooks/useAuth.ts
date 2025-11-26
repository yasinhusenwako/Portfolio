import { useState, useEffect } from "react";
import { authAPI } from "@/services/adminService";
import { User } from "firebase/auth";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = authAPI.onAuthStateChanged(async (authUser) => {
      setUser(authUser);
      
      if (authUser) {
        // Check if user has admin claim
        const tokenResult = await authUser.getIdTokenResult();
        setIsAdmin(!!tokenResult.claims.admin);
      } else {
        setIsAdmin(false);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const user = await authAPI.signIn(email, password);
      return user;
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await authAPI.signOut();
    } catch (error) {
      throw error;
    }
  };

  return {
    user,
    loading,
    isAdmin,
    signIn,
    signOut,
  };
};
