const fs = require('fs');
const yaml = require('js-yaml');

const backup_ebconfig = async (application_name) => {
  console.log(application_name);
  const file = fs.readFileSync('./.elasticbeanstalk/config.yml', { encoding: 'utf-8' });

  const json_file = yaml.load(file);

  json_file['branch-defaults'] =  {};
  json_file['environment-defaults'] = {};
  json_file.global.application_name = application_name;

  const yaml_file = yaml.dump(json_file);

  console.log(yaml_file);

  fs.writeFileSync('./.elasticbeanstalk/.config.yml.neploy', file);
  fs.writeFileSync('./.elasticbeanstalk/config.yml', yaml_file);
}

module.exports = backup_ebconfig;
