import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../backend/firebase";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState("null");
    const [userRole, setUserRole] = useState("user");


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setUser(user);
        });
    
        return () => unsubscribe();
    }, []);

    const setAdminRole = () => setUserRole("admin");
    const setUsersRole = () => setUserRole("user");
    return(
        <AuthContext.Provider value={{user, userRole, setAdminRole, setUsersRole}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}