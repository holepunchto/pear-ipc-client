const test = require('brittle')
const tmp = require('test-tmp')
const createIPC = require('..')
const path = require('path')
const { isWindows } = require('which-runtime')

test('create ipc client', async (t) => {
  const dir = await tmp()
  const ipc = createIPC(dir)
  if (isWindows) {
    t.ok(ipc._socketPath.includes('.pipe'))
  } else {
    t.is(ipc._socketPath, path.join(dir, 'pear.sock'))
  }
})
