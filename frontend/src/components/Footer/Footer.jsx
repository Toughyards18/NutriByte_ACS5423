import React from "react";
import cFooter from "./Footer.module.css";

export default function Footer() {
	return (
		<footer className={cFooter.footer}>
			<p className={cFooter.LeftParagraph}>&copy; 2025 NutriByte. All rights reserved.</p>
			<p className={cFooter.RightParagraph}>Made with ❤️ by the NutriByte Team</p>
			{/* </div> */}
		</footer>
	);
}
