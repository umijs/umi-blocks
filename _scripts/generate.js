const { readdirSync, readFileSync, writeFileSync, existsSync } = require('fs');
const { join, basename } = require('path');
const mkdirp = require('mkdirp');

function parseJSON(root) {
  const dirs = readdirSync(root);
  const type = basename(root);
  return dirs.reduce((memo, dir) => {
    if (dir.charAt(0) === '.') return;
    const absDirPath = join(root, dir);
    const pkg = require(join(absDirPath, 'package.json'));
    const url = `https://github.com/umijs/umi-blocks/tree/master/${type}/${dir}`;
    memo.push({
      name: pkg.name,
      description: pkg.description,
      url,
      tags: [],
      img: `${url}/snapshot.png?raw=true`,
      previewUrl: '',
      features: [],
    });
    return memo;
  }, []);
}

function generate(root) {
  const dist = join(root, '..', 'dist');
  const type = basename(root);

  console.log(`Generate json for ${type}`);
  mkdirp.sync(dist);

  const json = parseJSON(root);
  writeFileSync(
    join(dist, `${type}.json`),
    JSON.stringify(json, null, 2),
    'utf-8',
  );
}

generate(join(__dirname, '..', 'templates'));
generate(join(__dirname, '..', 'blocks'));
