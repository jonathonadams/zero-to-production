#!/usr/bin/env node
import glob from 'glob';
import { promisify } from 'util';
import fs from 'fs';
import { exec } from 'child_process';
const asyncGlob = promisify(glob);
const fsPromise = fs.promises;

(async function validatePackageJson() {
  console.log('Validating package.json files');

  const workSpaceDir = process.cwd();
  const rootPackage = `${workSpaceDir}/package.json`;

  const { dependencies, devDependencies } = await readPackageJson(rootPackage);

  const packagePaths = await asyncGlob(`${workSpaceDir}/apps/**/package.json`);

  const childPackages = await Promise.all(packagePaths.map(readPackageJson));
  let packagesToSave: { path: string; package: any }[] = [];

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

async function readPackageJson(path: string) {
  const jsonPackage = await fsPromise.readFile(path);
  return JSON.parse(jsonPackage.toString()) as {
    dependencies: { [key: string]: string };
    devDependencies: { [key: string]: string };
  };
}

function addPackageToGitCommit(path: string) {
  return new Promise((resolve, reject) => {
    exec(`git add ${path}`, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      }
      resolve('Success');
    });
  });
}
