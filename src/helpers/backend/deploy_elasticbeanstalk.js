const { execSync } = require('child_process');
const chalk = require('chalk');
const confirm = require('../confirm');
const backup_ebconfig = require('./backup_ebconfig');

const deploy_instance = async (instance_name, application_name, profile, staged, label, force) => {
  backup_ebconfig(application_name);

  execSync(
    `eb use ${instance_name} --profile ${profile}`,
    {
      stdio: 'inherit',
    },
  );

  let command = `eb deploy`;

  console.log(`${chalk.bold('Deploying to instance:')} ${chalk.yellowBright(name)}`);

  if (staged) {
    console.log(`Deploying ${chalk.bold.underline('staged')} files instead of latest commit`);
    command += ' --staged';
  }

  if (label) {
    console.log(`${chalk.bold('Version label:')} ${chalk.yellowBright(label)}`)
    command += ` --label ${label}`
  }

  command += ` --profile ${profile}`;

  console.log(command);

  await confirm();

  console.log('done');
}

const deploy_elasticbeanstalk = async (eb_apps, aws_profile, staged, label, force) => {
  for (let instance of eb_apps) {
    await deploy_instance(instance.instance_name, instance.application_name, aws_profile, staged, label, force);
  }
}

module.exports = deploy_elasticbeanstalk
