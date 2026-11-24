# Bolt

Connect BuildBase to Bolt as a custom connector. Bolt uses its tools while it
builds. The app Bolt builds cannot call them: it uses `@buildbase/sdk` with
its own keys.

## Where to add it

In the chatbox on the Bolt homepage, select **+**, then
**Connectors > Manage connectors**. On the **Connectors (MCP)** page, select
**Custom MCP server**.

## Settings

| Field | Value |
| --- | --- |
| Name | `BuildBase` |
| URL | `https://api.console.buildbase.app/mcp` |
| Transport type | HTTP |
| Authentication | MCP OAuth |

BuildBase speaks Streamable HTTP, so SSE does not connect.

## Sign in

Select **Connect**. Bolt opens the BuildBase sign-in page. Sign in with your
BuildBase account and approve the access request. A **Connected** status
appears when Bolt has access.

## Turn it on for a project

**Auto-enable for all projects** turns the connector on in every new project.
Leave it off to use BuildBase only where you need it: in a project's chatbox,
select **+**, then **Connectors**, and turn on the toggle next to BuildBase.

## Check it works

In a project chat, ask:

> List my BuildBase organizations.

## Known limits

- The tools you turn on or off in the connector apply to every project. To
  stop Bolt changing anything, select the connector, open the three-dot menu,
  choose **Edit** and turn off `console_write`, `console_destructive_change`,
  `create_org` and `blueprint_apply` under **Tools**.
- If the connector shows as offline, open the same menu, choose **Edit**, then
  **Refresh connection**.
- Keep **MCP OAuth**. With an organization API key, Bolt acts as that key, not
  as you.
- If the agent says the organization does not let agents in, an owner or
  admin of that organization changes its **AI agents** setting in the console,
  under **Security**. Under **Read only** (the default) agents can read but
  not change anything.

---

Source: [Bolt, Connect to an MCP server](https://support.bolt.new/integrations/mcp), read 2026-11-24.
