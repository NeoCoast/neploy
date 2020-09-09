const chalk = require('chalk');
const { execSync } = require('child_process');
const confirm = require('./confirm');

const sync_bucket = async (build_dir, region, bucket, use_delete, profile, force) => {
  let command = `REGION=${region} aws s3 sync ${build_dir} s3://${bucket} --profile=${profile}`;

  if (use_delete) {
    command += ' --delete';
  }

  console.log(`\n${chalk.bold('Uploading to bucket:')} ${chalk.yellowBright(bucket)} ${use_delete ? chalk.redBright('DELETING') : chalk.blueBright('KEEPING')} old files`);

  if (use_delete) {
    console.log(`${chalk.bold('Using the \'use_delete\' option will delete existing files in the bucket')} ${chalk.redBright.underline('THIS CANNOT BE UNDONE')}`);
  }

  if (!force) {
    await confirm();
  }

  await execSync(command, { stdio: 'inherit' });
};

const upload_to_s3 = async (build_dir, buckets, use_delete, profile, force) => {
  for (const bucket of buckets) {
    await sync_bucket(build_dir, bucket.region, bucket.bucket, use_delete, profile, force);
  }
};

module.exports = upload_to_s3;
