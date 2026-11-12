# Contributing

This repository holds the listings and setup guides for the hosted BuildBase
MCP server. It does not hold the server's code.

## Issues

- **Connection problems:** use the "Connection problem" template. Never paste
  a token, password or authorization code.
- **Feature requests:** use the "Feature request" template. Requests for new
  server tools are tracked here and passed to the BuildBase team.
- **Security problems:** do not open an issue. Follow [SECURITY.md](SECURITY.md).

## Pull requests

Pull requests are welcome for docs fixes, for example a client guide that no
longer matches the client's menus.

Before you open one:

1. Run `node scripts/check.mjs` (Node 20 or later, no install needed).
2. If you changed a client guide or a manifest, link the client's own docs
   page you checked.
3. Fill in the pull request template.
