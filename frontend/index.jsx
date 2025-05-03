// frontend/index.jsx
// This is the entry point for the React application.
// It renders the main App component into the root element of the HTML document.
// It also imports the necessary CSS styles for the application.

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./src/main/main.jsx";
import { LoadingProvider } from "./src/logic/LoadingProvider.jsx"; // Importing the LoadingProvider to manage loading state

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<LoadingProvider>
			<App />
		</LoadingProvider>
	</React.StrictMode>
);

