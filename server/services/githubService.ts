import axios from "axios";

export async function fetchRepoInfo(repoUrl: string) {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const headers = GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {};

  // Parse repo URL: https://github.com/owner/repo
  const parts = repoUrl.replace("https://github.com/", "").split("/");
  if (parts.length < 2) throw new Error("Invalid GitHub URL");
  
  const owner = parts[0];
  const repo = parts[1];

  const [repoDataResult, readmeDataResult, treeDataResult, languagesDataResult] = await Promise.allSettled([
    axios.get(`https://api.github.com/repos/${owner}/${repo}`, { headers }),
    axios.get(`https://api.github.com/repos/${owner}/${repo}/readme`, { headers }),
    axios.get(`https://api.github.com/repos/${owner}/${repo}/contents`, { headers }),
    axios.get(`https://api.github.com/repos/${owner}/${repo}/languages`, { headers }),
  ]);

  const repoData = repoDataResult.status === 'fulfilled' ? repoDataResult.value.data : null;
  const readmeData = readmeDataResult.status === 'fulfilled' ? readmeDataResult.value.data : null;
  const treeData = treeDataResult.status === 'fulfilled' ? treeDataResult.value.data : [];
  const languagesData = languagesDataResult.status === 'fulfilled' ? languagesDataResult.value.data : {};

  if (!repoData) {
    throw new Error("Could not fetch repository information. Please verify the URL and permissions.");
  }

  let readmeContent = "";
  if (readmeData && readmeData.content) {
    try {
      readmeContent = Buffer.from(readmeData.content, "base64").toString("utf-8");
    } catch (e) {
      console.warn("Failed to decode README content");
    }
  }

  // Ensure treeData is an array. GitHub contents API returns an array for directories,
  // but a single object if the path is a file (though we don't pass a path here).
  const safeTree = Array.isArray(treeData) 
    ? treeData.map((f: any) => ({ path: f.path, type: f.type }))
    : [];

  return {
    owner,
    repo,
    fullName: repoData.full_name || `${owner}/${repo}`,
    description: repoData.description || "",
    stars: repoData.stargazers_count || 0,
    readme: readmeContent,
    tree: safeTree,
    languages: languagesData ? Object.keys(languagesData) : [],
  };
}
