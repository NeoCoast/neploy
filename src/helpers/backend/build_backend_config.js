const read_config = require('../read_config');

const build_backend_config = async (env) => {
  const workingDir = process.cwd();

  const config_data = await read_config(`${workingDir}/.neployrc`);

  const {
    [env]: {
      aws_profile,
      backend: config,
    },
  } = config_data;

  const default_config = {
    eb_apps: [],
    aws_profile: 'default',
  };

  const global_config = {
    aws_profile: aws_profile || default_config.aws_profile,
  };

  return { ...default_config, ...global_config, ...config };
};

module.exports = build_backend_config;
