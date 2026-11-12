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
| Dependabot | `.github/dependabot.yml` | [Dependabot options reference](https://docs.github.com/en/code-security/reference/supply-chain-security/dependabot-options-reference) | 2026-11-12 | yes |

Notes from the last read:

- `gemini-extension.json` uses `httpUrl`, which every Gemini CLI version reads.
  Newer versions prefer `url` with `"type": "http"`. Switch once older
  versions are gone.
- Cursor documents no `displayName` or `author.url` in its plugin manifest, so
  `.cursor-plugin/plugin.json` leaves them out.
- VS Code plans to remove the `.vscode/mcp.json` format in February 2027. The
  guide leads with the newer `mcpServers` format.
- Tested on 2026-11-12 with Gemini CLI 0.66.0: installing this repository
  with `gemini extensions install` installs the `buildbase` extension
  (the folder takes the manifest name, not the repository name),
  `gemini extensions validate` passes, and `gemini mcp list` shows the server
  as `http` at the endpoint. Sign-in was not tested there, since it needs a
  browser.
- Not yet tested end to end: sign-in from v0 and from the Cline editor
  extension.

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

- [ ] Review the monthly Dependabot pull request for GitHub Actions. Check
      each action's release notes, then merge it once `check` passes.
- [ ] Re-read every source in section 2. Update any manifest or guide that
      moved, and the "Read" dates.
- [ ] Triage open issues.
- [ ] Check that the Glama, Smithery, mcpservers.org and MCP Market pages
      still show the right name, description, endpoint and links.

## 5. Quarterly

- [ ] Search the main directories for duplicate or wrong BuildBase listings.
      Ask them to fix or merge.
- [ ] Check that every claim in `README.md` still matches the live server.

## 6. Publishing to the MCP Registry

The registry entry is `app.buildbase/console`. Published versions cannot be
edited or deleted, so every publish needs a new version (section 3).

### The signing key

- The private key is `~/buildbase-mcp-registry/key.pem` on the owner's
  machine, outside every repository, with a copy in the team password
  manager. Never print it, commit it, or paste it into a chat, issue or CI log.
- Its public key is a TXT record on the apex `buildbase.app`, added on
  2026-11-12:
  `v=MCPv1; k=ed25519; p=gps6CZWOmwm1AxU6R+JLBg0i3oLR66QLFbInvp1t9GY=`
  If that record is removed, sign-in to the registry fails until it is back.
- The key proves control of `buildbase.app`, so it can publish any name under
  `app.buildbase/*`. Another BuildBase MCP server reuses the same key and
  record: no new key, no new DNS record.

### First time only: create the key and the DNS record

Already done for `buildbase.app`. Repeat this only for a new domain, or to
replace a lost or leaked key.

1. Install the publisher:

   ```bash
   brew install mcp-publisher
   ```

   Without Homebrew, follow the install steps in the
   [registry quickstart](https://modelcontextprotocol.io/registry/quickstart).
2. Make a folder outside every repository:

   ```bash
   mkdir -p ~/buildbase-mcp-registry && cd ~/buildbase-mcp-registry
   ```

3. Check OpenSSL. `openssl version` must say OpenSSL 3, not LibreSSL. On a Mac
   that says LibreSSL, run `brew install openssl@3` and use
   `$(brew --prefix openssl@3)/bin/openssl` wherever these steps say `openssl`.
4. Generate the key and lock down its permissions:

   ```bash
   openssl genpkey -algorithm Ed25519 -out key.pem && chmod 600 key.pem
   ```

5. Print the DNS value. This prints only the public key:

   ```bash
   echo "v=MCPv1; k=ed25519; p=$(openssl pkey -in key.pem -pubout -outform DER | tail -c 32 | base64)"
   ```

6. In Cloudflare, open `buildbase.app`, then **DNS > Records > Add record**:

   | Field | Value |
   | --- | --- |
   | Type | `TXT` |
   | Name | `@` |
   | Content | the line printed in step 5 |
   | TTL | Auto |

   Add a new record. Keep the existing TXT records (SPF, Zoho and Google
   verification).
7. Save `key.pem` in the team password manager.
8. Wait for the record to appear. Cloudflare's resolver shows it within a
   minute; Google's can take 5 to 10 minutes.

   ```bash
   dig +short TXT buildbase.app
   ```

   Without `dig`:

   ```bash
   curl -s -H 'accept: application/dns-json' 'https://cloudflare-dns.com/dns-query?name=buildbase.app&type=TXT'
   ```

To replace a key: generate a new one, add its record, publish with it, then
delete the old record.

### Every publish

1. Go to the key folder and download `server.json` from `main`:

   ```bash
   cd ~/buildbase-mcp-registry && curl -sSLo server.json https://raw.githubusercontent.com/buildbase-app/mcp/main/server.json && cat server.json
   ```

   Check the name, version and endpoint.
2. Validate it, if your `mcp-publisher` has the command:

   ```bash
   mcp-publisher validate server.json
   ```

3. Sign in and publish in one command. A registry login lasts only a few
   minutes, so never leave a gap between the two. Publishing is the step that
   cannot be undone.

   ```bash
   cd ~/buildbase-mcp-registry && PRIVATE_KEY="$(openssl pkey -in key.pem -noout -text | awk '/^priv:/{f=1;next} /^pub:/{f=0} f' | tr -d ' :\n')" && { [ ${#PRIVATE_KEY} -eq 64 ] || { echo "key length is ${#PRIVATE_KEY}, expected 64"; false; }; } && mcp-publisher login dns --domain buildbase.app --private-key "$PRIVATE_KEY" && unset PRIVATE_KEY && mcp-publisher publish; unset PRIVATE_KEY
   ```

   It reads the key out of `key.pem` and stops unless it is 64 characters,
   without printing it. It then signs in ("Successfully logged in"), clears
   the key from the shell, and publishes. If any step fails, the ones after it
   do not run, and the last `unset` clears the key anyway. On any error, look
   it up in the table below, then run the whole command again.
4. Verify:

   ```bash
   curl -s "https://registry.modelcontextprotocol.io/v0.1/servers?search=app.buildbase/console&version=latest"
   ```

5. Record the listing in section 9 through a pull request.

### Errors we have seen

| Error | Cause | Fix |
| --- | --- | --- |
| `invalid hex private key format: encoding/hex: invalid byte: U+0070 'p'` | The key was read with an older `grep -A3` command that also picked up the `pub:` line | Use the command in step 3, which reads the key with `awk` and checks the length is 64 |
| `TLS handshake timeout` on publish | A network problem on the way to the registry. Nothing was published | Run the step 3 command again, on another network or without a VPN if it repeats |
| `401 ... Invalid or expired Registry JWT token ... token is expired` | The login is only valid for a few minutes, and too much time passed before `publish`. Nothing was published | Run the whole step 3 command again, so sign-in and publish happen together |
| A DNS or verification error at sign-in | The TXT record is not visible yet | Wait 5 minutes and run the step 3 command again |

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
| MCP Registry | [app.buildbase/console](https://registry.modelcontextprotocol.io/v0.1/servers/app.buildbase%2Fconsole/versions/latest) | 2026-11-12 (version 1.0.0) | DNS sign-in for `buildbase.app` (key in the team password manager) | @dharmendra-buildbase |

## 10. Setting up a connector repository from scratch

How this repository was set up, as steps to repeat for another BuildBase MCP
server, or to rebuild this one. Replace `buildbase-app/mcp`, the endpoint and
the names with the new ones.

### Create the repository

1. Create it public and empty (no README, license or `.gitignore`, so the
   first commit is yours):

   ```bash
   gh repo create buildbase-app/mcp --public --description "Connect AI agents to BuildBase with its hosted MCP server" --homepage https://docs.buildbase.app/console/ai-agents
   ```

2. Copy this repository's files into it and change, everywhere they appear:
   - the endpoint, and `ENDPOINT`, `HOST` and `TITLE` in `scripts/check.mjs`;
   - `name`, `title` and `description` in `server.json`;
   - the plugin names and descriptions in every manifest;
   - `README.md`, the client guides, `llms-install.md`, `CHANGELOG.md`,
     `.github/CODEOWNERS` and section 1 of this file.
3. Re-read the format sources in section 2 before you trust any manifest
   shape. They change often.
4. Check everything:

   ```bash
   node scripts/check.mjs
   ```

   ```bash
   claude plugin validate . --strict
   ```

5. Commit as yourself with GitHub's private noreply address, so your email
   stays out of the public history. Find your ID with
   `gh api user --jq .id`:

   ```bash
   git config user.name "<your GitHub login>"
   git config user.email "<id>+<login>@users.noreply.github.com"
   ```

6. Make the first commit on `main` and push it. Every later change goes
   through a branch and a pull request.

### Repository settings

Run these as an owner or admin of the organization:

```bash
gh repo edit buildbase-app/mcp --visibility public --accept-visibility-change-consequences --description "Connect AI agents to BuildBase with its hosted MCP server" --homepage https://docs.buildbase.app/console/ai-agents --add-topic mcp,mcp-server,model-context-protocol,remote-mcp,claude-code-plugin,cursor-plugin,codex-plugin,gemini-cli-extension,buildbase,saas --enable-wiki=false --enable-projects=false --enable-issues=true
```

```bash
gh api -X PATCH repos/buildbase-app/mcp -f 'security_and_analysis[secret_scanning][status]=enabled' -f 'security_and_analysis[secret_scanning_push_protection][status]=enabled'
```

```bash
gh api -X PUT repos/buildbase-app/mcp/private-vulnerability-reporting
```

```bash
gh api -X PUT repos/buildbase-app/mcp/vulnerability-alerts
```

The `gemini-cli-extension` topic is what lists the repository in the
[Gemini CLI gallery](https://geminicli.com/extensions), within a day.
Topics should describe the repository truthfully: no topic that claims a
store listing the repository does not have.

In **Settings > Actions > General**:

- Fork pull request workflows from outside collaborators: **Require approval
  for first-time contributors** (or stricter).
- Workflow permissions: **Read repository contents and packages permissions**.
- Untick **Allow GitHub Actions to create and approve pull requests**.

### Protect `main`, after CI is green

Turn this on only once `check` passes on `main`. Before that it would block
the pull request that fixes it.

In **Settings > Rules > Rulesets > New ruleset > New branch ruleset**:

1. Name `main`, enforcement status **Active**, empty bypass list.
2. Target branches: **Add target > Include default branch**.
3. Rules: **Restrict deletions**, **Block force pushes**, **Require a pull
   request before merging** (required approvals `0` while there is one
   maintainer), and **Require status checks to pass** with the `check` check.
4. **Create**.

### Verify the settings

```bash
gh api repos/buildbase-app/mcp --jq '.security_and_analysis'
```

```bash
gh api repos/buildbase-app/mcp/private-vulnerability-reporting
```

```bash
gh api -i repos/buildbase-app/mcp/vulnerability-alerts | head -1
```

```bash
gh api repos/buildbase-app/mcp/rulesets
```

Expect `secret_scanning` and `secret_scanning_push_protection` to be
`enabled`, `{"enabled": true}`, `HTTP/2.0 204 No Content`, and a ruleset
named `main`.

### Publish

Publish to the MCP Registry with section 6. A server under `app.buildbase/*`
reuses the existing key and DNS record, so skip "First time only".
