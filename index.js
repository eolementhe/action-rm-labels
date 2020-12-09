//https://github.com/actions/toolkit/tree/main/packages/github

const core = require("@actions/core");
const github = require("@actions/github");

(async function () {
  try {
    const githubToken = core.getInput("github_token", { required: true });
    const labels = (core.getInput("labels", { required: true }) || "")
      .split(",")
      .filter((label) => label && label.length);

    if (labels.length === 0) {
      throw new Error('no label provided')
    }

    const octokit = github.getOctokit(githubToken);
    const contextRepo = github.context.repo;

    if (!contextRepo.owner || !contextRepo.repo) {
      throw new Error('No repo data')
    }

    for (const label of labels) {
      console.log(`Removing label ${label}`)
      try {
        await octokit.issues.removeLabel({
          name: label,
          owner: contextRepo.owner,
          repo: contextRepo.repo,
          issue_number: github.context.issue.number,
        });
        console.log(`Removed label "${label}"`)
      } catch (err) {
        console.log(`No label "${label}"`)
      }
    }
  } catch (e) {
    core.error(e);
    core.setFailed(e.message);
  }
})();
