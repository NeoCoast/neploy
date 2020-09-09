const fs = require('fs');

const read_config = async (file) => {
  try {
    const config_data = await fs.readFileSync(file);

    return JSON.parse(config_data);
  } catch (err) {
    const error = new Error('Could not read config file');

    error.innerError = err;

    throw error;
  }
};

module.exports = read_config;
