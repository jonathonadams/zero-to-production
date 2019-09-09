import {
  BuilderOutput,
  createBuilder,
  BuilderContext
} from '@angular-devkit/architect';
import { spawn } from 'child_process';
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

  const tsChild = spawn(
    uniNpx,
    ['tsc', '--build', options.tsConfig as string, '--watch'],
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

  // A function to block, and wait until the tsc compiler has emitted a message
  // saying it is now watching, so that nodemon does not try an run before it is ready
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

  /**
   * Need to copy the GraphQL files as well. Create a collection of all the GraphQL files
   * and their destinations
   */
  const graphQLFiles: string[] = await new Promise((resolve, reject) => {
    glob(`${options.src}/**/*.graphql`, (err, matches) => {
      resolve(matches);
    });
  });

  const destinationFiles = graphQLFiles.map(fileName => {
    return `${options.outputPath}${fileName.substr(
      (options.src as string).length,
      fileName.length
    )}`;
  });

  /**
   * As typescript does not currently rewrite path aliases.
   * To get around this, in development create a dummy 'index.dev.js' as
   * an entry point to serve that imports the aliases and use the 'module-alias'
   * packages for rewrites. In production, this is not used and the paths are rewritten.
   */
  // const pathFiles: string[] = await new Promise((resolve, reject) => {
  //   glob(`${__dirname}/paths/*.js`, (err, matches) => {
  //     resolve(matches);
  //   });
  // });

  // const pathFileNames = pathFiles.map(name =>
  //   name.substr(`${__dirname}/paths`.length, name.length)
  // );

  /**
   * Copy all the files across. This includes the GraphQL Files,
   * The temporary index.dev.js and paths.js to use when serving
   * and the paths.json file to override the paths.
   */
  await Promise.all([
    graphQLFiles.map((value, i) => cpFile(value, destinationFiles[i]))
    // pathFiles.map((value, i) =>
    //   cpFile(
    //     value,
    //     `${process.cwd()}/${options.outputPath as string}${pathFileNames[i]}`
    //   )
    // ),
    // cpFile(options.pathAliases as string, `${options.outputPath}/paths.json`)
  ]);

  // TODO  -> Move this to own npm package

  const tsprChild = spawn(
    uniNpx,
    ['tspr', '--tsConfig', options.tsConfig as string, '--watch'],
    {
      stdio: 'pipe'
    }
  );

  tsprChild.stdout.on('data', data => {
    context.logger.info(data.toString());
  });
  tsprChild.stderr.on('data', data => {
    context.logger.error(data.toString());
  });

  // // Find the entry point file (from the options that is passed in)
  // // And subtract the '.js' from the end
  // const entryFile = (options.main as string).substring(
  //   0,
  //   (options.main as string).length - 3
  // );

  // // Replace the "<<entry-point-to-override>>" with the main entry point file
  // await replaceInFIle({
  //   files: `${options.outputPath}/index.dev.js`,
  //   from: '<<entry-point-to-override>>',
  //   to: entryFile
  // });

  const nodeMonChild = spawn(
    uniNpx,
    [
      'cross-env',
      'NODE_ENV=dev',
      'nodemon',
      '-r',
      'dotenv/config',
      `${options.outputPath}/${options.main}`,
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

  // Handle messages sent from the Parent
  nodeMonChild.on('message', msg => {
    if (msg.action === 'STOP') {
      // Execute Graceful Termination code
      nodeMonChild.kill(); // Exit Process with no Errors -> sends SIGTERM
    }
  });

  return new Promise<BuilderOutput>(resolve => {
    context.reportStatus(`Done with TypeScript Compilation.`);
    tsChild.on('close', code => {
      resolve({ success: code === 0 });
    });
  });
}
