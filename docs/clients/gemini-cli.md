# Gemini CLI

## As an extension

```bash
gemini extensions install https://github.com/buildbase-app/mcp
```

This installs the `buildbase` extension from this repository. Restart Gemini
CLI afterwards. Update it later with `gemini extensions update buildbase`.

## As an MCP server

```bash
gemini mcp add -s user --transport http buildbase https://api.console.buildbase.app/mcp
```

Leave out `-s user` to add it to the current project only. Or add it to
`~/.gemini/settings.json` yourself:

```json
{
  "mcpServers": {
    "buildbase": {
      "httpUrl": "https://api.console.buildbase.app/mcp"
    }
  }
}
```

## Sign in

The first time Gemini CLI connects, it finds the BuildBase sign-in page,
registers itself and opens your browser. Sign in with your BuildBase account and
approve the access request. To sign in again, run `/mcp auth buildbase`.

## Check it works

> List my BuildBase organizations.

`/mcp` lists the server and its tools.

## Known limits

- Sign-in needs a browser on the same machine. It does not work over SSH
  without a display, or in a container without a browser.
- If the agent says agent access is off, an owner or admin of that organization
  turns it on in **Console > Account > Security**.

---

Sources, read 2026-11-12:
[Gemini CLI extensions](https://geminicli.com/docs/extensions/),
[Extension reference](https://geminicli.com/docs/extensions/reference),
[MCP servers with Gemini CLI](https://geminicli.com/docs/tools/mcp-server).
