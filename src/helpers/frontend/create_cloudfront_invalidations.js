const { execSync } = require('child_process');
const chalk = require('chalk');
const confirm = require('../confirm');

const create_distribution_invalidation = async (
  cloudfront_distribution,
  invalidation_paths,
  profile,
  force,
) => {
  const paths = invalidation_paths || ['/*'];
  const paths_to_invalidate = paths.map((path) => `"${path}"`).join(' ');

  console.log(`\n${chalk.bold('Creating invalidation for cloudfront distribution:')} ${chalk.yellowBright(cloudfront_distribution)}`);
  console.log(`${chalk.bold('Paths to be invalidated:')} ${chalk.yellowBright(paths_to_invalidate)}`);

  if (!force) {
    await confirm();
  }

  const command = `aws cloudfront create-invalidation --distribution-id ${cloudfront_distribution} --paths ${paths_to_invalidate} --profile ${profile}`;

  await execSync(command, { stdio: 'inherit' });
};

const create_cloudfront_invalidations = async (cloudfront_distributions, profile, force) => {
  for (const cloudfront_distribution of cloudfront_distributions) {
    const {
      id,
      invalidation_paths,
    } = cloudfront_distribution;

    await create_distribution_invalidation(id, invalidation_paths, profile, force);
  }
};

module.exports = create_cloudfront_invalidations;
