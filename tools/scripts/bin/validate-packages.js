#!/usr/bin/env node
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const glob_1 = tslib_1.__importDefault(require('glob'));
const util_1 = require('util');
const fs_1 = tslib_1.__importDefault(require('fs'));
const child_process_1 = require('child_process');
const asyncGlob = util_1.promisify(glob_1.default);
const fsPromise = fs_1.default.promises;
(async function validatePackageJson() {
  console.log('Validating package.json files');
  const workSpaceDir = process.cwd();
  const rootPackage = `${workSpaceDir}/package.json`;
  const { dependencies, devDependencies } = await readPackageJson(rootPackage);
  const packagePaths = await asyncGlob(`${workSpaceDir}/apps/**/package.json`);
  const childPackages = await Promise.all(packagePaths.map(readPackageJson));
  let packagesToSave = [];
  childPackages.forEach((childPackage, i) => {
    let isEdited = false;
    // Iterate over each dependency and check the main one
    // Check there are dependencies
    if (childPackage.dependencies !== undefined) {
      Object.keys(childPackage.dependencies).forEach((packageName) => {
        if (
          childPackage.dependencies[packageName] !== dependencies[packageName]
        ) {
          childPackage.dependencies[packageName] = dependencies[packageName];
          isEdited = true;
        }
      });
    }
    if (childPackage.devDependencies !== undefined) {
      Object.keys(childPackage.devDependencies).forEach((packageName) => {
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
  await Promise.all(
    packagesToSave.map((toSave) =>
      fsPromise.writeFile(toSave.path, JSON.stringify(toSave.package, null, 2))
    )
  );
  await Promise.all(
    packagesToSave.map((toSave) => addPackageToGitCommit(toSave.path))
  );
  console.log('Finished validating package.json files');
})();
async function readPackageJson(path) {
  const jsonPackage = await fsPromise.readFile(path);
  return JSON.parse(jsonPackage.toString());
}
function addPackageToGitCommit(path) {
  return new Promise((resolve, reject) => {
    child_process_1.exec(`git add ${path}`, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      }
      resolve('Success');
    });
  });
}
