import { createContext, useState, useEffect } from "react";

import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [authData, setAuthData] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const { data } = await axios.post('http://localhost:4000/admin/check-access', {token});
                console.log(data);
                
            } catch (error) {
                setAuthData(null);
            }
        };
        checkAuth();
    }, []);


    const login = async (email, password) => {
        try {
            const { data } = await axios.post('http://localhost:4000/admin/login', { email, password });
            console.log(data)
           localStorage.setItem('authToken', data.token);
            setAuthData(data.token);

            return data;
        } catch (error) {
            throw new Error('Invalid credentials');
        }
    };

    const register = async (name, email, password) => {
        try {
            const { data } = await axios.post('http://localhost:4000/admin/register', { name, email, password });
            setAuthData(data);
        } catch (error) {
            throw new Error('Registration failed');
        }
    };

    const logout = async () => {
        try {
            await axios.post('http://localhost:4000/admin/logout');
            setAuthData(null);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <AuthContext.Provider value={{authData, register, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;