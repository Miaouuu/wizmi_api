import app from '../src/index';

async function config() {
  return {};
}

function build() {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(() => app.close());

  return app;
}

export {
  config,
  build,
};
