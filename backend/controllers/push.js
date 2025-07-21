const fs = require("fs");
const path = require("path");
const mime = require("mime-types");
const supabase = require("../supabase.js");

async function pushRepo() {
  const commitsPath = path.resolve(".myGit", "commits");

  const commitIDs = fs.readdirSync(commitsPath);
  for (const commitID of commitIDs) {
    const commitDir = path.join(commitsPath, commitID);
    const files = fs.readdirSync(commitDir);

    for (const file of files) {
      const filePath = path.join(commitDir, file);
      const fileBuffer = fs.readFileSync(filePath);
      const contentType = mime.lookup(filePath) || "application/octet-stream";

      const { data, error } = await supabase.storage
        .from("commits")
        .upload(`commits/${commitID}/${file}`, fileBuffer, {
          contentType,
          upsert: true,
        });

      if (error) {
        console.error(`Failed to upload ${file}:`, error.message);
      } else {
        console.log(`Uploaded ${file} to commit ${commitID}`);
      }
    }
  }

  console.log("All commits pushed to Supabase.");
}
module.exports = { pushRepo };