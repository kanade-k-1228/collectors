import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import React, { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Loading } from "../Components/Loading";
import { firebaseAuth } from "./firebase";

interface AuthContextType {
  user: User | null | undefined;
  loading: boolean;
  error: Error | undefined;
}

const AuthContext = React.createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, loading, error] = useAuthState(firebaseAuth);
  return <AuthContext.Provider value={{ user, loading, error }}>{children}</AuthContext.Provider>;
};

export const signin = (email: string, password: string) => signInWithEmailAndPassword(firebaseAuth, email, password);

export const signup = (email: string, password: string) =>
  createUserWithEmailAndPassword(firebaseAuth, email, password);

export const signout = () => signOut(firebaseAuth);

export const useAuth = () => {
  return useContext(AuthContext);
};

export function SwitchByAuth(props: { withAuth: JSX.Element; withoutAuth: JSX.Element }) {
  const auth = useAuth();
  if (auth.loading || auth.error) {
    console.log(auth.error);
    return <Loading />;
  }
  return auth.user ? props.withAuth : props.withoutAuth;
}
