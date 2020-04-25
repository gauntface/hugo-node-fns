# hugo-node-fns

[![Build and Test](https://github.com/gauntface/hugo-node-fns/workflows/Build%20and%20Test/badge.svg)](https://github.com/gauntface/hugo-node-fns/actions?query=workflow%3A%22Build+and+Test%22) [![Publish](https://github.com/gauntface/hugo-node-fns/workflows/Publish/badge.svg)](https://github.com/gauntface/hugo-node-fns/actions?query=workflow%3APublish)

Run hugo commands easily from node.

## API

```javascript
const hugo = require('@gauntface/hugo-node');

const projectPath = "~/example-project/";

// Get the version of hugo in the current environment
const v = await hugo.version();

// Build the site
await hugo.build(projectPath);

// Start, restart and stop server
const flags = ['-D', '--ignoreCache', '--port=1314'];
await hugo.startServer(projectPath, flags);
await hugo.restartServer(projectPath, flags);
await hugo.stopServer();
```