import { promises as fs } from 'fs';
import path from 'path';
import merge from 'lodash.merge';

interface Directories {
  rootDir?: string;
  outDir?: string;
  baseUrl?: string;
}

interface FilteredReferences {
  notReferenced: { [ref: string]: string[] };
  referenced: { [ref: string]: string[] };
}
/**
 * This function needs to take in a path to a ts config file
 * and then return an object of aliases to relative paths based of the outDirs
 */
export async function resolvePaths(configPath: string) {
  // 1. Get a reference to the directory the original tsConfig is located
  const configDir = path.dirname(configPath);
  const absConfigDir = `${process.cwd()}/${configDir}`;

  // 2. Create a combined object of all config options
  const { combinedConfig, directories } = await readTsConfigFile(configPath);
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
    references
  }: {
    compilerOptions: any;
    references: { path: string }[];
  } = combinedConfig;

  const { paths }: { paths: any } = compilerOptions;

  const reversePathMap = pathToReference(paths);

  // 3. Filter the paths that inside the child src tsConfig
  const filterAliases = await filterReferences(paths, baseUrl, absConfigDir);

  // 4. Make relative path references to those that are inside the src directory
  // TODO

  // console.log(paths);
  // console.log(references);
  // console.log(filterAliases);

  const referencedAliases = filterAliases.referenced;
  /// ------>>>>>>> Loop

  // console.log(referencedAliases);

  // 5. Make absolute path aliases for those that are referenced (requires TS.v3)
  const absReferencedPath = await resolveReferencedPathsToTsConfigs(
    references[0],
    configDir
  );

  // console.log(absReferencedPath);

  // console.log(absReferencedPaths);

  const sourceToOutDirMap = await resolveRelativeReferencedTsConfig(
    absReferencedPath
  );

  // console.log(sourceToOutDirMap);

  // Filter out from the reverse maps?

  const a = addReferenceKey(sourceToOutDirMap, reversePathMap);

  // const relative = path.relative()
  console.log(a);
  console.log(outDir);

  const almost = path.relative(outDir, path.resolve(a.outDir, a.relativeToSrc));
  const format = path.format({
    dir: almost,
    base: a.baseFile
  });
  const map: any = {};
  map[a.alias] = format;
  console.log(map);

  return map;
}

function addReferenceKey(
  refObject: any,
  reversePathMap: { [key: string]: string }
) {
  // TODO -> to many iterations
  const te: any = Object.keys(reversePathMap).reduce((acc, key) => {
    // Resolve the directory
    // TODO -> is using the base url correct here?
    // Appropriate error checking
    // TODO -> if path is not a string
    const dir = path.resolve(refObject.baseUrl, path.dirname(key));
    if (dir.includes(refObject.rootDir)) {
      return {
        alias: reversePathMap[key],
        baseFile: path.basename(key, '.ts'),
        relativeToSrc: path.relative(refObject.rootDir, dir)
      };
    } else {
      return acc;
    }
  }, {});

  console.log(te);
  // return { ...refObject, alias: te['alias'], ref: te[0] };
  return { ...refObject, ...te };
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
async function readTsConfigFile(
  configPath: string,
  directories: Directories = {}
): Promise<{ combinedConfig: any; directories: Directories }> {
  // 1. Read the file and parse it
  const child = await fs.readFile(configPath, 'utf8');
  const childConfig = JSON.parse(child);
  const { rootDir, outDir, baseUrl } = childConfig['compilerOptions'];

  if (rootDir && !directories.rootDir) {
    directories.rootDir = path.resolve(path.dirname(configPath), rootDir);
  }

  if (outDir && !directories.outDir) {
    directories.outDir = path.resolve(path.dirname(configPath), outDir);
  }

  if (baseUrl && !directories.baseUrl) {
    directories.baseUrl = path.resolve(path.dirname(configPath), baseUrl);
  }
  // 2. Check if the config extends another one
  if (childConfig['extends']) {
    // 3. resolve the path to the parent config
    const currentDir = path.dirname(configPath);
    const newTsConfigPath = path.resolve(currentDir, childConfig['extends']);

    // 4. Read the parent config
    const parentConfig = await readTsConfigFile(newTsConfigPath, directories);
    // 5. Deeply merge the child over the parent

    return {
      combinedConfig: merge(parentConfig.combinedConfig, childConfig),
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
}

function filterReferences(
  paths: any,
  baseUrl: string,
  configDir: string
): FilteredReferences {
  // 3. Iterate over the 'paths' property and filter those that are under
  // the src directory of the entry tsConfig or not. Most probably they are not
  if (paths) {
    const filteredAliases = Object.keys(paths).reduce(
      (acc, curr) => {
        // Each property is an array
        if ((paths[curr] as string[]).length > 0) {
          // TODO -> More than one in the array
          let alias = (paths[curr] as string[]).slice().shift() as string;
          let aliasPath: string = path.resolve(baseUrl, alias);

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
      } as FilteredReferences
    );
    return filteredAliases;
  } else {
    return {
      notReferenced: {},
      referenced: {}
    } as FilteredReferences;
  }
}

async function resolveReferencedPathsToTsConfigs(
  ref: { path: string },
  configDir: string
) {
  const referencedTsConfig = path.resolve(configDir, ref.path);

  // Note that the reference ts configs may point to a directory
  // that loads the ts config or a config file itself.
  const arePathsFiles = await fs.stat(referencedTsConfig);

  if (arePathsFiles.isFile()) {
    return referencedTsConfig;
  } else {
    return path.resolve(referencedTsConfig, 'tsconfig.json');
  }
  // return referencedTsConfigs.map((ref, i) => {
  //   if (arePathsFiles[i].isFile()) {
  //     return ref;
  //   } else {
  //     return
  //   }
  // });
}

async function resolveRelativeReferencedTsConfig(configPath: string) {
  const relative = await readTsConfigFile(configPath);
  const temp: any = { ...relative.directories };
  temp['configDir'] = path.dirname(configPath);
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
}

function pathToReference(paths: { [ref: string]: string[] }) {
  return Object.keys(paths).reduce(
    (acc, ref) => {
      let src = paths[ref].slice()[0];
      acc[src] = ref;
      return acc;
    },
    {} as any
  );
}
