import React from "react";
import cFooter from "./Footer.module.css";

export default function Footer() {
	return (
		<footer className={cFooter.footer}>
			<p className={cFooter.LeftParagraph}>&copy; 2025 NutriByte. All rights reserved.</p>
			<p className={cFooter.CentertParagraph}> 
				<p>As of 2025, NutriByte is a free and open-source project. </p>
				<p>NutriByte is not affiliated with the USDA or any other government agency.</p>
				<p>Data sourced from 
					<a href="https://fdc.nal.usda.gov/download-datasets" target="_blank" rel="noopener noreferrer"  style="color: var(--primary);"/>
					   USDA Food Data 
					<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle;"/>
				</p>
			</p>
				
			<p className={cFooter.RightParagraph}>Made with ❤️ by the NutriByte Team</p>
			{/* </div> */}
		</footer>
	);
}
