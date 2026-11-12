# ChatGPT (custom MCP server)

Add BuildBase to ChatGPT as your own custom MCP server. ChatGPT used to call
this developer mode.

## Where to add it

1. Go to [chatgpt.com/plugins](https://chatgpt.com/plugins).
2. Select the **+** button, then **Add custom MCP server**.
3. Enter the name `BuildBase`.
4. Under **Connection**, set **Server URL** to
   `https://api.console.buildbase.app/mcp`.
5. Set **Authentication** to **OAuth**.
6. Read the risk warning and select **I understand and want to continue**.
7. Select **Create as a plugin**.

If you don't see **Add custom MCP server**, your workspace admin may need to
give you the **Create plugins with MCPs** permission. Some accounts still need
**Developer mode** turned on under **Settings > Security and login**.

## Sign in

ChatGPT opens the BuildBase sign-in page. Sign in with your BuildBase account
and approve the access request.

## Use it

Find BuildBase under your personal plugins, install it, start a chat, type `@`
and pick BuildBase.

## Check it works

> List my BuildBase organizations.

## Known limits

- ChatGPT asks you to confirm write actions before they run. BuildBase also
  asks for approval in the chat before deleting things, changing members or
  roles, moving money or changing sign-in settings.
- Use ChatGPT on the web to add the server.
- After the server changes, open it at chatgpt.com/plugins and select
  **Refresh**.
- If the agent says agent access is off, an owner or admin of that organization
  turns it on in **Console > Account > Security**.

---

Sources, read 2026-11-12:
[Add custom MCP server](https://developers.openai.com/api/docs/guides/custom-mcp-server),
[Connect from ChatGPT](https://developers.openai.com/plugins/deploy/connect-chatgpt).
