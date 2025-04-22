//  src/logic/LodingLogic.jsx
// This file contains the logic for managing loading state in the application.
import React, { useState, createContext, useContext } from "react";

const LoadingContext = createContext(); // Create a context for loading state
export const useLoading = () => useContext(LoadingContext); // Custom hook to use loading context

export const LoadingProvider = ({ children }) =>
{
    const [isLoading, setLoading] = useState(false); // Initialize loading state
    const showLoading = () => setLoading(true); // Function to show loading
    const hideLoading = () => setLoading(false); // Function to hide loading

    return (
        <LoadingContext.Provider value={{ isLoading, showLoading, hideLoading }}>
            {children}
        </LoadingContext.Provider>
    );
}


