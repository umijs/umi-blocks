const { join } = require('path');
const BlockGenerator = require('./BlockGenerator');

if (!process.env.BLOCK) {
  console.log(`
Please specify the BLOCK env,

e.g.

$ BLOCK=templates/new-template yarn run create
$ BLOCK=blocks/new-block yarn run create
  `);
  process.exit(1);
}

const generator = new BlockGenerator({
  name: 'foo',
  env: {
    cwd: join(__dirname, '..', process.env.BLOCK),
  },
  resolved: require.resolve(require.resolve('./BlockGenerator')),
});

generator.run(() => {
  console.log('done');
});

