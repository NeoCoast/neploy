const { Command, flags } = require('@oclif/command');
const chalk = require('chalk');
const fs = require('fs');

const example_frontend = require('../assets/example_config/frontend')
const example_backend = require('../assets/example_config/backend');
const init_neployrc_frontend = require('../helpers/frontend/init_neployrc_frontend');
const read_config = require('../helpers/read_config');
const prompt_aws_profile = require('../helpers/init/prompt_aws_profile');

class InitCommand extends Command {
  async run() {
    const {
      flags: {
        'no-backend': no_backend,
        'no-frontend': no_frontend,
        'interactive': interactive,
        'environment': environment,
      },
    } = this.parse(InitCommand);

    const workingDir = process.cwd();
    let config = await read_config(`${workingDir}/.neployrc`, true);
    let init_config = false;

    if (!config) {
      config = {};
      init_config = true;
    }

    if (!config[environment]) {
      config[environment] = {
        aws_profile: '********',
      };
    }

    if (interactive) {
      const aws_profile = await prompt_aws_profile();
      config[environment] = Object.assign(config[environment], { aws_profile });
    }

    if (!no_backend) {
      if (interactive) {
        console.log(
          chalk.grey.italic('Interactive mode for backend not yet available')
        );
      }
      config[environment] = Object.assign(config[environment], example_backend);
    }

    if (!no_frontend) {
      if (interactive) {
        console.log(
          chalk.bold.white('Configure frontend:')
        )
        const data = await init_neployrc_frontend();
        config[environment] = Object.assign(config[environment], { frontend: data });
      } else {
        config[environment] = Object.assign(config[environment], example_frontend);
      }
    }

    const final_file = JSON.stringify(config, null, 2);

    fs.writeFileSync('./.neployrc', final_file);

    this.log(`${chalk.bold.green('\u{2713}')} Config file ${init_config ? 'created' : 'updated'}: ${chalk.yellowBright('.neployrc')}`);
  }
}

InitCommand.description = `Create a .neployrc file
Creates an example .neployrc file for you to configure how to deploy
`;

InitCommand.flags = {
  'interactive': flags.boolean({ char: 'i', description: 'Launch interactive configuration', default: false }),
  'environment': flags.string({ char: 'e', description: 'The environment to be configured', default: 'staging' }),
  'no-backend': flags.boolean({ description: 'Do not include backend configuration', default: false }),
  'no-frontend': flags.boolean({ description: 'Do not include frontend configuration', default: false }),
};

module.exports = InitCommand;
