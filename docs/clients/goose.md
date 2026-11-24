# Goose

Add BuildBase as a remote extension over Streamable HTTP. There is nothing to
install and no key to enter.

## Goose CLI

1. Run `goose configure`.
2. Choose **Add Extension**, then **Remote Extension (Streamable HTTP)**.
3. Enter the name `buildbase` and the URL
   `https://api.console.buildbase.app/mcp`, then follow the prompts.

## Goose Desktop

1. Open the sidebar and select **Extensions**.
2. Select **Add custom extension**.
3. Choose the **Streamable HTTP** type, enter the name `buildbase` and the URL
   `https://api.console.buildbase.app/mcp`, then select **Add**.

Or open this install link on a computer with Goose Desktop:

```text
goose://extension?url=https%3A%2F%2Fapi.console.buildbase.app%2Fmcp&type=streamable_http&id=buildbase&name=BuildBase&description=BuildBase%20console
```

## In the config file

Add this to `~/.config/goose/config.yaml`:

```yaml
extensions:
  buildbase:
    name: BuildBase
    type: streamable_http
    uri: https://api.console.buildbase.app/mcp
    enabled: true
    timeout: 300
```

## Sign in

The first time Goose connects, it registers itself with BuildBase and opens
the BuildBase sign-in page in your browser. Sign in with your BuildBase account
and approve the access request.

## Check it works

> List my BuildBase organizations.

## Known limits

- Goose runs tools without asking by default. To confirm each tool call
  yourself, change Goose's permission mode or tool permissions. BuildBase
  still waits for your approval before deleting things, sending to an
  audience, changing members, roles or webhooks, moving money or running a
  workflow for real.
- The timeout is in seconds. A long blueprint plan or export may need more
  than the value you set.
- Sign-in needs a browser on the same machine: Goose receives the sign-in on
  `127.0.0.1`.
- If the agent says the organization does not let agents in, an owner or
  admin of that organization changes its **AI agents** setting in the console,
  under **Security**. Under **Read only** (the default) agents can read but
  not change anything.

---

Source: [goose, Using extensions](https://goose-docs.ai/docs/getting-started/using-extensions), read 2026-11-24.
