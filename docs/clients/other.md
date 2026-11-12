# Other clients

Any MCP client that can connect to a remote server over Streamable HTTP and
sign in with OAuth can use BuildBase. There is nothing to install.

## What to enter

| Setting | Value |
| --- | --- |
| URL | `https://api.console.buildbase.app/mcp` |
| Transport | Streamable HTTP (sometimes called "HTTP" or "remote") |
| Authentication | OAuth. No API key or custom header. |

A typical JSON config looks like this. The top-level key and the `type` value
differ between clients, so check your client's docs.

```json
{
  "mcpServers": {
    "buildbase": {
      "type": "http",
      "url": "https://api.console.buildbase.app/mcp"
    }
  }
}
```

## Sign in

The first time the client connects, the server answers `401` and points the
client to its sign-in metadata. The client opens your browser on the BuildBase
sign-in page. Sign in with your BuildBase account and approve the access
request. You never paste a password or token into the client.

## What your client needs

For client developers, the server follows the
[MCP authorization spec](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization):

- Streamable HTTP transport.
- Protected resource metadata discovery from the `401` response
  (`/.well-known/oauth-protected-resource/mcp`).
- Authorization server metadata at the RFC 8414 path for an issuer with a path.
- Dynamic client registration.
- PKCE with `S256`, and the `resource` parameter.

## Check it works

Ask your agent:

> List my BuildBase organizations.

## Known limits

- A client that can only run local (stdio) servers, or that cannot do the OAuth
  sign-in, cannot connect directly.
- A client that supports only client ID metadata documents, and not dynamic
  client registration, cannot sign in yet.
- If the agent says agent access is off, an owner or admin of that organization
  turns it on in **Console > Account > Security**.

---

Source: [MCP specification 2026-07-28, Authorization](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization) and [Transports](https://modelcontextprotocol.io/specification/2026-07-28/basic/transports), read 2026-11-12.
