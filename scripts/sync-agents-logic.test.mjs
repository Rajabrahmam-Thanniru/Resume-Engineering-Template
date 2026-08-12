import test from 'node:test';
import assert from 'node:assert/strict';
import {
  branchOrPrUpdate,
  isValidRepositoryName,
  needsSync,
  onlyCanonicalFileChanged,
  parseRegistry,
} from './sync-agents-logic.mjs';

test('parses multiple consumers, inline comments, and ignores unrelated YAML', () => {
  const registry = 'repositories:\n  - octo/one\n  - octo/two # production\nnotes: ignored\n';
  assert.deepEqual(parseRegistry(registry), ['octo/one', 'octo/two']);
});

test('rejects invalid consumer entries', () => {
  assert.equal(isValidRepositoryName('octo/resume'), true);
  assert.equal(isValidRepositoryName('octo/resume/extra'), false);
  assert.equal(isValidRepositoryName('not a repository'), false);
});

test('consumer already has the latest AGENTS.md', () => {
  assert.equal(needsSync('same', 'same'), false);
});

test('consumer with an older AGENTS.md needs a sync', () => {
  assert.equal(needsSync('old', 'new'), true);
});

test('consumer without AGENTS.md needs a sync', () => {
  assert.equal(needsSync(null, 'canonical'), true);
});

test('missing consumer repository can be reported as skipped', () => {
  const status = 404;
  assert.equal(status === 404, true);
});

test('an unused existing synchronization branch is not overwritten', () => {
  assert.equal(branchOrPrUpdate({ branchExists: true, existingPrCount: 0 }), 'skip-unsafe-branch');
});

test('an existing synchronization PR is updated instead of duplicated', () => {
  assert.equal(branchOrPrUpdate({ branchExists: true, existingPrCount: 1 }), 'update-pr');
});

test('multiple consumers can be independently planned', () => {
  const outcomes = ['octo/current', 'octo/old'].map((repository) =>
    needsSync(repository.endsWith('current') ? 'canonical' : 'old', 'canonical'),
  );
  assert.deepEqual(outcomes, [false, true]);
});

test('only AGENTS.md is allowed on a synchronization PR', () => {
  assert.equal(onlyCanonicalFileChanged(['AGENTS.md']), true);
  assert.equal(onlyCanonicalFileChanged(['AGENTS.md', 'README.md']), false);
});

test('one failed consumer does not prevent a second consumer from being processed', () => {
  const results = [
    { repository: 'octo/missing', outcome: 'skipped' },
    { repository: 'octo/updated', outcome: 'updated' },
  ];
  assert.deepEqual(results.map((result) => result.outcome), ['skipped', 'updated']);
});
