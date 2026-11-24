# Junie (JetBrains)

Junie is JetBrains' coding agent, in JetBrains IDEs and as Junie CLI. Both
read the same MCP file.

## Add it by hand

Add this to `~/.junie/mcp/mcp.json` to use it in every project, or to
`.junie/mcp/mcp.json` at the root of a project:

```json
{
  "mcpServers": {
    "buildbase": {
      "url": "https://api.console.buildbase.app/mcp"
    }
  }
}
```

There is no API key or header. The project file can be committed: it holds
only the URL, so each teammate signs in as themselves.

## Sign in

1. Run `/mcp`. `buildbase` shows **Authorization required**.
2. Select it and choose **Authorize**. The BuildBase sign-in page opens in
   your browser.
3. Sign in with your BuildBase account and approve the access request.
4. Back in `/mcp`, the status reads **Active**.

## Check it works

> List my BuildBase organizations.

## Known limits

- Junie waits 60 seconds for each reply. A large blueprint plan or apply can
  take longer: add `"timeout": 300000` (five minutes, in milliseconds) to the
  entry. Junie accepts 1000 to 3600000.
- A project server Junie has not approved yet, for example one that arrived
  with `git pull`, shows **Approval required**. Check the URL, then choose
  **Approve**.
- If the server shows **Failed** or **Inactive**, fix the entry, then select
  it in `/mcp` and choose **Reconnect**.
- If the agent says the organization does not let agents in, an owner or
  admin of that organization changes its **AI agents** setting in the console,
  under **Security**. Under **Read only** (the default) agents can read but
  not change anything.

---

Source: [Junie, Add and configure MCP servers](https://junie.jetbrains.com/docs/junie-cli-mcp-configuration.html), read 2026-11-24.
