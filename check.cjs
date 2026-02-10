const fs = require("fs");
const os = require("os");
const path = require("path");
const home = os.homedir();
const f = path.join(home, "Downloads", "voyage-hp", "public", "line-info-asset-v2.png");
console.log("exists:", fs.existsSync(f));
if (fs.existsSync(f)) {
  const s = fs.statSync(f);
  console.log("size:", s.size);
}
