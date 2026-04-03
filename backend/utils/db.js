const fs = require('fs-extra');

const readJSON = (filePath) => {
    try {
        if (!fs.existsSync(filePath)) {
            fs.writeJsonSync(filePath, []);
            return [];
        }
        return fs.readJsonSync(filePath);
    } catch (error) {
        console.error(`Error reading ${filePath}:`, error);
        return [];
    }
};

const writeJSON = (filePath, data) => {
    try {
        fs.writeJsonSync(filePath, data, { spaces: 2 });
        return true;
    } catch (error) {
        console.error(`Error writing to ${filePath}:`, error);
        return false;
    }
};

module.exports = { readJSON, writeJSON };
