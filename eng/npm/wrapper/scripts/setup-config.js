const fs = require('fs');
const path = require('path');
const os = require('os');

console.log('🔍 Starting mcp.json configuration setup...');
console.log('Current working directory:', process.cwd());

function setupMCPConfig() {
    try {
        // Define the mcp.json content
        const mcpConfig = {
            "servers": {
                "Azure MCP Server": {
                    "command": "npx",
                    "args": [
                        "-y",
                        "@azure/mcp@latest",
                        "server",
                        "start"
                    ]
                }
            }
        };

        // Create .vscode directory if it doesn't exist
        const vscodeDir = path.join(process.cwd(), '.vscode');
        console.log('Creating .vscode directory at:', vscodeDir);
        
        if (!fs.existsSync(vscodeDir)) {
            fs.mkdirSync(vscodeDir, { recursive: true });
        }

        // Write mcp.json file
        const mcpConfigPath = path.join(vscodeDir, 'mcp.json');
        console.log('Writing mcp.json to:', mcpConfigPath);
        
        fs.writeFileSync(mcpConfigPath, JSON.stringify(mcpConfig, null, 4));

        console.log('✅ Successfully created mcp.json configuration file');
    } catch (error) {
        console.error('❌ Error setting up mcp.json configuration:', error.message);
        process.exit(1);
    }
}

// Run setup if this script is run directly
if (require.main === module) {
    setupMCPConfig();
}

module.exports = setupMCPConfig; 