# Central AGENTS.md synchronization

`AGENTS.md` is centrally maintained by this template repository. Consumer repositories receive changes through reviewable Pull Requests; they are never overwritten directly.

## Register a consumer

Edit `.github/template-consumers.yml` and add one fully qualified repository per line:

```yaml
repositories:
  - owner/new-resume-repository
```

Commit the registry change to the template default branch, or run **Actions → Sync AGENTS.md → Run workflow**.

The automatic trigger is intentionally limited to canonical `AGENTS.md` changes. After changing the registry, use the manual run to synchronize a newly registered consumer.

## How updates work

1. The template `AGENTS.md` changes on the default branch.
2. The GitHub Action reads the registry.
3. Each consumer's default branch and `AGENTS.md` are checked.
4. Identical files are skipped.
5. A difference creates or updates `chore/sync-agents-md`.
6. The action updates only `AGENTS.md` and opens or updates one Pull Request.
7. The consumer owner reviews and merges the PR.

Local edits to a consumer's `AGENTS.md` may be overwritten by a future synchronization PR. Other consumer files are outside the automation's scope.

If `chore/sync-agents-md` already exists without the matching open synchronization PR, the workflow skips that consumer rather than taking over a potentially user-owned branch. Likewise, it skips an existing synchronization PR that includes files other than `AGENTS.md`.

## Authentication and permissions

The workflow uses `secrets.TEMPLATE_SYNC_TOKEN` when configured, otherwise the workflow token. For cross-repository or private-repository access, configure a least-privileged fine-grained token or GitHub App token with:

- template repository: Contents read
- each consumer repository: Contents read/write and Pull requests read/write

Do not place tokens in workflow files. The action does not checkout, execute, install, or trust code from consumer repositories.

## Tests

Run the pure decision-logic tests with Node.js:

```text
node --test scripts/sync-agents-logic.test.mjs
```

The tests cover current files, older or missing files, registry parsing, and duplicate-PR prevention logic. End-to-end GitHub API behavior still requires a test repository and token.
