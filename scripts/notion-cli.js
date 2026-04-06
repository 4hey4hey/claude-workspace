#!/usr/bin/env node

const path = require("path");
const { spawn } = require("child_process");

require("dotenv").config();

const binName = process.platform === "win32" ? "ntn.cmd" : "ntn";
const cliPath = path.join(__dirname, "..", "node_modules", ".bin", binName);
const cliArgs = process.argv.slice(2);

const child = spawn(cliPath, cliArgs, {
  stdio: "inherit",
  env: process.env,
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 1);
});

child.on("error", (error) => {
  console.error("Failed to start Notion CLI:", error.message);
  process.exit(1);
});
