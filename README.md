# BuildBase MCP server

Work in the BuildBase console as yourself: read and change your organizations, members, content, email, workflows and settings, and set an organization up from a blueprint, within your role and what each organization allows AI agents to do.

[![check](https://github.com/buildbase-app/mcp/actions/workflows/check.yml/badge.svg)](https://github.com/buildbase-app/mcp/actions/workflows/check.yml)
[![MCP Badge](https://lobehub.com/badge/mcp/buildbase-app-mcp)](https://lobehub.com/mcp/buildbase-app-mcp)

## Endpoint

```text
https://api.console.buildbase.app/mcp
```

Streamable HTTP. Sign in with your BuildBase account (OAuth). Nothing to
install, no API key.

## Quick start

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

| Group | Tools | Purpose |
| --- | --- | --- |
| Account | `whoami`, `list_orgs`, `open_org` | Who you are, your organizations, pick one |
| Console reads | `console_catalog`, `console_get` | Discover and read console data |
| Console changes | `console_write`, `console_destructive_change` | Change data; destructive changes need approval |
| New organization | `create_org`, `claim_link` | Create an organization, get a claim link |
| Blueprints | `blueprint_schema`, `blueprint_validate`, `blueprint_plan`, `blueprint_export`, `blueprint_apply` | Describe an org setup as a file, check it, plan it, apply it |
| Developer help | `search_docs`, `fetch_doc`, `get_env_template` | Docs search and env templates for building with the SDK |
| Exports | `start_export`, `get_export_status` | Export data |

## Access and safety

Agent access is set per organization by its owners and admins in
**Console > Account > Security**: off, read only (the default) or read and
write. The agent acts as the signed-in person, within that person's role.
Deleting things, changing members or roles, moving money and changing sign-in
settings ask for the person's approval in the chat first. Secrets are never
returned to the agent.

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
| Any other client | [docs/clients/other.md](docs/clients/other.md) |

AI agents installing the server for someone can follow
[llms-install.md](llms-install.md).

## Troubleshooting

- **401 or "unauthorized":** sign in again. In Claude Code run `/mcp`, in
  Codex `codex mcp login buildbase`, in Gemini CLI `/mcp auth buildbase`. Other
  clients have a sign-in or authenticate action on the server.
- **"Agent access is off":** an owner or admin of that organization turns it
  on in **Console > Account > Security**.
- **The agent can read but not change anything:** the organization allows
  read only. An owner or admin can switch it to read and write.
- **A tool is refused for your role:** the agent can do only what your role
  in that organization allows.
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
