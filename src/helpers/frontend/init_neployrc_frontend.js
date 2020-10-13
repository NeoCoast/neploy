const chalk = require('chalk');
const inquirer = require('inquirer');

const configure_s3_buckets = async () => {
  let add_bucket = true;
  let s3_buckets = [];

  console.log(
    chalk.bold.white('Configure S3 buckets:')
  )

  while (add_bucket) {
    const bucket_info = await inquirer.prompt([
      {
        name: 'region',
        message: 'Bucket region',
        default: 'us-east-1',
      },
      {
        name: 'bucket',
        message: 'Bucket name',
        validate: (value) => value && value.trim() ? true : 'Please enter a bucket name',
      }
    ]);

    if (bucket_info.bucket && bucket_info.region) {
      s3_buckets.push(bucket_info);
    }

    ({add_bucket} = await inquirer.prompt([
      {
        name: 'add_bucket',
        message: 'Add another S3 bucket?',
        type: 'confirm',
        default: false,
      }
    ]));
  }

  return s3_buckets;
}

const configure_cloudfront_distributions = async () => {
  console.log(
    chalk.bold.white('Configure CloudFront distributions:')
  )

  let distributions = [];
  let { add_distribution } = await inquirer.prompt([
    {
      name: 'add_distribution',
      message: 'Add a CloudFront distribution?',
      type: 'confirm',
      default: false,
    }
  ]);

  while (add_distribution) {
    const distribution_info = await inquirer.prompt([
      {
        name: 'id',
        message: 'CloudFront distribution ID',
        validate: (value) => value && value.trim() ? true : 'Please enter a distribution ID',
      },
      {
        name: 'invalidation_paths',
        message: 'Invalidation paths',
        type: 'editor',
      }
    ]);

    if (distribution_info.id) {
      distributions.push({
        id: distribution_info.id,
        invalidation_paths: distribution_info.invalidation_paths
          ? distribution_info.invalidation_paths.split('\n').filter(a => a)
          : ['/*']
      });
    }

    ({add_distribution} = await inquirer.prompt([
      {
        name: 'add_distribution',
        message: 'Add another CloudFront distribution?',
        type: 'confirm',
        default: false,
      }
    ]));
  }

  return distributions;
}

const init_neployrc_frontend = async () => {
  const data = await inquirer.prompt([
      {
        name: 'package_manager',
        message: 'Package manager',
        choices: ['node', 'yarn'],
        type: 'list',
      },
      {
        name: 'build_command',
        message: 'Build command',
        default: ({ package_manager }) => package_manager === 'node' ? 'npm run build' : 'yarn build'
      },
      {
        name: 'build_dir',
        message: 'Build directory',
        default: './dist'
      }
    ]);

  const s3_buckets = await configure_s3_buckets();

  const cloudfront_distributions = await configure_cloudfront_distributions();

  delete data.package_manager;

  return {
    ...data,
    s3_buckets,
    cloudfront_distributions,
  }
};

module.exports = init_neployrc_frontend;
