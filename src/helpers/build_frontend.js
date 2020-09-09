const chalk = require('chalk');
const { execSync } = require('child_process');
const confirm = require('./confirm');

const build_frontend = async (build_command, force) => {
  console.log(`\n${chalk.bold('Building frontend with command:')} ${chalk.yellowBright(build_command)}`);

  if (!force) {
    await confirm();
  }

  execSync(build_command, { stdio: 'inherit' });
};

module.exports = build_frontend;
