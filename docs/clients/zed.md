# Zed

## Add it in Zed

1. Open **Settings > AI > MCP Servers**, or run **agent: open settings** and
   select **MCP Servers**.
2. Select **Add Server**, then **Add Remote Server**.
3. Enter the name `buildbase` and the URL
   `https://api.console.buildbase.app/mcp`. Add no headers.

Or add it to your settings file yourself (**zed: open settings file**), under
`context_servers`:

```json
{
  "context_servers": {
    "buildbase": {
      "url": "https://api.console.buildbase.app/mcp"
    }
  }
}
```

## Sign in

When a remote server has no `Authorization` header, Zed signs in with the
standard MCP OAuth flow. It opens the BuildBase sign-in page in your browser.
Sign in with your BuildBase account and approve the access request.

## Check it works

Open **Settings > AI > MCP Servers**. A green dot with the tooltip "Server is
active" means Zed is connected. Then, in the Agent Panel, ask:

> List my BuildBase organizations.

Naming BuildBase in a prompt helps the model pick its tools.

## Known limits

- Zed asks before every tool call unless you change
  `agent.tool_permissions.default` from `"confirm"`. To let BuildBase's reads
  run without asking, allow them one by one with keys in the form
  `mcp:buildbase:<tool>`:

  ```json
  {
    "agent": {
      "tool_permissions": {
        "tools": {
          "mcp:buildbase:list_orgs": { "default": "allow" },
          "mcp:buildbase:console_get": { "default": "allow" }
        }
      }
    }
  }
  ```

  Keep `console_write`, `console_destructive_change`, `create_org` and
  `blueprint_apply` on `"confirm"`, and never set the global default to
  `"allow"` with BuildBase connected.
- An entry with an `Authorization` header never opens the sign-in page.
- When a BuildBase tool refuses something, Zed shows the server's message in
  the agent's reply.
- If the agent says the organization does not let agents in, an owner or
  admin of that organization changes its **AI agents** setting in the console,
  under **Security**. Under **Read only** (the default) agents can read but
  not change anything.

---

Sources, read 2026-11-24:
[Zed, Model Context Protocol](https://zed.dev/docs/ai/mcp),
[Zed, Tool Permissions](https://zed.dev/docs/ai/tool-permissions).
