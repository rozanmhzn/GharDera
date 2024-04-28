"use client";

import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import VerifyOTP from "@/app/(auth)/verifyotp/page";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState("");
  const [fullName, setFullName] = useState("");

  const login = async (res) => {
    try {
      console.log(res);
      if (res.id) {
        window.localStorage.setItem("id", res.id);
        router.push("/verifyotp");
      }
      if (res.email) {
        if (window.localStorage.getItem("id")) {
          window.localStorage.removeItem("id");
        }
        setCurrentUser(res.email);
        setToken(res.token);
        console.log(res.fullName);
        const nameArray = res.fullName.split(" ");
        const initials = nameArray
          .map((n) => n.charAt(0).toUpperCase())
          .join("");
        setFullName(initials);
        window.localStorage.setItem("token", res.token);
        window.localStorage.setItem("in", initials);
        if (res.email === "admin@ghardera.com") {
          console.log("admin");
          router.push("/dashboard");
        } else {
          router.push("/user/profile");
        }
      }
    } catch (err) {
      console.log(err);
      toast.error("Login failed.");
    }
  };

  const signup = async (res) => {
    try {
      console.log(res);
      if (res) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    setCurrentUser(null);
    setToken("");
    localStorage.removeItem("token");
    setFullName("");
    localStorage.removeItem("in");
    router.push("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
    const initials = localStorage.getItem("in");
    setFullName(initials);
  }, []);

  return (
    <AuthContext.Provider
      value={{ currentUser, token, login, logout, signup, fullName }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
