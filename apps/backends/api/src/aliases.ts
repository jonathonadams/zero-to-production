import { environment } from './environments/environment';
import moduleAlias from 'module-alias';

// TODO -> Create a builder that will override these for production builds
moduleAlias.addAliases(environment.aliases);
