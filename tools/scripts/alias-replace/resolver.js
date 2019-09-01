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
    const aliasMap = {};
    // 1. Get a reference to the directory the original tsConfig is located
    const configDir = path_1.default.dirname(configPath);
    // 2. Create a combined tsConfig object of all config options
    // The relevant directories are captured as it walks up the parent chain
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
    const {
      compilerOptions,
      references // The externally referenced tsconfig dirs
    } = combinedConfig;
    const { paths } = compilerOptions;
    if (paths === undefined) {
      throw new Error('No paths have been defined');
    }
    // Create a reveres object map of { "src/files.ts": "@alias"}
    const reversePathMap = createReversPathsMap(paths);
    // 4. Make relative path references to those that are inside the src directory
    // TODO
    // const filterAliases = await filterReferences(paths, baseUrl, configDir);
    // 5. Make absolute path aliases for those that are referenced (requires TS.v3)
    // For each external reference
    for (let ref of references) {
      // Get an absolute path to the referenced ts config
      const absReferencedPath = yield resolveReferencedPathsToTsConfigs(
        ref,
        configDir
      );
      // Creates an objects with relevant properties from the tsConfig
      const sourceToOutDirMap = yield resolveRelativeReferencedTsConfig(
        absReferencedPath
      );
      // Filter out from the reverse maps?
      // Uses the revers map to add the alias for a given path
      const referenceObject = addReferenceKey(
        sourceToOutDirMap,
        reversePathMap
      );
      // Create the respective relative import (from root) by using the outDir of the main project
      // and the outDir of the referenced project
      console.log('$$$$$$$$$$$$$$$$$$$');
      console.log('outDir');
      console.log(outDir);
      console.log(referenceObject.outDir);
      console.log(referenceObject.relativeToSrc);
      const resolvedDir = path_1.default.relative(
        outDir,
        path_1.default.resolve(
          referenceObject.outDir,
          referenceObject.relativeToSrc
        )
      );
      // Add to the alias map
      aliasMap[referenceObject.alias] = path_1.default.format({
        dir: resolvedDir,
        base: referenceObject.baseFile
      });
    }
    return {
      aliasMap,
      outDir
    };
  });
}
exports.resolvePaths = resolvePaths;
/**
 * add the following properties to the reference object.
 * alias, baseFile & relativeToSrc
 *
 * @param refObject
 * @param reversePathMap
 */
function addReferenceKey(refObject, reversePathMap) {
  // TODO -> to many iterations
  const resolution = Object.keys(reversePathMap).reduce((acc, key) => {
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
  return Object.assign({}, refObject, resolution);
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
    }
  });
}
/**
 * TODO -> I think the only relevant ones here are the ones that are inside the src directory
 *  as the relatives will take care of the rest
 */
function filterReferences(paths, baseUrl, baseDir) {
  const configDir = path_1.default.resolve(baseDir);
  // 3. Iterate over the 'paths' property and filter those that are under
  // the src directory of the entry tsConfig or not. Most probably they are not
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
}
function resolveReferencedPathsToTsConfigs(ref, configDir) {
  return tslib_1.__awaiter(this, void 0, void 0, function*() {
    const referencedTsConfig = path_1.default.resolve(configDir, ref.path);
    // Note that the reference ts configs may point to a directory
    // that loads the ts config or a config file itself.
    const arePathsFiles = yield fs_1.promises.stat(referencedTsConfig);
    // If it is a file, return the path, else add the default 'tsconfig.json' to id
    if (arePathsFiles.isFile()) {
      return referencedTsConfig;
    } else {
      return path_1.default.resolve(referencedTsConfig, 'tsconfig.json');
    }
  });
}
/**
 * Resolve each individual referenced ts config
 *
 * @param configPath
 */
function resolveRelativeReferencedTsConfig(configPath) {
  return tslib_1.__awaiter(this, void 0, void 0, function*() {
    const relative = yield readTsConfigFile(configPath);
    return Object.assign({}, relative.directories, {
      configDir: path_1.default.dirname(configPath)
    });
  });
}
function createReversPathsMap(paths) {
  return Object.keys(paths).reduce((acc, ref) => {
    let src = paths[ref].slice()[0];
    acc[src] = ref;
    return acc;
  }, {});
}
//# sourceMappingURL=resolver.js.map
