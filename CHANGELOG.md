# Changelog

All notable changes to this repository are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project uses [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
The version here is the version of the listing. It matches `server.json` and
every plugin manifest.

## [Unreleased]

### Added

- `MAINTENANCE.md` section 9 records the directory submissions made on
  2026-11-12 (Glama, Cline, GitHub MCP Registry, mcpservers.org, MCP Market)
  and the ones still to do. The monthly check follows up on them.

- `.github/dependabot.yml`: a monthly pull request that updates the pinned
  GitHub Actions, offering only releases at least 14 days old.
- `MAINTENANCE.md` records a real install of the Gemini CLI extension from
  this repository.

- `MAINTENANCE.md` section 6 is now the full MCP Registry runbook: creating
  the signing key and the DNS record, every publish, and the errors seen so
  far. New section 10 records how this repository was set up, as steps to
  repeat for another server. `README.md` links to it.
- `MAINTENANCE.md` section 9 records the MCP Registry listing
  `app.buildbase/console` 1.0.0, published on 2026-11-12.

### Fixed

- `scripts/check.mjs` warns instead of failing when claude.ai refuses an
  automated request (401, 403 or 429). claude.ai blocks requests from CI
  servers, but the link works in a browser. Every other link still fails on
  any error.
- `scripts/check.mjs` retries a link once more after a server error (5xx) or
  rate limit (429) before failing, so a brief outage does not open a drift
  issue.
- `scripts/check.mjs` also checks links to files in this repository.
- The daily check is no longer cancelled by a push to `main`.
- `MAINTENANCE.md`: the command that reads the registry key works on every
  OpenSSL version, checks the key length, and says what to do when `publish`
  fails on a network error.

## [1.0.0] - 2026-11-12

### Added

- First public release of the connector repository for the hosted BuildBase
  MCP server.
- README, setup guides for each supported client and `llms-install.md`.
- MCP Registry `server.json`.
- Plugin manifests for Claude Code, Codex, Cursor and Gemini CLI, with a
  shared `.mcp.json`.
- `scripts/check.mjs` and a daily GitHub Actions check that keeps this
  repository in sync with the live server.
- Security policy, contributing guide, issue and pull request templates.
