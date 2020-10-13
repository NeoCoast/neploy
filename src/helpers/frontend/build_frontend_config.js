const read_config = require('../read_config');

const build_frontend_config = async (env) => {
  const workingDir = process.cwd();

  const config_data = await read_config(`${workingDir}/.neployrc`);

  const {
    [env]: {
      aws_profile,
      frontend: config,
    },
  } = config_data;

  const default_config = {
    build_command: 'yarn build',
    build_dir: './dist',
    s3_buckets: [],
    cloudfront_distributions: [],
    use_delete: false,
    aws_profile: 'default',
  };

  const global_config = {
    aws_profile: aws_profile || default_config.aws_profile,
  };

  return { ...default_config, ...global_config, ...config };
};

module.exports = build_frontend_config;
