const exec = require('child_process').exec;
const util = require('util');
const users = [
  'naraekn'
];

let promise = Promise.resolve();

for(let i = 0; i < users.length; i++) {
  promise = promise.then(() => {
    return util.promisify(exec)(
      `git checkout ${users[i]}`
    );
  }).then(() => {
    return util.promisify(exec)(
      `git rebase upstream/master`
    );
  }).then(() => {
    return util.promisify(exec)(
      `git push upstream ${users[i]}`
    );
  })
}