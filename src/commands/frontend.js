const { Command, flags } = require('@oclif/command');
const chalk = require('chalk');
const build_frontend = require('../helpers/build_frontend');
const build_frontend_config = require('../helpers/build_frontend_config');
const upload_to_s3 = require('../helpers/upload_to_s3');
const confirm = require('../helpers/confirm');
const create_cloudfront_invalidations = require('../helpers/create_cloudfront_invalidations');

class FrontendCommand extends Command {
  async run() {
    const { flags: command_flags } = this.parse(FrontendCommand);

    const {
      env,
      force,
    } = command_flags;

    if (!env) {
      const error = new Error('Should specify deploy environment');
      throw error;
    }

    this.log(`${chalk.bold('Deploying app to:')} ${chalk.yellowBright(env)}`);

    if (!force) {
      await confirm();
    }

    const {
      aws_profile,
      build_command,
      build_dir,
      cloudfront_distributions,
      s3_buckets,
      use_delete,
    } = await build_frontend_config(env);

    if (!command_flags['no-build']) {
      await build_frontend(build_command, force);
    }

    if (!command_flags['no-upload']) {
      await upload_to_s3(build_dir, s3_buckets, use_delete, aws_profile, force);
    }

    if (Array.isArray(cloudfront_distributions) && !command_flags['no-invalidation']) {
      await create_cloudfront_invalidations(cloudfront_distributions, aws_profile, force);
    }

    this.log(`\n${chalk.bold('--------')}`);
    this.log(`\n${chalk.bold.green('\u{2713}')} ${chalk.bold('DEPLOY COMPLETED')}`);
  }
}

FrontendCommand.description = `Deploy the frontend to S3
Builds the application with the specified environment and deploys to the S3 instance.
If CloudFront distribution is defined, creates invalidation for the specified paths.
`;

FrontendCommand.flags = {
  env: flags.string({ char: 'e', description: 'environment to deploy to', required: true}),
  'no-build': flags.boolean({ description: 'skip the build step', default: false }),
  'no-invalidation': flags.boolean({ description: 'skip creating cloudfront invalidations', default: false }),
  'no-upload': flags.boolean({ description: 'skip uploading to s3 buckets', default: false }),
  force: flags.boolean({ char: 'f', description: 'do not ask for confirmation', default: false }),
};

module.exports = FrontendCommand;
