```typescript
/**
 * Generates a markdown file for developer documentation.
 * @param {string} title - The title of the documentation.
 * @param {string} description - A brief description of the system.
 * @param {string[]} features - An array of features.  Each feature should be an object with 'name' and 'description' properties.
 * @param {string} apiEndpoint - Description of the API endpoint (if applicable).
 * @param {string} exampleUsage - Example usage code snippet.
 * @returns {string} - The markdown documentation.
 */
function generateDeveloperDocumentation(
  title: string,
  description: string,
  features: { name: string; description: string }[],
  apiEndpoint?: string,
  exampleUsage?: string
): string {
  let markdown = `# ${title}\n\n${description}\n\n`;

  markdown += "## Features\n\n";
  features.forEach((feature) => {
    markdown += `- **${feature.name}:** ${feature.description}\n`;
  });

  if (apiEndpoint) {
    markdown += `\n## API Endpoint\n\n${apiEndpoint}\n`;
  }

  if (exampleUsage) {
    markdown += `\n## Example Usage\n\n\`\`\`typescript\n${exampleUsage}\n\`\`\`\n`;
  }

  return markdown;
}


/**
 * Generates a simple training outline for system administrators.
 * @param {string} title - The title of the training.
 * @param {string[]} topics - An array of training topics.
 * @returns {string} - The training outline.
 */
function generateAdminTraining(title: string, topics: string[]): string {
  let outline = `## ${title}\n\n`;
  outline += "**Topics:**\n\n";
  topics.forEach((topic) => {
    outline += `- ${topic}\n`;
  });
  return outline;
}

//Example Usage
const developerDocs = generateDeveloperDocumentation(
  "My Awesome System",
  "This system does amazing things!",
  [
    { name: "Feature A", description: "Does thing A." },
    { name: "Feature B", description: "Does thing B." },
  ],
  "/api/v1/data",
  `
  const response = await fetch('/api/v1/data');
  const data = await response.json();
  console.log(data);
  `
);

const adminTraining = generateAdminTraining("System Administration Training", [
  "Installation",
  "Configuration",
  "Monitoring",
  "Troubleshooting",
]);

console.log("Developer Documentation:\n", developerDocs);
console.log("\nAdmin Training Outline:\n", adminTraining);

//In a real-world scenario, you would write these to files.  Example:
// const fs = require('node:fs');
// fs.writeFileSync('developer-docs.md', developerDocs);
// fs.writeFileSync('admin-training.md', adminTraining);


```