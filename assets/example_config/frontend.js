module.exports = {
  aws_profile: "********",
  frontend: {
    build_command: "********",
    build_dir: "********",
    use_delete: false,
    s3_buckets: [{
      region: "********",
      bucket: "********"
    }],
    cloudfront_distributions: [{
      id: "********",
      invalidation_paths: [
        "********"
      ]
    }]
  }
}
