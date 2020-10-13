const inquirer = require('inquirer');

const prompt_aws_profile = async () => {
  const { aws_profile } = await inquirer.prompt([
    {
      name: 'aws_profile',
      message: 'AWS profile',
      default: 'default',
      validate: (value) => value && value.trim() ? true : 'Please enter a profile name',
    },
  ]);

  return aws_profile;
}

module.exports = prompt_aws_profile;
