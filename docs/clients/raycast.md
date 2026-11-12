# Raycast

Raycast connects to remote MCP servers over HTTP and handles the OAuth sign-in
itself. Raycast lists MCP as a Pro feature.

## Mac and Windows

1. Run the **Install MCP Server** command (or **Manage MCP Servers > Install
   New Server**).
2. Fill in the form:

   | Field | Value |
   | --- | --- |
   | Name | `BuildBase` |
   | Transport | HTTP |
   | URL | `https://api.console.buildbase.app/mcp` |
   | OAuth Type | Dynamic |

3. Press **Install MCP Server**.

## iOS

1. Go to **Account Avatar > AI > MCP Servers** and tap **Plus**.
2. Enter the name `BuildBase`, the URL `https://api.console.buildbase.app/mcp`
   and OAuth Type **Dynamic**.
3. Tap **Save**.

## Sign in

Select **Sign In** on the server. Raycast opens the BuildBase sign-in page.
Sign in with your BuildBase account and approve the access request. To sign
out later, use **Manage MCP Servers > Logout Server**.

## Check it works

In AI Chat, mention the BuildBase server and ask:

> List my BuildBase organizations.

## Known limits

- Raycast approves read-only tools automatically and asks before the others.
  BuildBase also asks for approval in the chat before deleting things, changing
  members or roles, moving money or changing sign-in settings.
- If the agent says agent access is off, an owner or admin of that organization
  turns it on in **Console > Account > Security**.

---

Source: [Raycast Manual, Model Context Protocol](https://manual.raycast.com/ai/model-context-protocol), read 2026-11-12.
