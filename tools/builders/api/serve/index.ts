import {
  BuilderOutput,
  createBuilder,
  BuilderContext
} from '@angular-devkit/architect';
import childProcess, { exec } from 'child_process';
import { JsonObject } from '@angular-devkit/core';
import glob from 'glob';
import cpFile from 'cp-file';

export default createBuilder(_serveApiBuilder);

async function _serveApiBuilder(
  options: JsonObject,
  context: BuilderContext
): Promise<BuilderOutput> {
  const uniNpx = process.platform === 'win32' ? 'npx.cmd' : 'npx';
  context.reportStatus(`Executing custom builder...`);

  const tsChild = childProcess.spawn(
    uniNpx,
    ['tsc', '--build', options.tsConfig as string, '--watch'],
    {
      stdio: 'pipe'
    }
  );

  let stream = tsChild.stdout.on('data', data => {
    context.logger.info(data.toString());
  });
  tsChild.stderr.on('data', data => {
    context.logger.error(data.toString());
  });

  // A function to block, and wait until the tsc compiler has emitted a message
  // saying it is now watching, so that node-mon does not try an run before it is ready
  await new Promise((resolve, reject) => {
    // Add th event handler with a named reference so it can be removed later
    tsChild.stdout.on('data', function watchingHandler(data) {
      if (data.includes('Watching')) {
        // remove the 'data' listener
        tsChild.stdout.removeListener('data', watchingHandler);
        // resolve
        resolve();
      }
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

  const nodeMonChild = childProcess.spawn(
    uniNpx,
    [
      'cross-env',
      'NODE_ENV=dev',
      'nodemon',
      '-r',
      'dotenv/config',
      `${options.main}`,
      `dotenv_config_path=${options.envPath}`
    ],
    {
      stdio: 'pipe'
    }
  );

  nodeMonChild.stdout.on('data', data => {
    let message: string = data.toString();
    if (!message.includes('[nodemon] restarting due to changes')) {
      context.logger.info(data.toString());
    }
  });
  nodeMonChild.stderr.on('data', data => {
    context.logger.error(data.toString());
  });

  // // Handle messages sent from the Parent
  // nodeMonChild.on('message', msg => {
  //   if (msg.action === 'STOP') {
  //     // Execute Graceful Termination code
  //     nodeMonChild.exit(0); // Exit Process with no Errors
  //   }
  // });

  return new Promise<BuilderOutput>(resolve => {
    context.reportStatus(`Done with TypeScript Compilation.`);
    tsChild.on('close', code => {
      resolve({ success: code === 0 });
    });
  });
}
