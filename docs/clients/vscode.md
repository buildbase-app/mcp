# VS Code and GitHub Copilot

## One-click install

[Install BuildBase in VS Code](https://vscode.dev/redirect?url=vscode%3Amcp%2Finstall%3F%257B%2522name%2522%253A%2522buildbase%2522%252C%2522type%2522%253A%2522http%2522%252C%2522url%2522%253A%2522https%253A%252F%252Fapi.console.buildbase.app%252Fmcp%2522%257D)
or [VS Code Insiders](https://vscode.dev/redirect?url=vscode-insiders%3Amcp%2Finstall%3F%257B%2522name%2522%253A%2522buildbase%2522%252C%2522type%2522%253A%2522http%2522%252C%2522url%2522%253A%2522https%253A%252F%252Fapi.console.buildbase.app%252Fmcp%2522%257D)

The link opens VS Code with the server details so you can review them before
you install.

## Add it in VS Code

With Copilot selected, run **Chat: Open Customizations** and select
**MCP Servers**. Select **Add Server (+)**, choose **HTTP**, enter
`https://api.console.buildbase.app/mcp` and the ID `buildbase`, then select
**Global** and **Copilot Global**.

Or use a config file:

- **For all your workspaces:** `~/.copilot/mcp-config.json`
- **For your team:** `.mcp.json` at the workspace root

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

**Copilot CLI** reads the same file. To add it from the terminal:

```bash
copilot mcp add --transport http buildbase https://api.console.buildbase.app/mcp
```

### Older setups

The older `.vscode/mcp.json` file and `code --add-mcp` still work. VS Code
plans to remove that format in February 2027.

```json
{
  "servers": {
    "buildbase": {
      "type": "http",
      "url": "https://api.console.buildbase.app/mcp"
    }
  }
}
```

## Sign in

When the server needs sign-in, select **Authenticate** in its server actions.
VS Code opens the BuildBase sign-in page. Sign in with your BuildBase account
and approve the access request. Copilot CLI signs in separately.

## Check it works

In Copilot chat, ask:

> List my BuildBase organizations.

## Known limits

- On Copilot Business or Copilot Enterprise, the organization's
  "MCP servers in Copilot" policy must be on. It is off by default.
- Admins can limit MCP to registry servers or an allowlist.
- If the agent says agent access is off, an owner or admin of that BuildBase
  organization turns it on in **Console > Account > Security**.

---

Sources, read 2026-11-12:
[VS Code, MCP servers](https://code.visualstudio.com/docs/agent-customization/mcp-servers),
[VS Code, MCP configuration reference](https://code.visualstudio.com/docs/agents/reference/mcp-configuration),
[VS Code, MCP install URLs](https://code.visualstudio.com/api/extension-guides/ai/mcp),
[GitHub Docs, Extend Copilot Chat with MCP](https://docs.github.com/en/copilot/how-tos/copilot-in-your-ide/customize-copilot/extend-copilot-with-tools-and-context/extend-copilot-chat-with-mcp).
