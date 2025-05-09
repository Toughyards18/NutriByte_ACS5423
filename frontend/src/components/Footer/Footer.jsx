import React from "react";
import { CgWebsite } from "react-icons/cg";
import cFooter from "./Footer.module.css";


export default function Footer() {

	return (
		<footer className={cFooter.footer}>
			<p className={cFooter.LeftParagraph}>&copy; 2025 NutriByte. All rights reserved.</p>			
			<p className={cFooter.CenterParagraph}> 
				As of 2025, NutriByte is a free and open-source project.
				NutriByte is not affiliated with the USDA or any other government agency.
				Data sourced from{" "}
				<a
					href="https://fdc.nal.usda.gov/download-datasets"
					target="_blank"
					rel="noopener noreferrer"
					style={{ color: "var(--primary)" }}
				>
					USDA Food Data <CgWebsite style={{ verticalAlign: "middle" }} />
				</a>
				
			</p>				
			<p className={cFooter.RightParagraph}>Made with ❤️ by the NutriByte Team</p>
		</footer>
	);
}
