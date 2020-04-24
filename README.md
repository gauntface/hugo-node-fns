# hugo-node-fns

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