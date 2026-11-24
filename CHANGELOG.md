# Changelog

All notable changes to this repository are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project uses [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
The version here is the version of the listing. It matches `server.json` and
every plugin manifest.

## [Unreleased]

### Added

- `README.md` catches up with the live server (2026-11-24): the tool table
  lists all 20 tools, adding `get_api_operation` (the exact contract of one
  HTTP API operation); new sections cover the scopes (`console:read`,
  `console:write`, and `console:export` / `console:destructive` asked for only
  when a task needs one), connecting a CI job with an organization API key, and
  the claimable organization a coding agent can create with no account
  (`claim_link`, `npx @buildbase/sdk init --claim`). Quick start leads with
  `npx @buildbase/sdk agent setup --console`, which adds the server to every
  AI tool it finds.
- `llms-install.md` names the one-command setup (only with the person's
  go-ahead) and explains the scopes and the per-change approvals.
- Client guides for Windsurf (Devin Desktop), Zed, Junie, Goose, Bolt and
  Replit, each checked against the vendor's own page on 2026-11-24, linked
  from the README and `llms-install.md`, with their sources in
  `MAINTENANCE.md` section 2.

- `MAINTENANCE.md` section 9 records the directory submissions made on
  2026-11-12 (Glama, LobeHub, Cline, GitHub MCP Registry, mcpservers.org,
  MCP Market)
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

### Changed

- The organization setting is named as the console names it: **Security**,
  **AI agents**, with **Off**, **Read only** (the default) and **Read and
  change**. It was "Console > Account > Security" with "read and write" in the
  README, `llms-install.md` and every client guide.
- `docs/clients/claude.md`: the custom connector needs **Register
  automatically** under OAuth client; **Use Claude's published identity**
  fails against BuildBase's authorization server. The README troubleshooting
  list says so too.

- `MAINTENANCE.md` section 9: the Glama listing is claimed, verified by the
  DNS TXT record at `_glama-claim.buildbase.app`.

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
