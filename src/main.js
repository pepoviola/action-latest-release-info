const core = require("@actions/core");
const github = require("@actions/github");

async function run() {
    try {
        let githubToken = process.env.GITHUB_TOKEN;
        const octokit = github.getOctokit(githubToken)

        const {owner, repo} = github.context.repo;
        const releaseInfo = await octokit.repos.getLatestRelease({
            owner,
            repo
        });

        let releaseId = releaseInfo.data.id.toString();
        let htmlUrl = releaseInfo.data.html_url;
        let uploadUrl = releaseInfo.data.upload_url;
        let tagName = releaseInfo.data.tag_name;
        let name = releaseInfo.data.name;
        let createdAt = releaseInfo.data.created_at;
        let draft = releaseInfo.data.draft

        console.log(`Got release info: '${name}', '${tagName}', '${releaseId}', '${htmlUrl}', '${uploadUrl}', '${createdAt}', 'draft:${draft}'`);

        core.setOutput("id", releaseId);
        core.setOutput("html_url", htmlUrl);
        core.setOutput("upload_url", uploadUrl);
        core.setOutput("tag_name", tagName);
        core.setOutput("created_at", createdAt);
        core.setOutput("name", name);
        core.setOutput("draft", draft)
    } catch (error) {
        console.log(error);
        core.setFailed(error.message);
    }
}

if (require.main === module) {
    run();
}
