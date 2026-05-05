---
name: git-workflow
description: Apply Yuvabe's minimal git workflow — branching strategy, commits, pull requests, and squash-merge rules. Use before any git operation or when setting up a new task branch.
---

You are now operating with Yuvabe's Git Workflow loaded. Apply these rules to all git operations in this session.

Read the full workflow reference: @.agents/skills/git_workflow.md

> Note: The git workflow reference lives in `.agents/skills/git_workflow.md` as it is shared across all agents.

## Branch Naming

- `feat/...` — new features (e.g. `feat/homepage-hero`)
- `fix/...` — bug fixes (e.g. `fix/login-error`)
- `chore/...` — maintenance (e.g. `chore/update-deps`)
- `refactor/...` — internal cleanup
- `docs/...` — documentation
- `hotfix/...` — urgent production fixes

## Basic Flow

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

## Pull Request Checklist

- Small and focused on one purpose
- Clear title
- Short description: what changed, why it changed, how to test
- Screenshots if UI changed
- Use draft PR when work is still in progress

## Merging Rule

**Default: Squash and merge** — keeps `main` clean, avoids noisy commit history.
Use merge commit or rebase only when there is a clear reason.

## After Merge

- Delete the branch after merge
- Pull latest `main` before starting new work

## Team Rules

- Never push directly to `main`
- Use short-lived branches
- Open a PR for every change
- Squash merge by default
- Delete merged branches

## Simple Standard

`Branch → Commit → Push → PR → Review → Squash merge → Delete branch`

Now assist with:

$ARGUMENTS
