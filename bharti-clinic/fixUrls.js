const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const dir = path.join(__dirname, 'frontend', 'src');

function findAndReplacePaths(directory) {
    const files = fs.readdirSync(directory);

    for (const file of files) {
        const fullPath = path.join(directory, file);
        if (fs.statSync(fullPath).isDirectory()) {
            findAndReplacePaths(fullPath);
        } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let originalContent = content;

            // Simple replace of hardcoded urls
            // Need to handle both axios commands and fetch if any (though grep only showed axios)
            content = content.replace(/['"`]http:\/\/localhost:5000(\/api[^'"`]+)['"`]/g, '`$1`');
            content = content.replace(/['"`]http:\/\/localhost:5000\/api\/([^'"`]+)['"`]/g, "'/api/$1'");

            // Special handling for axios imports. If file has axios.get but doesn't import from lib/axios
            if (content.includes('axios.')) {
                if (content.includes("import axios from 'axios'")) {
                    const splitPath = fullPath.split('src')[1];
                    const depth = splitPath.split(path.sep).length - 2;
                    const relativePrefix = depth > 0 ? '../'.repeat(depth) : './';
                    content = content.replace("import axios from 'axios'", `import api from '${relativePrefix}lib/axios'`);
                    content = content.replace(/axios\./g, 'api.');
                }
            }

            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content);
                console.log(`Updated: ${fullPath}`);
            }
        }
    }
}

findAndReplacePaths(dir);
console.log('Finished updating hardcoded URLs');
