const { readFileSync } = require('fs');
const moduleAlias = require('module-alias');

const pathFile = readFileSync(`${__dirname}/paths.json`, 'utf8');
const paths = JSON.parse(pathFile);

const aliases = {};
Object.keys(paths).forEach(key => {
  aliases[key] = `${__dirname}${paths[key]}`;
});

moduleAlias.addAliases(aliases);
