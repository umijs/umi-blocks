const { readdirSync, readFileSync, writeFileSync, existsSync } = require('fs');
const { join, basename } = require('path');
const mkdirp = require('mkdirp');

function haveDependencies(pkg, depName) {
  if (pkg.dependencies && pkg.dependencies[depName]) {
    return true;
  }
  if (pkg.devDependencies && pkg.devDependencies[depName]) {
    return true;
  }
  return false;
}

const EXT_NAMES = ['.tsx', '.ts', '.jsx', '.js'];

function getFile(cwd, fileName) {
  for (const ext of EXT_NAMES) {
    const file = join(cwd, `${fileName}${ext}`);
    if (existsSync(file)) {
      return file;
    }
  }
}

function haveImport(cwd, name) {
  const indexFile = getFile(cwd, 'src/index');
  if (!indexFile) return false;
  const content = readFileSync(indexFile, 'utf-8');
  return content.includes(`'${name}'`) || content.includes(`"${name}"`);
}

function parseJSON(root) {
  const dirs = readdirSync(root);
  const type = basename(root);
  const list = dirs.reduce((memo, dir) => {
    if (dir.charAt(0) === '.') return;
    const absDirPath = join(root, dir);
    const pkg = require(join(absDirPath, 'package.json'));
    const url = `https://github.com/umijs/umi-blocks/tree/master/${type}/${dir}`;
    const img = `https://github.com/umijs/umi-blocks/blob/master/${type}/${dir}/snapshot.png?raw=true`;
    const features = [];
    if (haveDependencies(pkg, 'antd') || haveImport(absDirPath, 'antd')) {
      features.push('antd');
    }
    if (getFile(absDirPath, 'src/model')) {
      features.push('dva');
    }
    memo.push({
      name: pkg.name,
      description: pkg.description,
      url,
      tags: [],
      img,
      previewUrl: '',
      features,
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
