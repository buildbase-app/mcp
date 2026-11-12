# Changelog

All notable changes to this repository are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project uses [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
The version here is the version of the listing. It matches `server.json` and
every plugin manifest.

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
