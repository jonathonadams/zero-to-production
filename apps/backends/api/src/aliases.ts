import { aliases } from './environments/aliases';
import moduleAlias from 'module-alias';

const newAliases: any = {};
Object.keys(aliases).forEach(key => {
  newAliases[key] = `${__dirname}${(aliases as any)[key]}`;
});

// TODO -> Create a builder that will override these for production builds
moduleAlias.addAliases(newAliases);
