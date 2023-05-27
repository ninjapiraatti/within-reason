import { mkdirSync } from "fs"
import { execSync } from "child_process"

// Load the configuration file
import { projects } from "./config.json"

// First, remove all existing projects in the public directory
console.log("Removing existing projects...")
for (const project of projects) {
	const projectName = project.split("/").pop()
	execSync(`rm -rf public/${projectName}`)
}

// Then, loop over the project URLs
for (const url of projects) {
	// Determine the project name from the URL
	const projectName = url.split("/").pop()

	console.log(`Starting work on project: ${projectName}`)

	// Clone the repository
	console.log("Cloning repository...")
	execSync(`git clone ${url}`)

	// Build the project
	console.log("Building project...")
	execSync(`cd ${projectName} && npm install && npm run build`)

	// Create the destination directory if it doesn't exist
	console.log("Preparing public directory...")
	mkdirSync(`public/${projectName}`, { recursive: true })

	// Copy the built files into the public directory of the main project
	console.log("Copying build files...")
	execSync(`cp -R ${projectName}/dist/* public/${projectName}`)

	// Delete the cloned repository
	console.log("Cleaning up...")
	execSync(`rm -rf ${projectName}`)

	console.log(`Finished work on project: ${projectName}`)
}
