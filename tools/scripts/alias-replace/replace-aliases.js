'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const path_1 = tslib_1.__importDefault(require('path'));
const glob_1 = tslib_1.__importDefault(require('glob'));
const replace_in_file_1 = tslib_1.__importDefault(require('replace-in-file'));
const resolver_1 = require('./resolver');
const args = require('minimist')(process.argv.slice(2));
// TODO -> Current restriction, will only grab the first element of the paths array
(function replaceAliases(options) {
  return tslib_1.__awaiter(this, void 0, void 0, function*() {
    const { filePath } = options;
    const resolvePathMap = yield resolver_1.resolvePaths(filePath);
    const { aliasMap, outDir } = resolvePathMap;
    const t1 = `${outDir}/**/*.js`;
    const jsFiles = yield asyncGlob(t1);
    const filesReplaces = yield replaceAliasImports(outDir, jsFiles, aliasMap);
    // TODO success ?
  });
})({
  filePath: args['tsConfig']
});
function replaceAliasImports(outDir, files, paths) {
  return tslib_1.__awaiter(this, void 0, void 0, function*() {
    let mapOfRelativeImports = {};
    return Promise.all(
      files.map(file => {
        // Need to add the trailing separator because outDir does not have it
        const substr = file.substr((outDir + path_1.default.sep).length);
        // If in the root directory, length is 1, hence subtract one to get the depth from root
        const depthFrom = substr.split(path_1.default.sep).length - 1;
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
        return replace_in_file_1.default(options);
      })
    );
  });
}
// as the file goes deeper, add additional "../" relative imports from the root dir
function addConcatenation(depth) {
  let str = '';
  for (let i = 0; i < depth; i++) {
    str += '..' + path_1.default.sep;
  }
  return str;
}
function asyncGlob(pattern) {
  return new Promise((resolve, reject) => {
    glob_1.default(pattern, (err, matches) => {
      if (err) {
        reject(err);
      } else {
        resolve(matches);
      }
    });
  });
}
//# sourceMappingURL=replace-aliases.js.map
