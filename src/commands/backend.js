const { Command, flags } = require('@oclif/command');
const chalk = require('chalk');

const confirm = require('../helpers/confirm');
const deploy_elasticbeanstalk = require('../helpers/backend/deploy_elasticbeanstalk');
const build_backend_config = require('../helpers/backend/build_backend_config');
const { build } = require('@oclif/command/lib/flags');

class BackendCommands extends Command {
  async run() {
    const { flags: command_flags } = this.parse(BackendCommands);

    const {
      env,
      force,
      staged,
      label
    } = command_flags;

    this.log(`${chalk.bold('Deploying app to:')} ${chalk.yellowBright(env)}`);

    if (!force) {
      await confirm();
    }

    const {
      aws_profile,
      eb_apps,
    } = await build_backend_config(env);

    await deploy_elasticbeanstalk(eb_apps, aws_profile, staged, label, force);
  }
}

BackendCommands.description = `Deploy the backend to ElasticBeanstalk`;

BackendCommands.flags = {
  env: flags.string({
    char: 'e',
    description: 'environment to deploy to',
    required: true,
  }),
  force: flags.boolean({
    char: 'f',
    description: 'do not ask for confirmation',
    default: false,
  }),
  staged: flags.boolean({
    char: 's',
    description: 'deploy staged files instead of latest commit',
    default: false,
  }),
  label: flags.boolean({
    char: 'l',
    description: 'deploy using this version label',
    default: null
  })
};

module.exports = BackendCommands;
