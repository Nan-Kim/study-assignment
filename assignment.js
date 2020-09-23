const exec = require('child_process').exec;
const util = require('util');

const users = [
  'branch-1',
  'branch-2',
  'branch-3',
];

// Try 03: Use asynchronous generator

async function* pushToEachBranch(branches) {
  for (let i = 0; i < branches.length; i++) {
    await util.promisify(exec)(`git checkout ${branches[i]}`);
    await util.promisify(exec)(`git rebase upstream/master`);
    await util.promisify(exec)(`git push origin ${branches[i]}`);
    yield branches[i];
  }
}

(async () => {
  for await (let branch of pushToEachBranch(users)) {
    console.log(`Push to ${branch}`);
  }
})();