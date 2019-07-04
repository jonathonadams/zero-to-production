'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : new P(function(resolve) {
              resolve(result.value);
            }).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var readJson = require('read-package-json');
var glob = require('glob');
(function validatePackageJson() {
  return __awaiter(this, void 0, void 0, function*() {
    console.log('Validating package.json files.');
    const workSpaceDir = process.cwd();
    const collectedErrors = [];
    const { dependencies, devDependencies } = yield readPackageJson(
      `${workSpaceDir}/package.json`
    );
    const packagePaths = yield new Promise((resolve, reject) => {
      glob(`${workSpaceDir}/apps/**/package.json`, (err, matches) => {
        resolve(matches);
      });
    });
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
              `${packageJson.name} has mismatching version for ${packageName}. Receive ${packageJson.dependencies[packageName]} but should be ${dependencies[packageName]}`
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
              `${packageJson.name} has mismatching version for ${packageName}. Receive ${packageJson.devDependencies[packageName]} but should be ${devDependencies[packageName]}`
            );
          }
        });
      }
    });
    if (collectedErrors.length > 0) {
      collectedErrors.forEach(error => {
        console.log(error);
      });
      process.exit(1);
    } else {
      console.log('All files seem to be in order.');
    }
  });
})();
function readPackageJson(path) {
  return __awaiter(this, void 0, void 0, function*() {
    return new Promise((resolve, reject) => {
      readJson(path, false, function(er, data) {
        if (er) {
          console.error('There was an error reading the file');
          reject();
        }
        resolve(data);
      });
    });
  });
}
//# sourceMappingURL=validate-packages.js.map
