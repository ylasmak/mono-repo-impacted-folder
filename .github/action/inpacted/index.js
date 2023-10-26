// Import necessary dependencies
const core = require('@actions/core');
const github = require('@actions/github');
const path = require('path');

async function getChangedFiles() {
  try {
    const token = core.getInput('github-token');
    const pull_number = core.getInput('pull-request-id')
    const client = github.getOctokit(token).rest;


    // Get the pull request information
    const { owner, repo } = github.context.repo;

    // Get the pull request files
    core.notice("pull_number");
    core.notice(pull_number);
    core.notice("Get the pull request files");
    const response = await client.pulls.listFiles({
      owner,
      repo,
      pull_number,
    });
    core.notice("Done")
    const rootFolders = new Set();

    response.data.forEach(file => {
      const rootFolder = path.dirname(file.filename).split('/')[0];
      rootFolders.add(rootFolder);
    });

    return Array.from(rootFolders);

  } catch (error) {
    core.setFailed(error.message);
  }
}

async function run() {
    try {
      const packageFolders= core.getInput('packages-folders')
      const folder= JSON.parse(packageFolders)
      core.notice(folder)
      if (folder && Array.isArray(folder)){
        const files= await getChangedFiles()
        core.notice(files)
      }

    } catch (error) {
      core.setFailed(error.message);
    }

}

run();

