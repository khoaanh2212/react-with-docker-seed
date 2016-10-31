// ---------------------------------------
// Test Environment Setup
// ---------------------------------------
import 'babel-polyfill'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised';
import chaiImmutable from 'chai-immutable';

chai.use(chaiImmutable);
chai.use(chaiAsPromised);
global.chai = chai;
global.expect = chai.expect;
global.should = chai.should();

// ---------------------------------------
// Require Tests
// ---------------------------------------
const __karmaWebpackManifest__ = []; // eslint-disable-line
const inManifest = (path) => ~__karmaWebpackManifest__.indexOf(path);

// require all `tests/**/*.spec.js`
const testsContext = require.context('../test/', true, /\.test\.(js|jsx)$/);

// only run tests that have changed after the first pass.
const testsToRun = testsContext.keys().filter(inManifest)
    ;(testsToRun.length ? testsToRun : testsContext.keys()).forEach(testsContext);

// // require all `src/**/*.js` except for `main.js` (for isparta coverage reporting)
// if (__COVERAGE__) {
//     const componentsContext = require.context('./test', true, /\.test\.(js|jsx)$/);
//     componentsContext.keys().forEach(componentsContext)
// }
