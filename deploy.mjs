import { execSync } from "child_process";

function run(cmd) {
  console.log(`> ${cmd}`);
  try {
    const out = execSync(cmd, { cwd: "C:/Users/しんたに/Downloads/voyage-hp", encoding: "utf8", stdio: "pipe" });
    if (out.trim()) console.log(out.trim());
    return out;
  } catch (e) {
    console.log("STDERR:", e.stderr?.trim());
    console.log("STDOUT:", e.stdout?.trim());
    throw e;
  }
}

// Set git config locally
run('git config user.email "shintani@voyage.co.jp"');
run('git config user.name "shintaniAI"');

// Commit
run('git add -A');
run('git commit -m "Initial commit: VOYAGE HP"');

// Create GitHub repo and push
try {
  const result = run('gh repo create voyage-hp --public --source=. --push');
  console.log("REPO CREATED:", result);
} catch (e) {
  console.log("Repo creation may have failed, trying push...");
  try {
    run('git remote add origin https://github.com/shintaniAI/voyage-hp.git');
  } catch (_) {}
  run('git push -u origin main');
}

console.log("DONE - Now deploying to Vercel or Pages...");
