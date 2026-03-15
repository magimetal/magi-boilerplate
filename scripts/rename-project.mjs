#!/usr/bin/env node

import { promises as fs } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const DEFAULT_FROM_NAME = 'magi-boilerplate';
const DEFAULT_FROM_SCOPE = '@magi-boilerplate';
const SCRIPT_RELATIVE_PATH = 'scripts/rename-project.mjs';

const IGNORED_DIRECTORIES = new Set([
  '.git',
  'node_modules',
  'dist',
  'coverage',
  '.angular',
  '.pnpm-store',
]);

function parseArgs(argv) {
  const args = {
    dryRun: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];

    if (token === '--dry-run') {
      args.dryRun = true;
      continue;
    }

    if (token === '--help' || token === '-h') {
      args.help = true;
      continue;
    }

    if (!token.startsWith('--')) {
      throw new Error(`Unknown positional argument: ${token}`);
    }

    const [flag, inlineValue] = token.split('=');
    let value = inlineValue;

    if (value === undefined) {
      value = argv[i + 1];
      i += 1;
    }

    if (!value || value.startsWith('--')) {
      throw new Error(`Missing value for ${flag}`);
    }

    switch (flag) {
      case '--name':
        args.name = value;
        break;
      case '--scope':
        args.scope = value;
        break;
      case '--from-name':
        args.fromName = value;
        break;
      case '--from-scope':
        args.fromScope = value;
        break;
      default:
        throw new Error(`Unknown flag: ${flag}`);
    }
  }

  return args;
}

function printUsage() {
  console.log(`Rename boilerplate identity across the repository.

Usage:
  pnpm rename:project --name <new-name> [--scope @new-scope] [--dry-run]
  pnpm rename:project --name my-app --scope @my-org

Options:
  --name        New unscoped project name (required)
  --scope       New package scope (default: @<name>)
  --from-name   Source project name (default: ${DEFAULT_FROM_NAME})
  --from-scope  Source package scope (default: ${DEFAULT_FROM_SCOPE})
  --dry-run     Show what would change without writing files
  --help        Show this message
`);
}

function ensureValidScope(scope) {
  if (!scope.startsWith('@')) {
    throw new Error(`Scope must start with "@". Received: ${scope}`);
  }
}

function looksBinary(buffer) {
  const sampleSize = Math.min(buffer.length, 2048);

  for (let i = 0; i < sampleSize; i += 1) {
    if (buffer[i] === 0) {
      return true;
    }
  }

  return false;
}

async function collectFiles(directoryPath) {
  const entries = await fs.readdir(directoryPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(directoryPath, entry.name);

    if (entry.isDirectory()) {
      if (IGNORED_DIRECTORIES.has(entry.name)) {
        continue;
      }

      const nested = await collectFiles(fullPath);
      files.push(...nested);
      continue;
    }

    if (entry.isFile()) {
      files.push(fullPath);
    }
  }

  return files;
}

function replaceContent(content, fromName, toName, fromScope, toScope) {
  // Replace scope first so custom target scopes work correctly.
  return content.split(fromScope).join(toScope).split(fromName).join(toName);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.help) {
    printUsage();
    return;
  }

  if (!args.name) {
    throw new Error('Missing required flag: --name');
  }

  const root = process.cwd();
  const scriptAbsolutePath = path.resolve(root, SCRIPT_RELATIVE_PATH);
  const toName = args.name;
  const toScope = args.scope ?? `@${toName}`;
  const fromName = args.fromName ?? DEFAULT_FROM_NAME;
  const fromScope = args.fromScope ?? DEFAULT_FROM_SCOPE;

  ensureValidScope(toScope);
  ensureValidScope(fromScope);

  if (fromName === toName && fromScope === toScope) {
    console.log('No rename needed: source and target values are identical.');
    return;
  }

  console.log(`Renaming project identity:`);
  console.log(`- name:  ${fromName} -> ${toName}`);
  console.log(`- scope: ${fromScope} -> ${toScope}`);
  console.log(`- mode:  ${args.dryRun ? 'dry-run' : 'write'}`);

  const files = await collectFiles(root);
  const changedFiles = [];

  for (const filePath of files) {
    if (path.resolve(filePath) === scriptAbsolutePath) {
      continue;
    }

    const buffer = await fs.readFile(filePath);

    if (looksBinary(buffer)) {
      continue;
    }

    const content = buffer.toString('utf8');

    if (!content.includes(fromName) && !content.includes(fromScope)) {
      continue;
    }

    const updated = replaceContent(content, fromName, toName, fromScope, toScope);

    if (updated === content) {
      continue;
    }

    if (!args.dryRun) {
      await fs.writeFile(filePath, updated, 'utf8');
    }

    changedFiles.push(path.relative(root, filePath));
  }

  if (changedFiles.length === 0) {
    console.log('No files contained the source project identity.');
    return;
  }

  console.log(`${args.dryRun ? 'Would update' : 'Updated'} ${changedFiles.length} files:`);
  for (const file of changedFiles) {
    console.log(`- ${file}`);
  }

  if (!args.dryRun) {
    console.log('\nNext steps:');
    console.log('- Run: pnpm install');
    console.log('- Run: pnpm lint && pnpm test');
    console.log('- Review git diff before committing');
  }
}

main().catch((error) => {
  console.error(`\nrename-project failed: ${error.message}`);
  process.exitCode = 1;
});
