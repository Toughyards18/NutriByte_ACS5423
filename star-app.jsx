// Project: Star App
// Created Date: 2024-04-06
const { exec } = require("child_process");

function run(command, label) {
	const process = exec(command);

	process.stdout.on("data", (data) => {
		console.log(`[${label}] ${data}`);
	});

	process.stderr.on("data", (data) => {
		console.error(`[${label} Error] ${data}`);
	});

	return process;
}

// Step 1: Install and start backend
run("cd backend && npm install express && npm install mongoose && npm install && npm start", "Backend");
// run("cd backend && npm install express && npm install mongoose && npm install && node ./utils/uploadAllFoods.js && npm start", "Backend");

// Step 2: Install and start frontend
run("cd frontend && npm install && npm install -D tailwindcss && npm run start ", "Frontend");