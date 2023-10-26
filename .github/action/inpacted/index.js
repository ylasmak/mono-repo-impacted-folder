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
    const changedFolder=response.data.map(file => path.dirname(file.filename).split('/')[0]);
    return changedFolder;
    // Analyze the files and detect impacted folders
    // Your logic for detecting impacted folders goes here

   // core.setOutput('impacted-folders', impactedFolders);
  } catch (error) {
    core.setFailed(error.message);
  }
}

async function run() {
    const files= await getChangedFiles()
    core.notice(files)
   
}

run();

