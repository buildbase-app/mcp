# Windsurf (Devin Desktop)

Windsurf is now Devin Desktop, and its local agent is Devin Local. Devin Local
uses the same MCP setup as Devin CLI, so these steps work for both.

## Add it by hand

Add this to `~/.config/devin/mcp_config.json` to use it in every project
(`%APPDATA%\devin\mcp_config.json` on Windows), or to `.devin/mcp_config.json`
in a project:

```json
{
  "mcpServers": {
    "buildbase": {
      "url": "https://api.console.buildbase.app/mcp",
      "transport": "http"
    }
  }
}
```

`"transport": "http"` is Streamable HTTP, which BuildBase speaks. There is no
API key or header. The project file is meant to be committed: it holds only
the URL, so each teammate signs in as themselves.

Then open the **Customize** page from the agent sidebar, choose **MCPs**, and
check that `buildbase` is listed under **This computer**.

## With Devin CLI

```bash
devin mcp add -s user buildbase https://api.console.buildbase.app/mcp
```

This writes the user file above. Use `-s project` to write
`.devin/mcp_config.json` instead. With no `-s`, the server goes to
`.devin/mcp_config.local.json`, which git ignores.

## Sign in

When `buildbase` shows **Needs authentication** in the **MCPs** tab, select
**Authenticate**. Your browser opens the BuildBase sign-in page. Sign in with
your BuildBase account and approve the access request. Devin registers itself
with BuildBase, so there is no client ID to fill in.

With Devin CLI, run `devin mcp login buildbase`. The token is stored on your
computer and refreshed for you.

## Check it works

Ask the agent:

> List my BuildBase organizations.

## Known limits

- By default the agent asks before it calls any MCP tool. You can allow one
  tool or a whole server; keep `console_write`, `console_destructive_change`,
  `create_org` and `blueprint_apply` on approval.
- Each MCP client keeps its own sign-in. Signing in from another tool does not
  sign in Devin Desktop.
- If the sign-in expires, the server shows **Needs authentication** again.
  **Authenticate** clears the stored sign-in and opens the browser again.
- Enterprise admins can limit which MCP servers are allowed.
- If the agent says the organization does not let agents in, an owner or
  admin of that organization changes its **AI agents** setting in the console,
  under **Security**. Under **Read only** (the default) agents can read but
  not change anything.

---

Sources, read 2026-11-24:
[Devin Local customizations, MCP servers](https://docs.devin.ai/desktop/devin-local/customizations),
[Devin Local permissions](https://docs.devin.ai/desktop/devin-local/permissions),
[Devin CLI, MCP configuration](https://docs.devin.ai/cli/extensibility/mcp/configuration),
[Devin Desktop FAQ](https://docs.devin.ai/desktop/devin-desktop-faq).
