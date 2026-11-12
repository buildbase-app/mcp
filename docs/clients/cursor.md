# Cursor

## One-click install

[![Add BuildBase to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en/install-mcp?name=buildbase&config=eyJ1cmwiOiJodHRwczovL2FwaS5jb25zb2xlLmJ1aWxkYmFzZS5hcHAvbWNwIn0%3D)

The link opens Cursor with the server filled in. Review it and install.

## Add it by hand

Add this to `~/.cursor/mcp.json` to use it everywhere, or to
`.cursor/mcp.json` in a project:

```json
{
  "mcpServers": {
    "buildbase": {
      "url": "https://api.console.buildbase.app/mcp"
    }
  }
}
```

Remote servers need only the `url`. There is no API key or header.

## Sign in

Cursor shows that the server needs sign-in. Select it, and Cursor opens the
BuildBase sign-in page in your browser. Sign in with your BuildBase account and
approve the access request. Cursor renews the token for you.

With the Cursor CLI, run `agent mcp login buildbase`.

## Check it works

In Agent chat, ask:

> List my BuildBase organizations.

If something fails, open the Output panel and choose **MCP Logs**.

## Known limits

- Cloud Agents keep their own MCP sign-ins, separate from the desktop app.
- Enterprise admins can limit which remote MCP servers are allowed.
- If the agent says agent access is off, an owner or admin of that organization
  turns it on in **Console > Account > Security**.

---

Sources, read 2026-11-12: [Cursor, MCP](https://cursor.com/docs/mcp),
[Cursor, MCP install links](https://cursor.com/docs/mcp/install-links),
[Cursor CLI, MCP](https://cursor.com/docs/cli/mcp).
