const TestRunner = require('jest-runner');

class SingleThreadRunner extends TestRunner {
  constructor(...attr) {
    super(...attr);
    this.isSerial = true;
  }
}

module.exports = SingleThreadRunner;
