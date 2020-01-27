const TestRunner = require('jest-runner');

// A jest runner to make them run single threaded
class SingleThreadRunner extends TestRunner {
  constructor(...attr) {
    super(...attr);
    this.isSerial = true;
  }
}

module.exports = SingleThreadRunner;
