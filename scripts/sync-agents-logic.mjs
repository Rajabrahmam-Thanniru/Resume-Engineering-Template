const REPOSITORY_ENTRY = /^\s*-\s*([A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+)(?:\s+#.*)?\s*$/gm;

export function parseRegistry(text) {
  return [...text.matchAll(REPOSITORY_ENTRY)].map((match) => match[1]);
}

export function isValidRepositoryName(fullName) {
  return /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(fullName);
}

export function needsSync(current, canonical) {
  return current !== canonical;
}

export function branchOrPrUpdate({ branchExists, existingPrCount }) {
  if (existingPrCount > 0) return 'update-pr';
  if (branchExists) return 'skip-unsafe-branch';
  return 'create-branch-and-pr';
}

export function onlyCanonicalFileChanged(paths) {
  return paths.length > 0 && paths.every((path) => path === 'AGENTS.md');
}
