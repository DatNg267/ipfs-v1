export const CODE_UPLOAD_NFT_STRING = `import W3IpfsClient from "aioz-w3ipfs-sdk";
import fs from "fs";

let client = new W3IpfsClient("key", "secret-key")
const readableStreamMetadata = fs.createReadStream("./sample.json");
const readableStreamFile = fs.createReadStream("./test.png");

client
  .pinNft(
    readableStreamFile,
    undefined,
    readableStreamMetadata,
    undefined
  )
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });

`
export const CODE_UPLOAD_NFT_BY_CID_STRING = `import W3IpfsClient from "aioz-w3ipfs-sdk";
import fs from "fs";

let client = new W3IpfsClient("key", "secret-key")

client
  .pinNftByHash("hashToPin", {
    name: "test",
    description: "description",
  })
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });

// OR FILE
const readableStreamForMetadata = fs.createReadStream("./sample.json");
client
  .pinNftByHash("hashToPin", undefined, readableStreamForMetadata)
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });
`

export const CODE_EXAMPLE_METADATA = `{
  "name": "My Awesome NFT",
  "description": "This is an NFT",
  "properties": [
    {
      "trait_type": "Color",
      "value": "Red"
    },
    {
      "trait_type": "Rarity",
      "value": "Medium"
    }
  ]
}`

export const CODE_UPLOAD_FILE_STRING = `import W3IpfsClient from "aioz-w3ipfs-sdk"
import fs from 'fs'

let client = new W3IpfsClient("key", "secret-key")
const readableStreamForFile = fs.createReadStream('./test.png');
const options = {
    w3IpfsMetadata: {
        name: "MyCustomName",
        keyvalues: {
            customKey: 'customValue',
            customKey2: 'customValue2'
        }
    }
};
client.pinFileToIPFS(readableStreamForFile, options).then((result) => {
    console.log(result);
}).catch((err) => {
    console.log(err);
});
`
export const CODE_GET_NFT_BY_ID_STRING = `import W3IpfsClient from "aioz-w3ipfs-sdk"

let client = new W3IpfsClient("key", "secret-key")

client.getNftByID('4b0bb1a9-e9fb-408f-91a5-8608d3cb8e10').then((result) => {
    console.log(result);
}).catch((err) => {
    console.log(err);
});
`

export const CODE_GET_NFT_LIST_STRING = `import W3IpfsClient from "aioz-w3ipfs-sdk"

let client = new W3IpfsClient("key", "secret-key")

const filters = {
    pinned: "true",
    limit: 10,
    offset: 0,
    sortBy: "created_at",
    sortOrder: "ASC",
    metadata: undefined,
};

client.nftList(filters).then((result) => {
    console.log(result.data.nfts);
}).catch((err) => {
    console.log(err);
});
`

export const CODE_GET_FILE_BY_CID_STRING = `import W3IpfsClient from "aioz-w3ipfs-sdk"

let client = new W3IpfsClient("key", "secret-key")

client.getPinByID('cid').then((result) => {
    //handle results here
    console.log(result);
}).catch((err) => {
    //handle error here
    console.log(err);
});
`
