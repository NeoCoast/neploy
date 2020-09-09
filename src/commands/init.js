const { Command, flags } = require('@oclif/command');
const chalk = require('chalk');
const fs = require('fs');

const example_frontend = require('../../assets/example_config/frontend')
const example_backend = require('../../assets/example_config/backend')

class InitCommand extends Command {
  async run() {
    const {
      flags: {
        'no-backend': no_backend,
        'no-frontend': no_frontend,
      },
    } = this.parse(InitCommand);

    let example_config = {
      staging: {}
    };

    if (!no_backend) {
      example_config.staging = Object.assign({}, example_backend);
    }

    if (!no_frontend) {
      example_config.staging = Object.assign(example_config.staging, example_frontend);
    }

    const final_file = JSON.stringify(example_config, null, 2);

    fs.writeFileSync('./.neployrc', final_file);

    this.log(`${chalk.bold.green('\u{2713}')} Config file created: ${chalk.yellowBright('.neployrc')}`);
  }
}

InitCommand.description = `Create a .neployrc file
Creates an example .neployrc file for you to configure how to deploy
`;

InitCommand.flags = {
  'no-backend': flags.boolean({ description: 'Do not include backend configuration', default: false }),
  'no-frontend': flags.boolean({ description: 'Do not include frontend configuration', default: false }),
};

module.exports = InitCommand;
