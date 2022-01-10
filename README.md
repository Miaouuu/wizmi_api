
# Wizmi - API 

[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)

Wizmi Api is built in Fastify & Prisma


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

```bash
cat .env.example > .env
```

## Tech Stack

[NodeJS](https://nodejs.org/en/download/) `>=16.13.1`

[PNPM](https://pnpm.io/fr/installation/) `>=6.24.2`

## Installation

Install `node_modules`

```bash
pnpm install
```

Migrate migrations

```bash
pnpm run prisma:migration:dev
```

## Development Mode

To start this project in dev mode :

```bash
pnpm run dev
```

## Production Mode

To start this project in production mode :

```bash
pnpm start
```

You can also use Docker :

```bash
docker-compose up
```

## Documentation

[Documentation](https://wizmi-dev.miaou.land/documentation/)

## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.

## Feedback

If you have any feedback, please reach out to us at atosc08@gmail.com

## Authors

- [@SASNOVACAT08](https://www.github.com/sasnovacat08)
- [@Lockev](https://www.github.com/lockev)

## Related

Here are some related projects

- [Wizmi Nuxt](https://github.com/Miaouuu/wizmi_nuxt)
- [Wizmi Modules](https://github.com/Miaouuu/wizmi)

## License
[GNU GPLv3](https://choosealicense.com/licenses/gpl-3.0/)

