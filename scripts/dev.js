import { spawn } from "node:child_process";

const npm = process.platform === "win32" ? "npm.cmd" : "npm";
const commands = [
  ["backend", ["run", "dev", "--prefix", "backend"]],
  ["frontend", ["run", "dev", "--prefix", "frontend"]]
];

const children = commands.map(([name, args]) => {
  const child = spawn(npm, args, {
    stdio: "inherit",
    shell: process.platform === "win32",
    windowsHide: false
  });
  child.on("exit", (code) => {
    if (code) console.error(`${name} exited with code ${code}`);
  });
  return child;
});

function stop() {
  for (const child of children) child.kill();
  process.exit(0);
}

process.on("SIGINT", stop);
process.on("SIGTERM", stop);
