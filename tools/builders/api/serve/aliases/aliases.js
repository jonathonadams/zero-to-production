// import { aliases } from './environments/aliases';
// const aliases = require('./aliases');
const moduleAlias = require('module-alias');

const aliases = {
  '@workspace/shared': '../../../../libs/shared',
  '@workspace/backend': '../../../../libs/backend'
};

const newAliases = {};
Object.keys(aliases).forEach(key => {
  newAliases[key] = `${__dirname}${aliases[key]}`;
});

// TODO -> Create a builder that will override these for production builds
moduleAlias.addAliases(newAliases);
