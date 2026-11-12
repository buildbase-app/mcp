# Codex

Codex reads MCP servers from `~/.codex/config.toml`. The Codex CLI, the IDE
extension and the ChatGPT desktop app share that file.

## Add it

From your terminal:

```bash
codex mcp add buildbase --url https://api.console.buildbase.app/mcp
```

Or add this to `~/.codex/config.toml` yourself:

```toml
[mcp_servers.buildbase]
url = "https://api.console.buildbase.app/mcp"
```

A project can use `.codex/config.toml` instead, for trusted projects only.

**Desktop app or IDE extension:** open **MCP servers** in settings, select
**Add server**, enter the name `buildbase`, choose Streamable HTTP, enter the
URL above and save. Restart, then select **Authenticate**.

## Sign in

```bash
codex mcp login buildbase
```

Your browser opens the BuildBase sign-in page. Sign in with your BuildBase
account and approve the access request. On a machine without a browser, add
`--no-browser`, open the printed link elsewhere and paste the full redirect URL
back.

## Check it works

Start Codex and ask:

> List my BuildBase organizations.

`/mcp` in the Codex TUI lists the server and its tools.

## Known limits

- You can choose when Codex asks before running a tool with
  `default_tools_approval_mode` in the server's config section.
- If the agent says agent access is off, an owner or admin of that organization
  turns it on in **Console > Account > Security**.

---

Source: [Codex, MCP](https://learn.chatgpt.com/docs/extend/mcp) and
[Codex config reference](https://learn.chatgpt.com/docs/config-file/config-reference), read 2026-11-12.
