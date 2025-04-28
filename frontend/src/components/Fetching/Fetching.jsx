// src/components/Fetching/Fetching.jsx
// This component displays a dog fetching message when the application is in a loading state.
// It uses the LoadingContext to determine whether to show the loading message or not.

import React from "react";
import { useLoading } from "../../logic/LoadingProvider";
import classes from "./Fetching.module.css"; // Importing CSS module for styling

export default function Fetching({ message = "Loading..." })
{
    const { isLoading } = useLoading(); // Using the loading context to get loading state
    if (!isLoading) return null; // If not loading, return null to avoid rendering

    return (
        <div className={classes.container}>
            <div className={classes.items}>
                <div className={classes.image}>
                    <div className={classes.imageInner} >
                        <h1>{message}</h1>
                        <img src="../../../public/Fetching.gif" alt="Loading!" />
                    </div>
                </div>
            </div>
        </div>
    );
}

