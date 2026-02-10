const fs = require("fs");
const os = require("os");
const path = require("path");

const home = os.homedir();
const srcDir = path.join(home, ".cursor", "projects", "c-Users-Downloads-voyage-hp", "assets");
const dstDir = path.join(home, "Downloads", "voyage-hp", "public");

const file = "line-info-asset-v2.png";
const src = path.join(srcDir, file);
const dst = path.join(dstDir, file);

console.log("Source exists:", fs.existsSync(src));
if (fs.existsSync(src)) {
  const data = fs.readFileSync(src);
  fs.writeFileSync(dst, data);
  console.log("OK -", data.length, "bytes");
} else {
  console.log("NOT FOUND");
}
