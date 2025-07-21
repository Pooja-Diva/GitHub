const fs = require("fs");
const path = require("path");
const axios = require("axios");
const supabase = require("../supabase");

async function pullRepo({ commitID }) {
  const localCommitPath = path.resolve(".myGit", "commits", commitID);
  fs.mkdirSync(localCommitPath, { recursive: true });

  const { data: fileList, error: listError } = await supabase.storage
    .from("commits")
    .list(`commits/${commitID}`);

  if (listError) {
    console.error(" Error listing commit files:", listError.message);
    return;
  }

  for (const file of fileList) {
    const { data: fileURL } = await supabase.storage
      .from("commits")
      .getPublicUrl(`commits/${commitID}/${file.name}`);

    const res = await axios.get(fileURL.publicUrl, { responseType: "arraybuffer" });
    fs.writeFileSync(path.join(localCommitPath, file.name), res.data);
    console.log(` Downloaded ${file.name}`);
  }

  console.log("All files pulled from Supabase.");
}

module.exports = { pullRepo };
