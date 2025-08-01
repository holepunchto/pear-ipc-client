const test = require('brittle')
const tmp = require('test-tmp')
const createIPC = require('..')
const path = require('path')

test('create ipc client', async (t) => {
  const dir = await tmp()
  const ipc = createIPC(dir)
  t.is(ipc._socketPath, path.join(dir, 'pear.sock'))
})
