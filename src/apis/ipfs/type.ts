export type IPFSGetFolderResponse = {
  Data: Data
  Links: Link[]
}

interface Link {
  Hash: Hash
  Name: string
  Tsize: number
}

interface Hash {
  '/': string
}
interface Data {
  '/': _
}

interface _ {
  bytes: string
}

// {
//   "Data": { "/": { "bytes": "CAE" } },
//   "Links": [
//     {
//       "Hash": {
//         "/": "bafkreietieevec2btrwpgjt6mj2flmdscn2pc5yqikb3qdwpghyfe7qwbi"
//       },
//       "Name": "Screenshot from 2023-06-19 15-53-33.png",
//       "Tsize": 76386
//     },
//     {
