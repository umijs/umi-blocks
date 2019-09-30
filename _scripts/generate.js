const { readdirSync, readFileSync, writeFileSync, existsSync } = require('fs');
const { join, basename } = require('path');
const mkdirp = require('mkdirp');

function parseJSON(root) {
  const dirs = readdirSync(root);
  const type = basename(root);
  const list = dirs.reduce((memo, dir) => {
    if (dir.charAt(0) === '.') return;
    const absDirPath = join(root, dir);
    const pkg = require(join(absDirPath, 'package.json'));
    const url = `https://github.com/umijs/umi-blocks/tree/master/${type}/${dir}`;
    const img = `https://github.com/umijs/umi-blocks/blob/master/${type}/${dir}/snapshot.png?raw=true`;
    memo.push({
      name: pkg.name,
      description: pkg.description,
      url,
      tags: [],
      img,
      previewUrl: '',
      features: [],
    });
    return memo;
  }, []);
  return { list };
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
