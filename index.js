const IPC = require('pear-ipc')
const { isWindows } = require('which-runtime')
const path = require('path')
const b4a = require('b4a')
const sodium = require('sodium-native')

const IPC_ID = 'pear'
const CONNECT_TIMEOUT = 20_000

module.exports = function (pearDir) {
  const socketPath = isWindows ? `\\\\.\\pipe\\${IPC_ID}-${pipeId(pearDir)}` : path.join(pearDir, 'pear.sock')
  return new IPC.Client({
    socketPath,
    connectTimeout: CONNECT_TIMEOUT
  })
}

function pipeId (s) {
  const buf = b4a.allocUnsafe(32)
  sodium.crypto_generichash(buf, b4a.from(s))
  return b4a.toString(buf, 'hex')
}
