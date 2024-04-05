const crypto = require('crypto');

// Function to generate a random hex string
const generateSecretKey = () => {
    return crypto.randomBytes(16).toString('hex');
};

// Export the generated secret key
module.exports = {
    SECRET_KEY: generateSecretKey()
};