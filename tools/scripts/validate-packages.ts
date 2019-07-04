var readJson = require('read-package-json');
var glob = require('glob');

(async function validatePackageJson() {
  console.log('Validating package.json files.');

  const workSpaceDir = process.cwd();
  const collectedErrors: string[] = [];

  const { dependencies, devDependencies } = (await readPackageJson(
    `${workSpaceDir}/package.json`
  )) as any;

  const packagePaths: string[] = await new Promise((resolve, reject) => {
    glob(
      `${workSpaceDir}/apps/**/package.json`,
      (err: Error, matches: string[]) => {
        resolve(matches);
      }
    );
  });

  const childPackages = (await Promise.all(
    packagePaths.map(readPackageJson)
  )) as any[];

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
})();

async function readPackageJson(path: string) {
  return new Promise((resolve, reject) => {
    readJson(path, false, function(er: Error, data: any) {
      if (er) {
        console.error('There was an error reading the file');
        reject();
      }
      resolve(data);
    });
  });
}
