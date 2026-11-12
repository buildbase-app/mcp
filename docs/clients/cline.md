# Cline

BuildBase is a hosted server. There is nothing to clone, build or run.

## In the editor extension

1. In the Cline panel, select the **MCP Servers** icon and open the
   **Configure** tab.
2. Open **Remote Servers**.
3. Enter the server name `buildbase` and the URL
   `https://api.console.buildbase.app/mcp`.
4. Choose **Streamable HTTP** and select **Add Server**.

Or select **Configure MCP Servers** and add this to the settings file:

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

Keep `"type": "streamableHttp"`. Without it Cline uses the older SSE transport.

## In the Cline CLI

```bash
cline mcp add buildbase https://api.console.buildbase.app/mcp --transport http --yes
```

## Sign in

There is no API key or header. Sign-in is OAuth in your browser. In the CLI,
run `cline mcp` and choose **Authorize OAuth** for `buildbase`. Sign in with
your BuildBase account and approve the access request.

## Check it works

> List my BuildBase organizations.

## Known limits

- Cline's current docs describe OAuth sign-in for the Cline CLI. They do not
  say how the editor extension signs in to remote servers. If the extension
  cannot sign in, use the CLI or another client.
- If the agent says agent access is off, an owner or admin of that organization
  turns it on in **Console > Account > Security**.

---

Sources, read 2026-11-12:
[Cline, MCP overview](https://docs.cline.bot/mcp/mcp-overview),
[Cline CLI reference](https://docs.cline.bot/cli/cli-reference).
