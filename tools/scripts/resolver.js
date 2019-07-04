'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const fs_1 = require('fs');
const path_1 = tslib_1.__importDefault(require('path'));
const lodash_merge_1 = tslib_1.__importDefault(require('lodash.merge'));
/**
 * This function needs to take in a path to a ts config file
 * and then return an object of aliases to relative paths based of the outDirs
 */
function resolvePaths(configPath) {
  return tslib_1.__awaiter(this, void 0, void 0, function*() {
    // 1. Create a combined object of all config options
    const combinedTsConfig = yield readTsConfigFile(configPath);
    const { compilerOptions, references } = combinedTsConfig;
    const { paths } = compilerOptions;
    // 2. Get a reference to the directory the original tsConfig is located
    const configDir = path_1.default.dirname(configPath);
    const absConfigDir = `${process.cwd()}/${configDir}`;
    console.log(absConfigDir);
    // 3. Filter the paths that inside the child src tsConfig
    const filterAliases = yield filterReferences(
      paths,
      compilerOptions,
      absConfigDir
    );
    // 4. Make relative path references to those that are inside the src directory
    // TODO
    // 5. Make relative path aliases for those that are referenced (requires TS.v3)
    const absPaths = yield resolveReferencedPathsToTsConfigs(
      references,
      configDir
    );
    // console.log(arePathsFiles.map(a => a.isFile()))
    console.log(absPaths);
  });
}
exports.resolvePaths = resolvePaths;
/**
 * recursively look up the 'extends' property and creates a object with all properties
 *
 * @param configPath Path to tsConfig file
 */
function readTsConfigFile(configPath) {
  return tslib_1.__awaiter(this, void 0, void 0, function*() {
    // 1. Read the file and parse it
    const child = yield fs_1.promises.readFile(configPath, 'utf8');
    const childConfig = JSON.parse(child);
    // 2. Check if the config extends another one
    if (childConfig['extends']) {
      // 3. resolve the path to the parent config
      const currentDir = path_1.default.dirname(configPath);
      const newTsConfigPath = path_1.default.resolve(
        currentDir,
        childConfig['extends']
      );
      // 4. Read the parent config
      const parentConfig = yield readTsConfigFile(newTsConfigPath);
      // 5. Deeply merge the child over the parent
      return lodash_merge_1.default(parentConfig, childConfig);
    } else {
      // 6. Has no parent so return the child
      return childConfig;
    }
  });
}
function filterReferences(paths, compilerOptions, configDir) {
  // 3. Iterate over the 'paths' property and filter those that are under
  // the src directory of the entry tsConfig or not. Most probably they are not
  if (paths) {
    const filteredAliases = Object.keys(paths).reduce(
      (acc, curr) => {
        // Each property is an array
        if (paths[curr].length > 0) {
          // TODO -> More than one in the array
          let alias = paths[curr].shift();
          let aliasPath = path_1.default.resolve(
            compilerOptions['baseUrl'],
            alias
          );
          // If the first section of the alias is the same as the src tsConfig
          // Then the files are NOT referenced and no further lookups for tsConfig
          // Need to happen
          if (aliasPath.substr(0, configDir.length) === configDir) {
            // Then the
            acc.notReferenced.push(curr);
          } else {
            acc.referenced.push(curr);
          }
        } else {
        }
        return acc;
      },
      {
        notReferenced: [],
        referenced: []
      }
    );
    return filteredAliases;
  } else {
    return {
      notReferenced: [],
      referenced: []
    };
  }
}
function resolveReferencedPathsToTsConfigs(references, configDir) {
  return tslib_1.__awaiter(this, void 0, void 0, function*() {
    const referencedTsConfigs = references.map(ref =>
      path_1.default.resolve(configDir, ref.path)
    );
    // Note that the reference ts configs may point to a directory
    // that loads the ts config or a config file itself.
    const arePathsFiles = yield Promise.all(
      referencedTsConfigs.map(pathReference =>
        fs_1.promises.stat(pathReference)
      )
    );
    return referencedTsConfigs.map((ref, i) => {
      if (arePathsFiles[i].isFile()) {
        return ref;
      } else {
        return path_1.default.resolve(ref, 'tsconfig.json');
      }
    });
  });
}
//# sourceMappingURL=resolver.js.map
