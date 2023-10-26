// Import necessary dependencies
const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    const token = core.getInput('github-token');
    const client = github.getOctokit(token).rest;

    // Get the pull request information
    const { owner, repo, pull_number } = github.context.issue;

    // Get the pull request files
    core.notice("Get the pull request files")
    core.notice(pull_number)
    const response = await client.pulls.listFiles({
      owner,
      repo,
      pull_number,
    });
    core.notice("Done")
    const files = response.data;
    core.notice(files)
    // Analyze the files and detect impacted folders
    // Your logic for detecting impacted folders goes here

   // core.setOutput('impacted-folders', impactedFolders);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();

