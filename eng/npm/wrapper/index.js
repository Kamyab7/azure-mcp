#!/usr/bin/env node

const setupConfig = require('./scripts/setup-config');

const command = process.argv[2];

if (command === 'setup') {
    setupConfig();
} else if (command === 'start') {
    // Load platform-specific package only for non-setup commands
    const os = require('os')
    const platformPackage = require(`@azure/mcp-${os.platform()}-${os.arch()}`)
    platformPackage.runExecutable(process.argv.slice(2))
        .then((code) => {
            process.exit(code)
        })
        .catch((err) => {
            console.error(err)
            process.exit(1)
        })
} else {
    console.error('Unknown command:', command);
    process.exit(1);
}
