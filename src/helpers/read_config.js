const fs = require('fs');

const read_config = async (file, no_error = false) => {
  try {
    const config_data = await fs.readFileSync(file);

    return JSON.parse(config_data);
  } catch (err) {
    if (no_error) {
      return null;
    }

    let error;
    if (err.errno === -2) {
      error = new Error('Could not read config file. Is .neployrc in this directory?');
    } else {
      error = new Error('Error parsing .neployrc config file. Please check that the file is a valid JSON file.');
    }

    throw error;
  }
};

module.exports = read_config;
