// Auth Context for CodeChef Lite
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { ref, set, get, update } from "firebase/database";
import { auth, database } from "@/lib/firebase";
import { UserProfile } from "@/lib/types";
import { Language } from "@/lib/analyzer";
import { getTodayDate, calculateUpdatedStreak } from "@/lib/streak";
import { sendWelcomeEmail } from "@/lib/emailjs";

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<{ error: string | null }>;
  logIn: (email: string, password: string) => Promise<{ error: string | null }>;
  logOut: () => Promise<void>;
  updateLanguage: (language: Language) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user profile from database
  const fetchUserProfile = async (uid: string): Promise<UserProfile | null> => {
    try {
      const userRef = ref(database, `users/${uid}`);
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        return snapshot.val() as UserProfile;
      }
      return null;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
  };

  // Update streak on login
  const updateStreakOnLogin = async (uid: string, profile: UserProfile) => {
    const updatedStreak = calculateUpdatedStreak(
      profile.currentStreak,
      profile.bestStreak,
      profile.lastActiveDate
    );

    // Only update if streak changed
    if (
      updatedStreak.currentStreak !== profile.currentStreak ||
      updatedStreak.bestStreak !== profile.bestStreak
    ) {
      const userRef = ref(database, `users/${uid}`);
      await update(userRef, {
        currentStreak: updatedStreak.currentStreak,
        bestStreak: updatedStreak.bestStreak,
        lastActiveDate: updatedStreak.lastActiveDate,
      });
      return { ...profile, ...updatedStreak };
    }
    return profile;
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      
      if (firebaseUser) {
        const profile = await fetchUserProfile(firebaseUser.uid);
        if (profile) {
          setUserProfile(profile);
        }
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Sign up new user
  const signUp = async (
    email: string,
    password: string,
    name: string
  ): Promise<{ error: string | null }> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
      const today = getTodayDate();

      // Create user profile in database
      const newProfile: UserProfile = {
        uid,
        name,
        email,
        selectedLanguage: "Python",
        problemsSolved: 0,
        avgAccuracy: 0,
        currentStreak: 1,
        bestStreak: 1,
        lastActiveDate: today,
      };

      const userRef = ref(database, `users/${uid}`);
      await set(userRef, newProfile);
      setUserProfile(newProfile);

      // Send welcome email
      await sendWelcomeEmail(name, email);

      return { error: null };
    } catch (error: any) {
      let errorMessage = "An error occurred during sign up";
      
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "This email is already registered. Please log in instead.";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Password should be at least 6 characters long.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Please enter a valid email address.";
      }
      
      return { error: errorMessage };
    }
  };

  // Log in existing user
  const logIn = async (
    email: string,
    password: string
  ): Promise<{ error: string | null }> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // Fetch and update user profile
      let profile = await fetchUserProfile(uid);
      if (profile) {
        profile = await updateStreakOnLogin(uid, profile);
        setUserProfile(profile);
      }

      return { error: null };
    } catch (error: any) {
      let errorMessage = "An error occurred during login";
      
      if (error.code === "auth/user-not-found") {
        errorMessage = "No account found with this email. Please sign up first.";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Incorrect password. Please try again.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Please enter a valid email address.";
      } else if (error.code === "auth/invalid-credential") {
        errorMessage = "Invalid credentials. Please check your email and password.";
      }
      
      return { error: errorMessage };
    }
  };

  // Log out user
  const logOut = async () => {
    await signOut(auth);
    setUserProfile(null);
  };

  // Update selected language
  const updateLanguage = async (language: Language) => {
    if (!user || !userProfile) return;

    const userRef = ref(database, `users/${user.uid}`);
    await update(userRef, { selectedLanguage: language });
    setUserProfile({ ...userProfile, selectedLanguage: language });
  };

  // Refresh user profile
  const refreshProfile = async () => {
    if (!user) return;
    const profile = await fetchUserProfile(user.uid);
    if (profile) {
      setUserProfile(profile);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        signUp,
        logIn,
        logOut,
        updateLanguage,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
