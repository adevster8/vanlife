// scripts/fix-image-paths.mjs
// Fix any paths like ../assets/logo.png -> ../assets/images/logo.png
// Run dry run:   node scripts/fix-image-paths.mjs
// Apply changes: APPLY=1 node scripts/fix-image-paths.mjs

import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const EXTS = new Set([".ts", ".tsx", ".js", ".jsx"]);
const SKIP_DIRS = new Set(["node_modules", ".git", ".expo", "dist", "build", ".next", "ios", "android"]);

const isCodeFile = (p) => EXTS.has(path.extname(p));
const shouldSkipDir = (name) => SKIP_DIRS.has(name);

const filesToCheck = [];

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.lstatSync(full);
    if (stat.isDirectory()) {
      if (!shouldSkipDir(name)) walk(full);
    } else if (stat.isFile() && isCodeFile(full)) {
      filesToCheck.push(full);
    }
  }
}

// Insert "/images" immediately after any "/assets" that doesn't already have it
const imgExt = "(png|jpg|jpeg|webp|gif|svg)";
const requireRegex = new RegExp(
  `(require\\(\\s*['"])([^'"]*?/assets)(?!/images)(/[^'"]*?\\.${imgExt})(['"]\\s*\\))`,
  "g"
);
const importFromRegex = new RegExp(
  `(from\\s+['"])([^'"]*?/assets)(?!/images)(/[^'"]*?\\.${imgExt})(['"])`,
  "g"
);
const stringSrcRegex = new RegExp(
  `(['"])([^'"]*?/assets)(?!/images)(/[^'"]*?\\.${imgExt})(['"])`,
  "g"
);

function fixContent(src) {
  let changed = false;
  const replacer = (match, p1, p2, p3, p4) => {
    changed = true;
    return `${p1}${p2}/images${p3}${p4}`;
  };

  // Apply in order; already-correct paths won't match due to (?!/images)
  let out = src.replace(requireRegex, replacer);
  out = out.replace(importFromRegex, replacer);
  out = out.replace(stringSrcRegex, (m, q1, a, rest, q2) => {
    // Avoid changing random strings not used for images in code… only replace if inside JSX-ish context
    // We’ll still correct them since they’re clearly an image path.
    changed = true;
    return `${q1}${a}/images${rest}${q2}`;
  });

  return { out, changed };
}

function main() {
  walk(ROOT);

  const applying = !!process.env.APPLY;
  let totalChanged = 0;
  let totalFiles = 0;

  for (const file of filesToCheck) {
    totalFiles++;
    const src = fs.readFileSync(file, "utf8");
    const { out, changed } = fixContent(src);
    if (changed) {
      totalChanged++;
      console.log(`➡️  Fix: ${path.relative(ROOT, file)}`);
      if (applying) {
        fs.writeFileSync(file, out, "utf8");
      }
    }
  }

  if (!applying) {
    console.log("\nDry run complete.");
    console.log(`Scanned: ${totalFiles} files`);
    console.log(`Would change: ${totalChanged} file(s)`);
    console.log('To apply changes, run:  APPLY=1 node scripts/fix-image-paths.mjs\n');
  } else {
    console.log("\nApplied changes.");
    console.log(`Scanned: ${totalFiles} files`);
    console.log(`Changed: ${totalChanged} file(s)\n`);
  }
}

main();
