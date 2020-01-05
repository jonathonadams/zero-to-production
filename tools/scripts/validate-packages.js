'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
// @ts-ignore
const read_package_json_1 = tslib_1.__importDefault(
  require('read-package-json')
);
const glob_1 = tslib_1.__importDefault(require('glob'));
const util_1 = require('util');
const asyncGlob = util_1.promisify(glob_1.default);
const asyncReadJson = util_1.promisify(read_package_json_1.default);
(function validatePackageJson() {
  return tslib_1.__awaiter(this, void 0, void 0, function*() {
    console.log('Validating package.json files.');
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
    childPackages.forEach(packageJson => {
      // Iterate over each dependency and check the main one
      // Check there are dependencies
      if (packageJson.dependencies !== undefined) {
        Object.keys(packageJson.dependencies).forEach(packageName => {
          if (
            packageJson.dependencies[packageName] !== dependencies[packageName]
          ) {
            // The packages do not match up
            collectedErrors.push(
              createErrorMessage(
                packageJson.name,
                packageName,
                packageJson.dependencies[packageName],
                dependencies[packageName]
              )
            );
          }
        });
      }
      if (packageJson.devDependencies !== undefined) {
        Object.keys(packageJson.devDependencies).forEach(packageName => {
          if (
            packageJson.devDependencies[packageName] !==
            devDependencies[packageName]
          ) {
            // The packages do not match up
            collectedErrors.push(
              createErrorMessage(
                packageJson.name,
                packageName,
                packageJson.dependencies[packageName],
                dependencies[packageName]
              )
            );
          }
        });
      }
    });
    if (collectedErrors.length > 0) {
      collectedErrors.forEach(error => {
        console.error(error);
      });
      process.exit(1);
    } else {
      console.log('All files seem to be in order.');
    }
  });
})();
function readPackageJson(path) {
  return tslib_1.__awaiter(this, void 0, void 0, function*() {
    return asyncReadJson(path, false);
  });
}
// function isPropertyDefined(property: any): boolean {
//   return !!property;
// }
function createErrorMessage(
  projectName,
  packageName,
  currentVersionNumber,
  requiredVersionNumber
) {
  return `${projectName} has mismatching version for ${packageName}. Receive ${currentVersionNumber} but should be ${requiredVersionNumber}`;
}
