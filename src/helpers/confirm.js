const inquirer = require('inquirer');
const chalk = require('chalk');

const confirm = async () => {
  const { ok } = await inquirer.prompt(
    [
      {
        type: 'confirm',
        default: true,
        name: 'ok',
        message: 'Is this ok?'
      },
    ]
  )
  if (!ok) {
    console.log(`\n${chalk.bold.redBright('\u{26d4}')} Process stopped by user.`);
    process.exit(0);
  }
};

module.exports = confirm;
