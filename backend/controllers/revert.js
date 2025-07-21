const fs = require("fs");
const path = require("path");

function revertRepo({ commitID }) {
  const commitPath = path.resolve(".myGit", "commits", commitID);

  if (!fs.existsSync(commitPath)) {
    console.error(`Commit ${commitID} does not exist locally.`);
    return;
  }

  const files = fs.readdirSync(commitPath);

  for (const file of files) {
    if (file === "commit.json") continue; // Skip metadata

    const src = path.join(commitPath, file);
    const dest = path.resolve(file); // Overwrite in current dir

    fs.copyFileSync(src, dest);
    console.log(`Reverted ${file}`);
  }

  console.log(`Reverted to commit ${commitID}`);
}

module.exports = { revertRepo };
