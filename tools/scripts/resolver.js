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
    // 1. Get a reference to the directory the original tsConfig is located
    const configDir = path_1.default.dirname(configPath);
    const absConfigDir = `${process.cwd()}/${configDir}`;
    // 2. Create a combined object of all config options
    const { combinedConfig, directories } = yield readTsConfigFile(configPath);
    const { baseUrl, outDir, rootDir } = directories;
    // 3 . Check all appropriate directories are defined
    if (baseUrl === undefined) {
      throw new Error('baseUrl is not defined');
    }
    if (outDir === undefined) {
      throw new Error('outDir is not defined');
    }
    if (rootDir === undefined) {
      throw new Error('rootDir is not defined');
    }
    const { compilerOptions, references } = combinedConfig;
    const { paths } = compilerOptions;
    const reversePathMap = pathToReference(paths);
    // 3. Filter the paths that inside the child src tsConfig
    const filterAliases = yield filterReferences(paths, baseUrl, absConfigDir);
    // 4. Make relative path references to those that are inside the src directory
    // TODO
    // console.log(paths);
    // console.log(references);
    // console.log(filterAliases);
    const referencedAliases = filterAliases.referenced;
    /// ------>>>>>>> Loop
    // console.log(referencedAliases);
    // 5. Make absolute path aliases for those that are referenced (requires TS.v3)
    const absReferencedPath = yield resolveReferencedPathsToTsConfigs(
      references[0],
      configDir
    );
    // console.log(absReferencedPath);
    // console.log(absReferencedPaths);
    const sourceToOutDirMap = yield resolveRelativeReferencedTsConfig(
      absReferencedPath
    );
    // console.log(sourceToOutDirMap);
    // Filter out from the reverse maps?
    const a = addReferenceKey(sourceToOutDirMap, reversePathMap);
    // const relative = path.relative()
    console.log(a);
    console.log(outDir);
    const almost = path_1.default.relative(
      outDir,
      path_1.default.resolve(a.outDir, a.relativeToSrc)
    );
    const format = path_1.default.format({
      dir: almost,
      base: a.baseFile
    });
    const map = {};
    map[a.alias] = format;
    console.log(map);
    return map;
  });
}
exports.resolvePaths = resolvePaths;
function addReferenceKey(refObject, reversePathMap) {
  // TODO -> to many iterations
  const te = Object.keys(reversePathMap).reduce((acc, key) => {
    // Resolve the directory
    // TODO -> is using the base url correct here?
    // Appropriate error checking
    // TODO -> if path is not a string
    const dir = path_1.default.resolve(
      refObject.baseUrl,
      path_1.default.dirname(key)
    );
    if (dir.includes(refObject.rootDir)) {
      return {
        alias: reversePathMap[key],
        baseFile: path_1.default.basename(key, '.ts'),
        relativeToSrc: path_1.default.relative(refObject.rootDir, dir)
      };
    } else {
      return acc;
    }
  }, {});
  console.log(te);
  // return { ...refObject, alias: te['alias'], ref: te[0] };
  return Object.assign({}, refObject, te);
}
/**
 * recursively look up the 'extends' property and creates a object with all properties
 *
 * Need to keep track of where the rootDir, outDir, and baseUrl are defined,
 * so return an object with a property of the combined config and the directories where they
 * were defined
 *
 * @param configPath
 * @param directories
 */
