import { createContext, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const { data } = await axios.post(
          "http://localhost:4000/admin/check-access",
          { token }
        );
        console.log(data);
      } catch (error) {
        setAuthData(null);
      }
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await axios.post("http://localhost:4000/admin/login", {
        email,
        password,
      });
      console.log(data);
      localStorage.setItem("authToken", data.token);
      setAuthData(data.token);

      return data;
    } catch (error) {
      throw new Error("Invalid credentials");
    }
  };

  const register = async (name, email, password) => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/admin/register",
        { name, email, password }
      );
      setAuthData(data);
    } catch (error) {
      throw new Error("Registration failed");
    }
  };

  const logout = async () => {
    try {

      localStorage.removeItem('authToken');
      setAuthData(null);
      navigate('/login')
    } catch (error) {
  
    }
  };

  return (
    <AuthContext.Provider value={{ authData, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
