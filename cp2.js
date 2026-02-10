// Copy line-info-asset-v2.png to public folder
const fs = require("fs");
const os = require("os");
const path = require("path");

const home = os.homedir();
const srcDir = path.join(home, ".cursor", "projects", "c-Users-Downloads-voyage-hp", "assets");
const dstDir = path.join(home, "Downloads", "voyage-hp", "public");

const file = "line-info-asset-v2.png";
const src = path.join(srcDir, file);
const dst = path.join(dstDir, file);

console.log("Home:", home);
console.log("Source:", src);
console.log("Source exists:", fs.existsSync(src));
console.log("Dest dir:", dstDir);
console.log("Dest dir exists:", fs.existsSync(dstDir));

if (fs.existsSync(src)) {
  const data = fs.readFileSync(src);
  fs.writeFileSync(dst, data);
  console.log("Written", data.length, "bytes");
  console.log("Dest exists:", fs.existsSync(dst));
} else {
  console.log("Source file not found!");
}
