# Maintenance

How to keep this repository and the BuildBase listings correct for as long as
they exist.

## 1. Owner and backup

| Role | GitHub |
| --- | --- |
| Owner | @dharmendra-buildbase |
| Backup | not named yet |

The same people are in [.github/CODEOWNERS](.github/CODEOWNERS).

## 2. Format sources

Every manifest and client guide follows its owner's docs as read on the date
below. Re-read them monthly (section 4).

| Target | Files | Source | Read | Verified |
| --- | --- | --- | --- | --- |
| MCP Registry | `server.json` | [Quickstart](https://modelcontextprotocol.io/registry/quickstart), [Remote servers](https://modelcontextprotocol.io/registry/remote-servers), [Authentication](https://modelcontextprotocol.io/registry/authentication), [Versioning](https://modelcontextprotocol.io/registry/versioning), [schema 2025-12-11](https://static.modelcontextprotocol.io/schemas/2025-12-11/server.schema.json) | 2026-11-12 | yes |
| Claude Code plugin and marketplace | `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`, `.mcp.json` | [Plugins](https://code.claude.com/docs/en/plugins), [Manifest reference](https://code.claude.com/docs/en/plugins/manifest-reference), [Marketplace reference](https://code.claude.com/docs/en/plugins/marketplace-reference), [Create a marketplace](https://code.claude.com/docs/en/plugins/create-marketplace), [MCP](https://code.claude.com/docs/en/mcp) | 2026-11-12 | yes |
| Claude connectors | `docs/clients/claude.md` | [Connectors directory](https://claude.com/docs/connectors/directory), [Add an unlisted connector](https://claude.com/docs/connectors/custom/add-unlisted), [Authentication](https://claude.com/docs/connectors/building/authentication) | 2026-11-12 | yes |
| Codex and ChatGPT plugins | `.codex-plugin/plugin.json` | [Build plugins](https://developers.openai.com/plugins/build/plugins), [Submission](https://developers.openai.com/plugins/deploy/submission), [Plugin guidelines](https://developers.openai.com/plugins/plugin-guidelines), [Submission errors](https://developers.openai.com/plugins/deploy/submission-errors) | 2026-11-12 | yes |
| Codex MCP config | `docs/clients/codex.md` | [Codex MCP](https://learn.chatgpt.com/docs/extend/mcp), [Config reference](https://learn.chatgpt.com/docs/config-file/config-reference) | 2026-11-12 | yes |
| ChatGPT custom MCP server | `docs/clients/chatgpt.md` | [Add custom MCP server](https://developers.openai.com/api/docs/guides/custom-mcp-server), [Connect from ChatGPT](https://developers.openai.com/plugins/deploy/connect-chatgpt). The help center article on plans returned 403, so the guide names no plans. | 2026-11-12 | yes |
| Cursor | `.cursor-plugin/plugin.json`, `mcp.json`, `docs/clients/cursor.md` | [MCP](https://cursor.com/docs/mcp), [Plugins](https://cursor.com/docs/plugins), [Plugins reference](https://cursor.com/docs/reference/plugins), [Install links](https://cursor.com/docs/mcp/install-links) | 2026-11-12 | yes |
| VS Code and GitHub Copilot | `docs/clients/vscode.md` | [MCP servers](https://code.visualstudio.com/docs/agent-customization/mcp-servers), [MCP configuration](https://code.visualstudio.com/docs/agents/reference/mcp-configuration), [Install URLs](https://code.visualstudio.com/api/extension-guides/ai/mcp), [GitHub Docs](https://docs.github.com/en/copilot/how-tos/copilot-in-your-ide/customize-copilot/extend-copilot-with-tools-and-context/extend-copilot-chat-with-mcp) | 2026-11-12 | yes |
| Gemini CLI extension | `gemini-extension.json`, `docs/clients/gemini-cli.md` | [Extensions](https://geminicli.com/docs/extensions/), [Reference](https://geminicli.com/docs/extensions/reference), [Releasing](https://geminicli.com/docs/extensions/releasing), [MCP servers](https://geminicli.com/docs/tools/mcp-server), [Gallery](https://geminicli.com/extensions) | 2026-11-12 | yes |
| Cline | `llms-install.md`, `docs/clients/cline.md` | [cline/mcp-marketplace README](https://github.com/cline/mcp-marketplace), [MCP overview](https://docs.cline.bot/mcp/mcp-overview), [CLI reference](https://docs.cline.bot/cli/cli-reference) | 2026-11-12 | yes |
| Lovable | `docs/clients/lovable.md` | [Custom MCP](https://docs.lovable.dev/integrations/custom-mcp) | 2026-11-12 | yes |
| v0 | `docs/clients/v0.md` | [MCP Integrations](https://v0.app/docs/MCP) | 2026-11-12 | yes |
| Raycast | `docs/clients/raycast.md` | [Model Context Protocol](https://manual.raycast.com/ai/model-context-protocol), [MCP Registry extension](https://www.raycast.com/raycast/model-context-protocol-registry) | 2026-11-12 | yes |
| Any other client | `docs/clients/other.md` | [MCP authorization 2026-07-28](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization) | 2026-11-12 | yes |

Notes from the last read:

- `gemini-extension.json` uses `httpUrl`, which every Gemini CLI version reads.
  Newer versions prefer `url` with `"type": "http"`. Switch once older
  versions are gone.
- Cursor documents no `displayName` or `author.url` in its plugin manifest, so
  `.cursor-plugin/plugin.json` leaves them out.
- VS Code plans to remove the `.vscode/mcp.json` format in February 2027. The
  guide leads with the newer `mcpServers` format.
- Not yet tested end to end: sign-in from v0, from the Cline editor extension,
  and installing the Gemini CLI extension from this repository.

## 3. When the server changes

Do this when the server's name, title, description, endpoint, sign-in or tools
change.

- [ ] Update the tool table in `README.md` and any client guide that mentions
      the change.
- [ ] If the Server Card description changed, update the first paragraph of
      `README.md` and `interface.longDescription` in `.codex-plugin/plugin.json`.
- [ ] Bump the version in `CHANGELOG.md`, `server.json` and every manifest
      (`.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`,
      `.codex-plugin/plugin.json`, `.cursor-plugin/plugin.json`,
      `gemini-extension.json`).
- [ ] Run `node scripts/check.mjs`.
- [ ] Open a pull request and merge it.
- [ ] Republish to the MCP Registry (section 6).
- [ ] Tell the stores that need a resubmission when their reviewed details
      change: Claude, OpenAI, Cursor.

## 4. Monthly

- [ ] Re-read every source in section 2. Update any manifest or guide that
      moved, and the "Read" dates.
- [ ] Triage open issues.
- [ ] Check that the Glama, Smithery, mcpservers.org and MCP Market pages
      still show the right name, description, endpoint and links.

## 5. Quarterly

- [ ] Search the main directories for duplicate or wrong BuildBase listings.
      Ask them to fix or merge.
- [ ] Check that every claim in `README.md` still matches the live server.

## 6. Republishing to the MCP Registry

Published versions cannot be edited or deleted. Always bump the version first.

Run this outside every repository, in `~/buildbase-mcp-registry`, where
`key.pem` lives. The key is also in the team password manager. Never print it,
commit it or paste it anywhere.

1. Copy `server.json` from this repository into that folder.
2. Check it: `mcp-publisher validate server.json` (if your version has it).
3. Sign in with the DNS key and publish:

   ```bash
   PRIVATE_KEY="$(openssl pkey -in key.pem -noout -text | grep -A3 priv: | tail -n +2 | tr -d ' :\n')"
   mcp-publisher login dns --domain buildbase.app --private-key "$PRIVATE_KEY"
   unset PRIVATE_KEY
   mcp-publisher publish
   ```

4. Verify:
   `curl -s "https://registry.modelcontextprotocol.io/v0.1/servers?search=app.buildbase/console&version=latest"`

The DNS record is a TXT record on the apex `buildbase.app`:
`v=MCPv1; k=ed25519; p=<public key>`. If it is removed, sign-in to the
registry fails until it is added back.

## 7. Security reports

- Acknowledge within 3 business days.
- Fix in the server's own repository, not here.
- Never discuss details in public issues. If a report arrives as a public
  issue, thank the reporter, ask them to email support@buildbase.app with
  "SECURITY" in the subject, and remove the details from the issue.

## 8. Shutting down or moving

1. Mark the registry entry deprecated:
   `mcp-publisher status --status deprecated --message "<what to use instead>" app.buildbase/console`.
   Or publish a new version whose description says what changed.
2. Add a notice at the top of `README.md`.
3. Open issues or send emails to each directory in section 9.
4. Archive this repository last. Never delete it while listings point to it.

## 9. Listings

| Marketplace | Listing URL | Date listed | Account used | Owner |
| --- | --- | --- | --- | --- |
| MCP Registry | not listed yet | | | |
