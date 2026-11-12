# Installing the BuildBase MCP server (instructions for AI agents)

You are helping a person connect their AI client to BuildBase. BuildBase runs a
hosted MCP server. There is nothing to clone, build, install or run.

| Setting | Value |
| --- | --- |
| Server name | `buildbase` |
| URL | `https://api.console.buildbase.app/mcp` |
| Transport | Streamable HTTP |
| Authentication | OAuth sign-in in the person's browser |

## Rules

- Never ask the person for a password, API key or token. Never put one in a
  config file. The server needs no API key and no header.
- If a config file already exists, add the `buildbase` entry to it. Do not
  remove or change other entries.
- Do not run any package or script from this repository. Only edit the
  client's config, or run the client's own command shown below.

## Step 1: find the client

Work out which client the person is using. If you are not sure, ask them.

## Step 2: add the server

**Cline** (`cline_mcp_settings.json`; in the extension, MCP Servers > Configure
> Configure MCP Servers):

```json
{
  "mcpServers": {
    "buildbase": {
      "type": "streamableHttp",
      "url": "https://api.console.buildbase.app/mcp",
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

The `type` must be `streamableHttp`. In the Cline CLI:
`cline mcp add buildbase https://api.console.buildbase.app/mcp --transport http --yes`

**Claude Code:**

```bash
claude mcp add --transport http buildbase https://api.console.buildbase.app/mcp
```

**Cursor** (`~/.cursor/mcp.json`, or `.cursor/mcp.json` in a project):

```json
{
  "mcpServers": {
    "buildbase": {
      "url": "https://api.console.buildbase.app/mcp"
    }
  }
}
```

**VS Code with GitHub Copilot** (`~/.copilot/mcp-config.json`, or `.mcp.json`
at the workspace root):

```json
{
  "mcpServers": {
    "buildbase": {
      "type": "http",
      "url": "https://api.console.buildbase.app/mcp",
      "tools": ["*"]
    }
  }
}
```

**Codex:**

```bash
codex mcp add buildbase --url https://api.console.buildbase.app/mcp
```

**Gemini CLI:**

```bash
gemini mcp add -s user --transport http buildbase https://api.console.buildbase.app/mcp
```

**claude.ai, Claude Desktop, ChatGPT, Lovable, v0 and Raycast** are set up in
their own settings screens. You cannot edit a file for them. Give the person
the steps from the matching guide in [docs/clients](docs/clients/).

**Any other client:** see [docs/clients/other.md](docs/clients/other.md).

## Step 3: ask the person to sign in

Tell the person to finish the sign-in in their browser:

| Client | How sign-in starts |
| --- | --- |
| Cline CLI | `cline mcp`, then **Authorize OAuth** |
| Claude Code | `/mcp` in a session, then select `buildbase` |
| Cursor | Select the server where Cursor says it needs sign-in |
| VS Code | **Authenticate** in the server's actions |
| Codex | `codex mcp login buildbase` |
| Gemini CLI | Starts on first use, or `/mcp auth buildbase` |

They sign in with their own BuildBase account and approve the access request.
You never see their password.

## Step 4: ask the person to check agent access

Each BuildBase organization decides whether AI agents may use it. Owners and
admins set this in **Console > Account > Security**: off, read only (the
default) or read and write. If a tool says agent access is off, the person
needs an owner or admin of that organization to turn it on.

## Step 5: check it works

Call `list_orgs`, or ask the agent:

> List my BuildBase organizations.

If the person belongs to more than one organization and did not name one, ask
which one to use.
