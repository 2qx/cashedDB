# cashedDB

An experimental client database for Bitcoin Cash.

This database wrapper is indended for use with grpc-bchd clients.  

It utilizes [rxdb](https://rxdb.info/) as a library for managing a backend database.  It is configured to use IndexedDB via pouchDB, or in-memory for testing under nodejs.

**There will probably be a refactor to change the IndexedDB adapter to [idb](https://github.com/jakearchibald/idb#typescript) for simplicity, and since with the extent of mostly immutable data, the observables of rxdb would have limited usefulness.**

## Design

Minimal information is stored to validate blocks and transactions.  Data are generally stored in the marshalled form provided by grpc-bchd-browser—so all hashes are little-endian base64 strings, while numeric data are stored as numbers. Both transactions and blocks have a numeric field to indicated whether the record has been validated by the client.


## Usage

The following code gets the first 10 block headers, stores them in bulk, then gets the 5th block from the database

    const locatorHashes = ["AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="] // the first dummy hash
    const res = await mainnet.getHeaders(
        {
            blockLocatorHashes: locatorHashes,
            stopHash: "6RXZpHjjrfMYbAfGGiIiixD9h980PJJ4LswFLAAAAAA=" // the 10th block header
        }, null);
    let blockDocs = (await res.getHeadersList()).map(x => BlockDocFromObject(x.toObject()))
    try{
        let insertedBlockPromises = await global.casheddb.collections.block.bulkInsert(blockDocs)
    } catch(error){
        console.log(error)
    }
    let block5 = await (await global.casheddb.collections.block.find().where("height").eq(5).exec()).pop()
        

[Mocha browser tests](test/) provide some working examples.

## Sample App

[A Block Explorer](app/) is available in the app directory. 

