# BuildBase MCP server

Work in the BuildBase console as yourself: read and change your organizations, members, content, email, workflows and settings, and set an organization up from a blueprint, within your role and what each organization allows AI agents to do.

[![check](https://github.com/buildbase-app/mcp/actions/workflows/check.yml/badge.svg)](https://github.com/buildbase-app/mcp/actions/workflows/check.yml)
[![MCP Badge](https://lobehub.com/badge/mcp/buildbase-app-mcp)](https://lobehub.com/mcp/buildbase-app-mcp)

## Endpoint

```text
https://api.console.buildbase.app/mcp
```

Streamable HTTP. Sign in with your BuildBase account (OAuth). Nothing to
install, no API key. (A job with nobody to sign in can use an organization API
key instead: see [Connect with an API key](#connect-with-an-api-key).)

## Quick start

**Every AI tool on your computer, one command** (needs Node.js and
`@buildbase/sdk` 1.4.0 or later, which `npx` fetches):

```bash
npx @buildbase/sdk agent setup --console
```

It finds Claude Code, Cursor, VS Code, Codex, Windsurf, Gemini CLI, Goose and
Zed, shows what it will change, and after you confirm writes each tool's own
entry, named `buildbase-console`. It never removes or changes another server
and backs up each file first. `--dry-run` prints the plan and writes nothing;
`--only cursor,codex` picks tools. Each tool still signs you in with OAuth the
first time. Or add it by hand:

**Claude Code**

```bash
claude mcp add --transport http buildbase https://api.console.buildbase.app/mcp
```

Then run `/mcp` in Claude Code and sign in. Or install the plugin:
`/plugin marketplace add buildbase-app/mcp`, then
`/plugin install buildbase@buildbase`.

**Cursor**

[![Add BuildBase to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en/install-mcp?name=buildbase&config=eyJ1cmwiOiJodHRwczovL2FwaS5jb25zb2xlLmJ1aWxkYmFzZS5hcHAvbWNwIn0%3D)

**VS Code with GitHub Copilot**

[Install BuildBase in VS Code](https://vscode.dev/redirect?url=vscode%3Amcp%2Finstall%3F%257B%2522name%2522%253A%2522buildbase%2522%252C%2522type%2522%253A%2522http%2522%252C%2522url%2522%253A%2522https%253A%252F%252Fapi.console.buildbase.app%252Fmcp%2522%257D)

Every client signs in the same way: it opens the BuildBase sign-in page in your
browser, you sign in and approve. Guides for other clients are in
[docs/clients](docs/clients/).

## First prompt to try

> List my BuildBase organizations.

## What it can do

The server lists 20 tools.

| Group | Tools | Purpose |
| --- | --- | --- |
| Account | `whoami`, `list_orgs`, `open_org` | Who you are, your organizations and your role in each, pick an organization and environment |
| Console reads | `console_catalog`, `console_get` | Discover and read console data |
| Console changes | `console_write`, `console_destructive_change` | Create and change things; deletes, sends, member, role and webhook changes, money and real workflow runs need your approval |
| New organization | `create_org`, `claim_link` | Create an organization you own (with your approval); a claim link for one an agent created with no account |
| Blueprints | `blueprint_schema`, `blueprint_validate`, `blueprint_plan`, `blueprint_export`, `blueprint_apply` | Describe an organization's setup as a file, check it, plan it, apply the plan you were shown (owners and admins) |
| Developer help | `search_docs`, `fetch_doc`, `get_api_operation`, `get_env_template` | Search and read the BuildBase docs, the exact contract of one HTTP API operation, the environment variables an app needs |
| Exports | `start_export`, `get_export_status` | Export your audience and read the rows |

## Access and safety

- **Each organization decides.** Owners and admins choose in the console under
  **Security** (your avatar menu), **AI agents**: **Off**, **Read only** (the
  default) or **Read and change**. The setting applies to every agent at once.
- **The agent acts as you**, within your role in that organization. It never
  receives a secret, even one it creates, and it cannot change sign-in
  settings, credentials or the billing catalog.
- **Scopes.** A tool asks for `console:read` and `console:write` when it
  connects. `console:export` (lists of people, audience exports) and
  `console:destructive` are asked for only when a task needs one; the server
  answers `insufficient_scope` and your tool asks you to approve that scope.
- **Approvals.** Deleting, sending to an audience, changing members, roles or
  webhooks, moving money and running a workflow for real each wait for your
  approval of that one change.
- **You stay in control.** Every change is in the organization's audit log.
  In **Security**, owners and admins can block any member's agent and members
  can block their own; you can disconnect an agent at any time under
  **Security**, **Connected AI agents**.

## Connect with an API key

A job with nobody to sign in, such as CI or a scheduled script, can send one of
the organization's API keys as the bearer to the same endpoint. For example,
with Claude Code:

```bash
claude mcp add --transport http buildbase https://api.console.buildbase.app/mcp \
  --header "Authorization: Bearer $BUILDBASE_API_KEY"
```

The key works only in its own organization (or the environment it was issued
for), within its role, and the organization's **AI agents** setting still
applies. Keep the key in an environment variable or your CI's secret store,
never in a file you commit or a chat.

## An agent with no account

A coding agent can start before the person has a BuildBase account: it creates
a claimable organization and works in it with that organization's API key,
and the person claims it later. In an app, `npx @buildbase/sdk init --claim --yes`
does this and writes the keys to the app's local environment file. The agent
instructions are at [www.buildbase.app/auth.md](https://www.buildbase.app/auth.md).

- The agent gets an API key, a claim link and a claim code, once. The code
  lasts 15 minutes; `claim_link` gives a fresh one.
- Only a person can claim: they open the link, sign in or sign up, and type the
  code. The agent's key then stops working; connect the agent again as
  yourself.
- Until it is claimed the organization runs on low caps (sign-in and
  verification email only, no invitations, Stripe test keys), and it is deleted
  72 hours after it was created.

Details: [the claimable organization](https://docs.buildbase.app/console/ai-agents#an-agent-with-no-account-the-claimable-organization).

## Clients

| Client | Guide |
| --- | --- |
| Claude (claude.ai, Claude Desktop, Claude Code) | [docs/clients/claude.md](docs/clients/claude.md) |
| ChatGPT | [docs/clients/chatgpt.md](docs/clients/chatgpt.md) |
| Codex | [docs/clients/codex.md](docs/clients/codex.md) |
| Cursor | [docs/clients/cursor.md](docs/clients/cursor.md) |
| VS Code and GitHub Copilot | [docs/clients/vscode.md](docs/clients/vscode.md) |
| Gemini CLI | [docs/clients/gemini-cli.md](docs/clients/gemini-cli.md) |
| Cline | [docs/clients/cline.md](docs/clients/cline.md) |
| Lovable | [docs/clients/lovable.md](docs/clients/lovable.md) |
| v0 | [docs/clients/v0.md](docs/clients/v0.md) |
| Raycast | [docs/clients/raycast.md](docs/clients/raycast.md) |
| Windsurf (Devin Desktop) | [docs/clients/windsurf.md](docs/clients/windsurf.md) |
| Zed | [docs/clients/zed.md](docs/clients/zed.md) |
| Junie (JetBrains) | [docs/clients/junie.md](docs/clients/junie.md) |
| Goose | [docs/clients/goose.md](docs/clients/goose.md) |
| Bolt | [docs/clients/bolt.md](docs/clients/bolt.md) |
| Replit | [docs/clients/replit.md](docs/clients/replit.md) |
| Any other client | [docs/clients/other.md](docs/clients/other.md) |

AI agents installing the server for someone can follow
[llms-install.md](llms-install.md).

## Troubleshooting

- **401 or "unauthorized":** sign in again. In Claude Code run `/mcp`, in
  Codex `codex mcp login buildbase`, in Gemini CLI `/mcp auth buildbase`. Other
  clients have a sign-in or authenticate action on the server.
- **The organization does not let agents in:** its **AI agents** setting is
  **Off**, or your agent is blocked there. An owner or admin changes it under
  **Security**, **AI agents**.
- **The agent can read but not change anything:** the organization is set to
  **Read only**, or you did not grant `console:write`. An owner or admin can
  choose **Read and change**; then approve `console:write` when the tool asks.
- **A tool is refused for your role, or asks for the same scope again and
  again:** the agent can do only what your role in that organization allows,
  and approving a scope cannot get past your role or the organization's
  setting. Do it in the console, or ask an owner or admin.
- **Claude's sign-in fails before the BuildBase page opens:** the custom
  connector's **OAuth client** is set to Claude's published identity. Remove it
  and add it again with **Register automatically** ([Claude guide](docs/clients/claude.md)).
- **The client cannot sign in:** the client must support OAuth for remote
  servers. These cannot connect directly:
  - Claude Desktop's `claude_desktop_config.json`, which is for local servers.
    Add BuildBase under **Connectors** instead.
  - Clients that run only local (stdio) servers.
  - Clients that support only client ID metadata documents and not dynamic
    client registration.

  Cline's docs describe OAuth sign-in for the Cline CLI only. If the Cline
  editor extension cannot sign in, use the CLI.

Still stuck? Open a [connection problem](https://github.com/buildbase-app/mcp/issues/new?template=connection-problem.yml)
issue. Never paste a token or password.

## Links

- Docs: [docs.buildbase.app/console/ai-agents](https://docs.buildbase.app/console/ai-agents)
- Privacy: [www.buildbase.app/legal/privacy](https://www.buildbase.app/legal/privacy)
- Terms: [www.buildbase.app/legal/terms](https://www.buildbase.app/legal/terms)
- Support: support@buildbase.app or [www.buildbase.app/contact](https://www.buildbase.app/contact)
- Security: [SECURITY.md](SECURITY.md)
- Maintainers: [MAINTENANCE.md](MAINTENANCE.md) covers publishing to the MCP
  Registry, the signing key, repository settings and setting up a repository
  like this one from scratch.

## License

The files in this repository are under the [MIT License](LICENSE). The
BuildBase service itself is governed by the
[BuildBase Terms](https://www.buildbase.app/legal/terms).
