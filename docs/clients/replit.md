# Replit

Connect BuildBase to Replit Agent as a custom MCP server. The agent uses its
tools while it builds. Your app cannot call them: it uses `@buildbase/sdk`
with its own keys.

## One-click install

[Add BuildBase to Replit](https://replit.com/integrations?mcp=eyJkaXNwbGF5TmFtZSI6IkJ1aWxkQmFzZSIsImJhc2VVcmwiOiJodHRwczovL2FwaS5jb25zb2xlLmJ1aWxkYmFzZS5hcHAvbWNwIn0=)

The link opens Replit with the name `BuildBase` and the URL filled in.

## Add it by hand

1. Open **Settings > Integrations > Your integrations**.
2. Select **Add custom**, then **Add personal MCP server**.
3. Enter the display name `BuildBase` and the URL
   `https://api.console.buildbase.app/mcp`.
4. Leave the custom headers under **Advanced settings** empty.
5. Select **Test & save**.

## Sign in

**Test & save** connects and walks you through the BuildBase sign-in. Sign in
with your BuildBase account and approve the access request. The server then
appears under **MCP Servers** with its status.

## Check it works

In a chat with Replit Agent, ask:

> Using the BuildBase MCP server, list my BuildBase organizations.

## Known limits

- A server you add is available in all your projects, not in one Repl.
- Tools that need confirmation ask before they run. BuildBase also waits for
  your approval before deleting things, sending to an audience, changing
  members, roles or webhooks, moving money or running a workflow for real.
- With a key in a custom header, Replit acts as that organization API key, not
  as you. Leave the headers empty.
- Custom MCP servers depend on what your account or workspace allows. If
  **Add custom** is missing from **Your integrations**, ask your workspace
  administrator.
- If the agent says the organization does not let agents in, an owner or
  admin of that organization changes its **AI agents** setting in the console,
  under **Security**. Under **Read only** (the default) agents can read but
  not change anything.

---

Sources, read 2026-11-24:
[Replit, Connect via MCP](https://docs.replit.com/build/connect-via-mcp),
[Replit, MCP servers and install links](https://docs.replit.com/features/mcp/overview).
