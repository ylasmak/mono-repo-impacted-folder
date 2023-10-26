// Import necessary dependencies
const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    const token = core.getInput('github-token');
    const pull_number = core.getBooleanInput('pull_request_id')
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

