'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const architect_1 = require('@angular-devkit/architect');
const child_process_1 = require('child_process');
const glob_1 = tslib_1.__importDefault(require('glob'));
const cp_file_1 = tslib_1.__importDefault(require('cp-file'));
exports.default = architect_1.createBuilder(_serveApiBuilder);
function _serveApiBuilder(options, context) {
  return tslib_1.__awaiter(this, void 0, void 0, function*() {
    const uniNpx = process.platform === 'win32' ? 'npx.cmd' : 'npx';
    context.reportStatus(`Executing custom builder...`);
    const tsChild = child_process_1.spawn(
      uniNpx,
      ['tsc', '--build', options.tsConfig, '--watch'],
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
    yield new Promise((resolve, reject) => {
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
    const graphQLFiles = yield new Promise((resolve, reject) => {
      glob_1.default(`${options.src}/**/*.graphql`, (err, matches) => {
        resolve(matches);
      });
    });
    const destinationFiles = graphQLFiles.map(fileName => {
      return `${options.outputPath}${fileName.substr(
        options.src.length,
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
    yield Promise.all([
      graphQLFiles.map((value, i) =>
        cp_file_1.default(value, destinationFiles[i])
      )
      // pathFiles.map((value, i) =>
      //   cpFile(
      //     value,
      //     `${process.cwd()}/${options.outputPath as string}${pathFileNames[i]}`
      //   )
      // ),
      // cpFile(options.pathAliases as string, `${options.outputPath}/paths.json`)
    ]);
    // TODO  -> Move this to own npm package
    const tsprChild = child_process_1.spawn(
      uniNpx,
      ['tspr', '--tsConfig', options.tsConfig, '--watch', 'true'],
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
    const nodeMonChild = child_process_1.spawn(
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
      let message = data.toString();
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
        nodeMonChild.exit(0); // Exit Process with no Errors
      }
    });
    return new Promise(resolve => {
      context.reportStatus(`Done with TypeScript Compilation.`);
      tsChild.on('close', code => {
        resolve({ success: code === 0 });
      });
    });
  });
}
//# sourceMappingURL=index.js.map
