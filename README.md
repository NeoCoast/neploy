<p align="center">
  <a href="https://github.com/maurocen/neploy">
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

---

Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
