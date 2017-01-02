const packageJson = __dirname + '/../../package.json';
const contents = require(packageJson);

delete contents.dependencies['node-opus'];
delete contents.dependencies.opusscript;

require('fs').writeFileSync(packageJson, JSON.stringify(contents, null, 2));

console.log('NOTE: Pre-processed package.json automatically');
console.log('NOTE: Remove this hacky pre-processor at the earliest possibility');
