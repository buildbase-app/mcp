# Claude (claude.ai, Claude Desktop, Claude Code)

## claude.ai and Claude Desktop

Add BuildBase as a custom connector. The steps are the same on the web and in
the desktop app.

1. Open **Customize > Connectors**. In the desktop app, select **Customize** in
   the sidebar, then **Connectors**.
2. Select **Add**, then **Add custom connector**.
3. Enter the name `BuildBase` and the URL `https://api.console.buildbase.app/mcp`,
   then select **Continue**.
4. Keep the authentication options marked **Detected**. If you are asked to
   choose an OAuth client, choose **Register automatically**.
5. Select **Add**, then **Connect**.

Or open this link to fill in the name and URL for you:
[Add BuildBase to Claude](https://claude.ai/customize/connectors?modal=add-custom-connector&connectorName=BuildBase&connectorUrl=https%3A%2F%2Fapi.console.buildbase.app%2Fmcp)

**Team and Enterprise:** an Owner adds the connector under
**Organization settings > Connectors > Add > Custom > Web**. Members then find
it in **Customize > Connectors** and select **Connect**.

**Mobile:** add the connector on the web or in the desktop app. It is then
available in the Claude mobile apps too.

### Sign in

When you select **Connect**, the BuildBase sign-in page opens in your browser.
Sign in with your BuildBase account and approve the access request.

## Claude Code

Pick one of these.

**As a plugin** (run inside Claude Code):

```text
/plugin marketplace add buildbase-app/mcp
/plugin install buildbase@buildbase
```

**As an MCP server** (run in your terminal):

```bash
claude mcp add --transport http buildbase https://api.console.buildbase.app/mcp
```

Add `--scope user` to use it in every project, or `--scope project` to write it
to the project's `.mcp.json` and share it with your team.

### Sign in

In a Claude Code session, run `/mcp`, select `buildbase` and follow the steps
in your browser. From the terminal you can also run `claude mcp login buildbase`.
Claude Code stores and refreshes the token for you.

Non-interactive runs (`claude -p`) cannot open the sign-in page. Sign in once
in an interactive session first.

## Check it works

Ask Claude:

> List my BuildBase organizations.

## Known limits

- Claude Desktop adds remote servers through **Connectors**. Its
  `claude_desktop_config.json` file is for local servers.
- If the agent says agent access is off, an owner or admin of that organization
  turns it on in **Console > Account > Security**.

---

Sources, read 2026-11-12:
[Add a connector that isn't in the directory](https://claude.com/docs/connectors/custom/add-unlisted),
[Claude Code MCP](https://code.claude.com/docs/en/mcp),
[Create a plugin marketplace](https://code.claude.com/docs/en/plugins/create-marketplace),
[Plugin manifest reference](https://code.claude.com/docs/en/plugins/manifest-reference).
