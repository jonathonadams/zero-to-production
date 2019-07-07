import path from 'path';
import glob from 'glob';
import replace from 'replace-in-file';
import { resolvePaths } from './resolver';
const args = require('minimist')(process.argv.slice(2));

// TODO -> Current restriction, will only grab the first element of the paths array

(async function replaceAliases(options: any) {
  const { filePath } = options;

  const resolvePathMap = await resolvePaths(filePath);
  const { aliasMap, outDir } = resolvePathMap;

  const t1 = `${outDir}/**/*.js`;
  const jsFiles = await asyncGlob(t1);

  const filesReplaces = await replaceAliasImports(outDir, jsFiles, aliasMap);

  // TODO success ?
})({
  filePath: args['tsConfig']
});

async function replaceAliasImports(
  outDir: string,
  files: string[],
  paths: { [alias: string]: string | undefined }
) {
  let mapOfRelativeImports: any = {};

  return Promise.all(
    files.map(file => {
      // Need to add the trailing separator because outDir does not have it
      const substr = file.substr((outDir + path.sep).length);

      // If in the root directory, length is 1, hence subtract one to get the depth from root
      const depthFrom = substr.split(path.sep).length - 1;
      // Get the options for the specified relative imports if it exist
      let options = mapOfRelativeImports[depthFrom];

      // If it has not been made for the given depth, create one and cache it
      if (options === undefined) {
        options = {
          from: [],
          to: []
        };
        // it has not been created for this given relativity yet
        Object.keys(paths).forEach(key => {
          options.from.push(new RegExp(key, 'g'));
          options.to.push(`${addConcatenation(depthFrom)}${paths[key]}`);
        });
        // Cache it
        mapOfRelativeImports[depthFrom] = options;
      }
      // Set the files property
      options['files'] = file;
      // Call the replace function
      return replace(options);
    })
  );
}

// as the file goes deeper, add additional "../" relative imports from the root dir
function addConcatenation(depth: number) {
  let str = '';
  for (let i = 0; i < depth; i++) {
    str += '..' + path.sep;
  }
  return str;
}

function asyncGlob(pattern: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    glob(pattern, (err: Error | null, matches: string[]) => {
      if (err) {
        reject(err);
      } else {
        resolve(matches);
      }
    });
  });
}
