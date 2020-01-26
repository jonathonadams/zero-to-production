#!/usr/bin/env node
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const glob_1 = tslib_1.__importDefault(require('glob'));
const util_1 = require('util');
const fs_1 = tslib_1.__importDefault(require('fs'));
const asyncGlob = util_1.promisify(glob_1.default);
const fsPromise = fs_1.default.promises;
(function validatePackageJson() {
  return tslib_1.__awaiter(this, void 0, void 0, function*() {
    console.log('Validating package.json files');
    const workSpaceDir = process.cwd();
    const collectedErrors = [];
    const rootPackage = `${workSpaceDir}/package.json`;
    const { dependencies, devDependencies } = yield readPackageJson(
      rootPackage
    );
    const packagePaths = yield asyncGlob(
      `${workSpaceDir}/apps/**/package.json`
    );
    const childPackages = yield Promise.all(packagePaths.map(readPackageJson));
    let packagesToSave = [];
    childPackages.forEach((childPackage, i) => {
      let isEdited = false;
      // Iterate over each dependency and check the main one
      // Check there are dependencies
      if (childPackage.dependencies !== undefined) {
        Object.keys(childPackage.dependencies).forEach(packageName => {
          if (
            childPackage.dependencies[packageName] !== dependencies[packageName]
          ) {
            childPackage.dependencies[packageName] = dependencies[packageName];
            isEdited = true;
          }
        });
      }
      if (childPackage.devDependencies !== undefined) {
        Object.keys(childPackage.devDependencies).forEach(packageName => {
          if (
            childPackage.devDependencies[packageName] !==
            devDependencies[packageName]
          ) {
            childPackage.devDependencies[packageName] =
              devDependencies[packageName];
            isEdited = true;
          }
        });
      }
      if (isEdited) {
        packagesToSave.push({ path: packagePaths[i], package: childPackage });
      }
    });
    yield Promise.all(
      packagesToSave.map(toSave =>
        fsPromise.writeFile(
          toSave.path,
          JSON.stringify(toSave.package, null, 2)
        )
      )
    );
    console.log('Finished validating package.json files');
  });
})();
function readPackageJson(path) {
  return tslib_1.__awaiter(this, void 0, void 0, function*() {
    const jsonPackage = yield fsPromise.readFile(path);
    return JSON.parse(jsonPackage.toString());
  });
}
