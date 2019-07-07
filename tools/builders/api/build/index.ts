import {
  BuilderOutput,
  createBuilder,
  BuilderContext
} from '@angular-devkit/architect';
import childProcess, { exec } from 'child_process';
import { JsonObject } from '@angular-devkit/core';
import glob from 'glob';
import cpFile from 'cp-file';
import del from 'del';

export default createBuilder(_buildApiBuilder);

async function _buildApiBuilder(
  options: JsonObject,
  context: BuilderContext
): Promise<BuilderOutput> {
  const uniNpx = process.platform === 'win32' ? 'npx.cmd' : 'npx';
  context.reportStatus(`Executing custom builder...`);

  // Wipe the directory
  await del([`${options.outputPath}/**`, `!${options.outputPath}`]);

  const tsChild = childProcess.spawn(
    uniNpx,
    ['tsc', '--build', options.tsConfig as string],
    {
      stdio: 'pipe'
    }
  );

  tsChild.stdout.on('data', data => {
    context.logger.info(data.toString());
  });
  tsChild.stderr.on('data', data => {
    context.logger.error(data.toString());
  });

  await new Promise<BuilderOutput>(resolve => {
    context.reportStatus(`Done with TypeScript Compilation.`);
    tsChild.on('close', code => {
      resolve({ success: code === 0 });
    });
  });

  const srcFiles: string[] = await new Promise((resolve, reject) => {
    glob(`${options.src}/**/*.graphql`, (err, matches) => {
      resolve(matches);
    });
  });

  const destinationFiles = srcFiles.map(fileName => {
    return `${options.outputPath}${fileName.substr(
      (options.src as string).length,
      fileName.length
    )}`;
  });

  await Promise.all([
    srcFiles.map((value, i) => {
      return cpFile(value, destinationFiles[i]);
    })
  ]);

  // TODO  -> Move this to own npm package
  await new Promise((resolve, reject) => {
    exec(
      `node tools/scripts/alias-replace/replace-aliases.js --tsConfig ${options.tsConfig as string}`,
      (error, stdout, stderr) => {
        if (error) {
          reject(error);
        }
        if (stderr) {
          console.log(stderr);
        }
        resolve(stdout);
      }
    );
  });

  return new Promise<BuilderOutput>(resolve => {
    context.reportStatus(`Done with .`);
    resolve({ success: true });
  });
}
