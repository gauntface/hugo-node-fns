const util = require('util');
const exec = util.promisify(require('child_process').exec);
const spawn = require('child_process').spawn;

const PREFIX = `hugo-node:`;

async function version() {
  const {stdout} = await exec('hugo version');
  const vr = /v\d*.\d*.\d*/
  const got = stdout.match(vr)
  if (!got) {
    throw new Error(`Failed to match hugo version from '${stdout}'`)
  }
  return got[0];
}

async function build(dir, flags) {
  return new Promise((resolve, reject) => {
    const f = []
    f.push(...flags);
    const buildCmd = spawn('hugo', f, {
      stdio: 'inherit',
      cwd: dir,
    });
    buildCmd.on('error', (err) => {
      reject(new Error(`Failed to build site: ${err}`));
    });
    buildCmd.addListener('exit', (code) => {
      if (code == 0) {
        resolve();
        return
      }

      reject(new Error(`Hugo build exited with code '${code}'`));
    });
  });
}

let serverInstance;

async function startServer(dir, flags) {
  const f = ['server']
  f.push(...flags);
  serverInstance = spawn('hugo', f, {
    stdio: 'inherit',
    cwd: dir,
  });
  serverInstance.on('error', (err) => {
    console.error('Failed to run hugo server: ', err);
  });
  serverInstance.addListener('exit', (code) => {
    console.error('Hugo server has exited: ', code);
    serverInstance = null;
  });
}

async function stopServer() {
  if (!serverInstance) {
    return;
  }

  await new Promise((resolve) => {
    serverInstance.addListener('exit', resolve);
  
    serverInstance.kill();
  })
}

async function restartServer(dir, flags) {
  await stopServer();

  setTimeout(() => startServer(dir, flags), 500);
}

module.exports = {
  version,
  build,
  startServer,
  restartServer,
  stopServer,
}