// src/index.js
// This is the entry point for the React application.
// It renders the main App component into the root element of the HTML document.
// It also imports the necessary CSS styles for the application.

import React from "react";
import ReactDOM from "react-dom/client";
import styles_start from "./Start.module.css";
import App from "../src/home/App.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode classname={styles_start.body}>
		<App />
	</React.StrictMode>
);
