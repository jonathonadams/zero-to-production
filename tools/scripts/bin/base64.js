#!/usr/bin/env node
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const process = tslib_1.__importStar(require('process'));
const inputParam = process.argv[2];
if (inputParam) {
  process.stdout.write(base64(inputParam));
}
function base64(string) {
  return Buffer.from(string).toString('base64');
}
