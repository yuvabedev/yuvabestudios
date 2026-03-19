# Minimal Git Workflow Guide

## Branches

* `main` is the source of truth and should stay deployable.
* Do not work directly on `main`.
* Create a short-lived branch for each task.

### Branch naming

Use:

* `feat/...` for new features
* `fix/...` for bug fixes
* `chore/...` for maintenance
* `refactor/...` for internal cleanup
* `docs/...` for documentation
* `hotfix/...` for urgent production fixes

Examples:

* `feat/homepage-hero`
* `fix/login-error`
* `chore/update-deps`

## Basic flow

```bash
git checkout main
git pull origin main
git checkout -b feat/some-change
```

Make changes, then:

```bash
git add .
git commit -m "Describe the change clearly"
git push -u origin feat/some-change
```

Open a PR from your branch into `main`.

## Pull requests

A PR is the standard way to get changes into `main`.

Keep PRs:

* small
* focused on one purpose
* easy to review

A good PR should include:

* clear title
* short description of what changed
* why it changed
* how to test it
* screenshots if UI changed

## Draft PRs

Use a draft PR when the work is still in progress but you want visibility or early feedback.

Use a normal PR when the change is ready for review.

## Reviews

* At least one teammate should review before merge.
* Reviewer checks correctness, clarity, and obvious side effects.
* Keep comments practical and specific.

## Merging

Default: **Squash and merge**

Why:

* keeps `main` clean
* avoids noisy commit history
* works well for small teams

Use merge commit or rebase only when there is a clear reason.

## After merge

* Delete the branch after merge.
* Pull latest `main` before starting new work.

## Team rules

* Do not push directly to `main`
* Use short-lived branches
* Open a PR for every change
* Keep PRs small
* Squash merge by default
* Delete merged branches

## Simple standard

Branch -> Commit -> Push -> PR -> Review -> Squash merge -> Delete branch
