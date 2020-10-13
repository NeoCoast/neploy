<p align="center">
  <a href="https://github.com/neocoast/neploy">
    <img src="./public/rocket.svg" width="250" />
  </a>
</p>

# Neploy

_The NeoCoast deployment tool_

**neploy** is a _portmanteau_ of **[NeoCoast](https://neocoast.com)** and **deploy**.

---

## Usage

```bash
neploy [COMMAND]
```

## init

```bash
neploy init <options>
```

### Options

- --interactive (_optional_): Launch interactive configuration helper (frontend only)
- --no-backend (_optional_): Do not include backend configuration
- --no-frontend (_optional_):  Do not include frontend configuration

## frontend

```bash
neploy frontend <options>
```

### Options

- --env, -e: The name of the environment in the _.neployrc_ file (_i.e._: staging)
- --no-build (_optional_): Skip the build step
- --no-invalidation (_optional_): Skip creating CloudFront invalidations
- --no-upload (_optional_): Skip uploading to S3 buckets
- --force, -f (_optional_): Do not ask for confirmation on any step

## TO-DO list

- [ ] Add backend support
  - [ ] Deploy to ElasticBeanstalk
    - [ ] Synchronize ElasticBeanstalk environment variables with .env
  - [ ] Deploy to EC2
- [ ] Create S3 buckets if they do not exist
- [ ] Make `init` command interactive
  - [x] Frontend
  - [ ] Backend

## Want to contribute?

1. Fork this repository.
2. Clone your fork.
3. Write your changes.
4. Submit a PR.

---

Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
