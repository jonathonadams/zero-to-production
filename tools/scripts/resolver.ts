import { promises as fs } from 'fs';
import path from 'path';
import merge from 'lodash.merge';

/**
 * This function needs to take in a path to a ts config file
 * and then return an object of aliases to relative paths based of the outDirs
 */
export async function resolvePaths(configPath: string) {
  // 1. Create a combined object of all config options
  const combinedTsConfig = await readTsConfigFile(configPath);
  const {
    compilerOptions,
    references
  }: {
    compilerOptions: any;
    references: { path: string }[];
  } = combinedTsConfig;
  const { paths }: { paths: any } = compilerOptions;

  // 2. Get a reference to the directory the original tsConfig is located
  const configDir = path.dirname(configPath);
  const absConfigDir = `${process.cwd()}/${configDir}`;
  console.log(absConfigDir);

  // 3. Filter the paths that inside the child src tsConfig
  const filterAliases = await filterReferences(
    paths,
    compilerOptions,
    absConfigDir
  );

  // 4. Make relative path references to those that are inside the src directory
  // TODO

  // 5. Make relative path aliases for those that are referenced (requires TS.v3)
  const absPaths = await resolveReferencedPathsToTsConfigs(
    references,
    configDir
  );

  // console.log(arePathsFiles.map(a => a.isFile()))
  console.log(absPaths);
}

/**
 * recursively look up the 'extends' property and creates a object with all properties
 *
 * @param configPath Path to tsConfig file
 */
async function readTsConfigFile(configPath: string): Promise<any> {
  // 1. Read the file and parse it
  const child = await fs.readFile(configPath, 'utf8');
  const childConfig = JSON.parse(child);

  // 2. Check if the config extends another one
  if (childConfig['extends']) {
    // 3. resolve the path to the parent config
    const currentDir = path.dirname(configPath);
    const newTsConfigPath = path.resolve(currentDir, childConfig['extends']);

    // 4. Read the parent config
    const parentConfig = await readTsConfigFile(newTsConfigPath);
    // 5. Deeply merge the child over the parent
    return merge(parentConfig, childConfig);
  } else {
    // 6. Has no parent so return the child
    return childConfig;
  }
}

function filterReferences(paths: any, compilerOptions: any, configDir: string) {
  // 3. Iterate over the 'paths' property and filter those that are under
  // the src directory of the entry tsConfig or not. Most probably they are not
  if (paths) {
    const filteredAliases = Object.keys(paths).reduce(
      (acc, curr) => {
        // Each property is an array
        if ((paths[curr] as string[]).length > 0) {
          // TODO -> More than one in the array
          let alias = (paths[curr] as string[]).shift() as string;
          let aliasPath: string = path.resolve(
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
      } as {
        notReferenced: string[];
        referenced: string[];
      }
    );
    return filteredAliases;
  } else {
    return {
      notReferenced: [],
      referenced: []
    } as {
      notReferenced: string[];
      referenced: string[];
    };
  }
}

async function resolveReferencedPathsToTsConfigs(
  references: { path: string }[],
  configDir: string
) {
  const referencedTsConfigs = references.map(ref =>
    path.resolve(configDir, ref.path)
  );

  // Note that the reference ts configs may point to a directory
  // that loads the ts config or a config file itself.
  const arePathsFiles = await Promise.all(
    referencedTsConfigs.map(pathReference => fs.stat(pathReference))
  );
  return referencedTsConfigs.map((ref, i) => {
    if (arePathsFiles[i].isFile()) {
      return ref;
    } else {
      return path.resolve(ref, 'tsconfig.json');
    }
  });
}
