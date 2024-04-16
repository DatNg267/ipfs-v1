import { UserErrorMessage } from '@/utils'
import { CarWriter } from '@ipld/car'
import { CID } from '@ipld/car/dist/src/api'
import browserReadableStreamToIt from 'browser-readablestream-to-it'
import { importer } from 'ipfs-unixfs-importer'
// const { writer, out } = await CarWriter.create([cid])
// Readable.from(out).pipe(fs.createWriteStream('example.car'))

// // store a new block, creates a new file entry in the CAR archive
// await writer.put({ cid, bytes })
// await writer.close()
export const generateCid = async (files: File[]) => {
  const res = await createCarBlob(files)
  if (res) {
    return res.root
  } else {
    throw new Error(UserErrorMessage.ACCOUNT_IS_EXISTS)
  }
  // const inStream = await readFileAsUint8Array(files[0])
  // const carWriter = await CarWriter.
  // const car = await CarReader.fromBytes(inStream)
  // const fileReader = new FileReader()
  // fileReader.readAsArrayBuffer(files[0])
  // fileReader.onload = async (event) => {
  //   const data = new Uint8Array(event.target?.result)
  //   // Create a car writer
  //   const { writer, out } = await CarWriter.createAppender()
  //   // Add the data to the car file
  //   const { root } = await writer.put({ cid: '2121', bytes: data })
  //   // Close the writer to finish writing the car file
  //   await writer.close()
  // }
  // const fileContent0 = await readFileAsText(files[0])
  // const fileContent1 = await readFileAsText(files[1])
  // const encoder = new TextEncoder()
  // const bytes0 = encoder.encode(fileContent0)
  // const bytes1 = encoder.encode(fileContent1)
  // const hash0 = await sha256.digest(raw.encode(bytes0))
  // const hash1 = await sha256.digest(raw.encode(bytes1))
  // const cid0 = CID.create(1, raw.code, hash0)
  // const cid1 = CID.create(1, raw.code, hash1)
  // const { writer, out } = await CarWriter.create([cid0, cid1])
  // await writer.put({ cid: cid0, bytes: bytes0 })
  // await writer.put({ cid: cid1, bytes: bytes1 })
  // Add the data to the car file
  // Close the writer to finish writing the car file
  // await writer.close()
}
// function readFileAsUint8Array(file: File): Promise<Uint8Array> {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader()
//     reader.onload = (event) => {
//       if (event.target?.result) {
//         const arrayBuffer = event.target.result
//         const uint8Array = new Uint8Array(arrayBuffer)
//         resolve(uint8Array)
//       } else {
//         reject(new Error('Failed to read the file.'))
//       }
//     }
//     reader.onerror = () => {
//       reject(new Error('Failed to read the file.'))
//     }
//     reader.readAsArrayBuffer(file)
//   })
// }

//   let links: CID['link'][] = []
//   links = await Promise.all(
//     files.map(async (item, index) => {
//       const fileContent = await readFileAsText(item)
//       const encoder = new TextEncoder()
//       const bytes = encoder.encode(fileContent)
//       const hash = await sha256.digest(raw.encode(bytes))
//       return CID.create(1, raw.code, hash)
//     })
//   )

//   return CID.createV1(links)
// }
function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      if (event.target?.result) {
        resolve(event.target.result)
      } else {
        reject(new Error('Failed to read the file.'))
      }
    }
    reader.onerror = () => {
      reject(new Error('Failed to read the file.'))
    }
    reader.readAsText(file)
  })
}

async function createCarBlob(files: File[] | Blob[] | null | any) {
  if (!files || !files.length) return
  if (files.car) return
  // const carParts = []
  const { root } = await fileListToCarIterator(files)
  // for await (const chunk of out) {
  //   carParts.push(chunk)
  // }
  // const car = new Blob(carParts, {
  //   type: 'application/car',
  // })
  return { root }
}

class MapBlockStore {
  constructor() {
    this.store = new Map()
  }
  *blocks() {
    for (const [cid, bytes] of this.store.entries()) {
      yield { cid, bytes }
    }
  }
  put({ cid, bytes }: { cid: any; bytes: any }) {
    return Promise.resolve(this.store.set(cid, bytes))
  }
  get(cid: any) {
    return Promise.resolve(this.store.get(cid))
  }
}

export async function fileListToCarIterator(
  fileList: any,
  blockApi = new MapBlockStore()
) {
  const fileEntries = []
  for (const file of fileList) {
    fileEntries.push({
      path: file.name,
      content: browserReadableStreamToIt(file.stream()),
    })
  }

  const options = {
    cidVersion: 1,
    wrapWithDirectory: true,
    rawLeaves: true,
    shardSplitThresholdBytes: 1048576,
  }
  const unixFsEntries = []
  for await (const entry of importer(fileEntries, blockApi, options)) {
    unixFsEntries.push(entry)
  }

  const root = unixFsEntries[unixFsEntries.length - 1].cid
  // const { writer, out } = CarWriter.create(root)
  // for (const block of blockApi.blocks()) {
  //   writer.put(block)
  // }
  // writer.close()
  // return { root, out }
  return { root }
}
