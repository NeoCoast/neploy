const { cli } = require('cli-ux');
const chalk = require('chalk');

const confirm = async () => {
  if (!(await cli.confirm('Is this ok?'))) {
    console.log(`\n${chalk.bold.redBright('\u{26d4}')} Process stopped by user.`);
    process.exit(0);
  }
};

module.exports = confirm;
