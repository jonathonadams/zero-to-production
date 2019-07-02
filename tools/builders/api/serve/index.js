"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const architect_1 = require("@angular-devkit/architect");
const child_process_1 = tslib_1.__importDefault(require("child_process"));
const glob_1 = tslib_1.__importDefault(require("glob"));
const cp_file_1 = tslib_1.__importDefault(require("cp-file"));
exports.default = architect_1.createBuilder(_serveApiBuilder);
function _serveApiBuilder(options, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const uniNpx = process.platform === 'win32' ? 'npx.cmd' : 'npx';
        context.reportStatus(`Executing custom builder...`);
        const tsChild = child_process_1.default.spawn(uniNpx, ['tsc', '--build', options.tsConfig, '--watch'], {
            stdio: 'pipe'
        });
        let stream = tsChild.stdout.on('data', data => {
            context.logger.info(data.toString());
        });
        tsChild.stderr.on('data', data => {
            context.logger.error(data.toString());
        });
        // A function to block, and wait until the tsc compiler has emitted a message
        // saying it is now watching, so that node-mon does not try an run before it is ready
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
        const srcFiles = yield new Promise((resolve, reject) => {
            glob_1.default(`${options.src}/**/*.graphql`, (err, matches) => {
                resolve(matches);
            });
        });
        const destinationFiles = srcFiles.map(fileName => {
            return `${options.outputPath}${fileName.substr(options.src.length, fileName.length)}`;
        });
        yield Promise.all([
            srcFiles.map((value, i) => {
                return cp_file_1.default(value, destinationFiles[i]);
            })
        ]);
        const nodeMonChild = child_process_1.default.spawn(uniNpx, [
            'cross-env',
            'NODE_ENV=dev',
            'nodemon',
            '-r',
            'dotenv/config',
            `${options.main}`,
            `dotenv_config_path=${options.envPath}`
        ], {
            stdio: 'pipe'
        });
        nodeMonChild.stdout.on('data', data => {
            let message = data.toString();
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
        return new Promise(resolve => {
            context.reportStatus(`Done with TypeScript Compilation.`);
            tsChild.on('close', code => {
                resolve({ success: code === 0 });
            });
        });
    });
}
//# sourceMappingURL=index.js.map