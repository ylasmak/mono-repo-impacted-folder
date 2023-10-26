// Import necessary dependencies
const core = require('@actions/core');
const github = require('@actions/github');
const path = require('path');

async function getChangedFolder() {
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
      const outputFolders = new Set();
      const packageFolders= JSON.parse(core.getInput('packages-folders'))
      core.notice(packageFolders)
      if (packageFolders && Array.isArray(packageFolders)){
        const folders= await getChangedFolder()
        folders.forEach(folder => {
          if (packageFolders.includes(folder)) {
            outputFolders.add(folder);
          }
        })
        var output= JSON.stringify(Array.from(outputFolders))


        core.notice(output)
        core.setOutput("change-folders",output)
      }

    } catch (error) {
      core.setFailed(error.message);
    }

}

run();

