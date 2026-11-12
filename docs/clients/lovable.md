# Lovable

Connect BuildBase to Lovable as a custom MCP server. Lovable uses it in the
project chat and in Chats. It is never part of the app you publish.

## Where to add it

**Connectors > Add custom > MCP server**

If **MCP server** is grayed out, a workspace admin has turned off the
**Custom MCP** setting.

## Settings

| Field | Value |
| --- | --- |
| Server name | `BuildBase` |
| Server URL | `https://api.console.buildbase.app/mcp` |
| Authentication | OAuth |

Leave **Connection** on **Direct connection** if Lovable shows it.

## Sign in

Select **Add & authorize**. Your browser opens the BuildBase sign-in page. Sign
in with your BuildBase account and approve the access request. Each Lovable
user connects with their own BuildBase account.

## Check it works

In a project chat, ask:

> Using the BuildBase connector, list my BuildBase organizations.

## Known limits

- The connection works in the chat only. The app you build in Lovable cannot
  call these tools.
- Tools that change data ask for your approval in the chat before they run.
- If the agent says agent access is off, an owner or admin of that organization
  turns it on in **Console > Account > Security**.

---

Source: [Lovable, Connect a custom MCP server](https://docs.lovable.dev/integrations/custom-mcp), read 2026-11-12.