function readTsConfigFile(configPath, directories = {}) {
  return tslib_1.__awaiter(this, void 0, void 0, function*() {
    // 1. Read the file and parse it
    const child = yield fs_1.promises.readFile(configPath, 'utf8');
    const childConfig = JSON.parse(child);
    const { rootDir, outDir, baseUrl } = childConfig['compilerOptions'];
    if (rootDir && !directories.rootDir) {
      directories.rootDir = path_1.default.resolve(
        path_1.default.dirname(configPath),
        rootDir
      );
    }
    if (outDir && !directories.outDir) {
      directories.outDir = path_1.default.resolve(
        path_1.default.dirname(configPath),
        outDir
      );
    }
    if (baseUrl && !directories.baseUrl) {
      directories.baseUrl = path_1.default.resolve(
        path_1.default.dirname(configPath),
        baseUrl
      );
    }
    // 2. Check if the config extends another one
    if (childConfig['extends']) {
      // 3. resolve the path to the parent config
      const currentDir = path_1.default.dirname(configPath);
      const newTsConfigPath = path_1.default.resolve(
        currentDir,
        childConfig['extends']
      );
      // 4. Read the parent config
      const parentConfig = yield readTsConfigFile(newTsConfigPath, directories);
      // 5. Deeply merge the child over the parent
      return {
        combinedConfig: lodash_merge_1.default(
          parentConfig.combinedConfig,
          childConfig
        ),
        directories: parentConfig.directories
      };
    } else {
      // 6. Has no parent so return the child
      return {
        combinedConfig: childConfig,
        directories
      };
      // return childConfig;
    }
  });
}
function filterReferences(paths, baseUrl, configDir) {
  // 3. Iterate over the 'paths' property and filter those that are under
  // the src directory of the entry tsConfig or not. Most probably they are not
  if (paths) {
    const filteredAliases = Object.keys(paths).reduce(
      (acc, curr) => {
        // Each property is an array
        if (paths[curr].length > 0) {
          // TODO -> More than one in the array
          let alias = paths[curr].slice().shift();
          let aliasPath = path_1.default.resolve(baseUrl, alias);
          // If the first section of the alias is the same as the src tsConfig
          // Then the files are NOT referenced and no further lookups for tsConfig
          // Need to happen
          if (aliasPath.substr(0, configDir.length) === configDir) {
            // Then the
            acc.notReferenced[curr] = paths[curr];
          } else {
            acc.referenced[curr] = paths[curr];
          }
        } else {
        }
        return acc;
      },
      {
        notReferenced: {},
        referenced: {}
      }
    );
    return filteredAliases;
  } else {
    return {
      notReferenced: {},
      referenced: {}
    };
  }
}
function resolveReferencedPathsToTsConfigs(ref, configDir) {
  return tslib_1.__awaiter(this, void 0, void 0, function*() {
    const referencedTsConfig = path_1.default.resolve(configDir, ref.path);
    // Note that the reference ts configs may point to a directory
    // that loads the ts config or a config file itself.
    const arePathsFiles = yield fs_1.promises.stat(referencedTsConfig);
    if (arePathsFiles.isFile()) {
      return referencedTsConfig;
    } else {
      return path_1.default.resolve(referencedTsConfig, 'tsconfig.json');
    }
    // return referencedTsConfigs.map((ref, i) => {
    //   if (arePathsFiles[i].isFile()) {
    //     return ref;
    //   } else {
    //     return
    //   }
    // });
  });
}
function resolveRelativeReferencedTsConfig(configPath) {
  return tslib_1.__awaiter(this, void 0, void 0, function*() {
    const relative = yield readTsConfigFile(configPath);
    const temp = Object.assign({}, relative.directories);
    temp['configDir'] = path_1.default.dirname(configPath);
    // temp[]
    return temp;
    // const referencedDirectory =
    // // 1. Read the file and parse it
    // const child = await fs.readFile(configPath, 'utf8');
    // const childConfig = JSON.parse(child);
    // const { extends: extendsParent, compilerOptions } = childConfig;
    // const { outDir, rootDir } = compilerOptions;
    // if (outDir && !dirs.outDir) {
    //   dirs.outDir;
    // }
    // console.log(outDir);
    // console.log(rootDir);
    // console.log();
    // // 2. Check if the config extends another one
    // // if (referencedOutDir) {
    // return {
    //   outDir: path.resolve(referencedDirectory, outDir),
    //   configDir: configPath
    //   // };
    //   // console.log(referencedDirectory);
    //   // console.log(referencedOutDir);
    //   // console.log(path.resolve(referencedDirectory, referencedOutDir));
    // };
  });
}
function pathToReference(paths) {
  return Object.keys(paths).reduce((acc, ref) => {
    let src = paths[ref].slice()[0];
    acc[src] = ref;
    return acc;
  }, {});
}
//# sourceMappingURL=resolver.js.map
