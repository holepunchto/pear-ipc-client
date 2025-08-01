/* global Pear */
import createIPC from 'pear-ipc-client'
const pearDir = Pear.config.pearDir
const ipc = createIPC(pearDir)
await ipc.ready()

const link = Pear.key ? Pear.config.applink : Pear.config.dir
const stream = await ipc.reset({ link })

await new Promise((resolve) => {
  stream.on('data', (res) => {
    if (res.tag === 'final' && res.data.success) {
      console.log('Pear app reset:', res)
      resolve()
    }
  })
})

ipc.close()
