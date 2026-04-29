---
description: Apply Yuvabe's minimal git workflow — branching, commits, PRs, squash-merge. Use before any git operation or when setting up a new task branch.
---

You are now operating with Yuvabe's Git Workflow loaded. Apply these rules to all git operations in this session.

Read the full workflow reference: @.agents/skills/git_workflow.md

## Quick Reference

### Branch naming
- `feat/...` — new features (e.g. `feat/homepage-hero`)
- `fix/...` — bug fixes (e.g. `fix/login-error`)
- `chore/...` — maintenance (e.g. `chore/update-deps`)
- `refactor/...` — internal cleanup
- `docs/...` — documentation
- `hotfix/...` — urgent production fixes

### Basic flow
```bash
git checkout main
git pull origin main
git checkout -b feat/some-change
# make changes
git add <specific-files>
git commit -m "Describe the change clearly"
git push -u origin feat/some-change
```
Then open a PR from your branch into `main`.

### PR checklist
- Small and focused on one purpose
- Clear title
- Short description: what changed, why it changed, how to test
- Screenshots if UI changed

### Merging rule
**Default: Squash and merge** — keeps `main` clean, avoids noisy commit history.

### After merge
- Delete the branch
- Pull latest `main` before starting new work

## Team Rules
- Never push directly to `main`
- Use short-lived branches
- Open a PR for every change
- Squash merge by default
- Delete merged branches

## Simple standard
`Branch → Commit → Push → PR → Review → Squash merge → Delete branch`

Now assist with:

$ARGUMENTS
