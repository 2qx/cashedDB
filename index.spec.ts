import { assert } from "chai";
import { CashedDB, CashedService } from "./index";
import { GrpcClient } from "../grpc-bchrpc-browser";

// Security notice:
// Below is a collection of tools to approximate core javascript libraries that were not in nodejs.
//
// These libraries are only used for testing and should not be exported in the final module.
//
import { XMLHttpRequest } from "xhr2";
import {
    BlockDocFromObject,
    TransactionDocFromObject
} from "./src/cashedSchema";

declare var global: any;
/*
   If running within nodejs, import these substitutes for core libraries
*/



const mainnet = new GrpcClient(
    {
        url: "https://bchd.fountainhead.cash",
        //url: "https://bchd.sploit.cash",
        testnet: false,
        options: {}
    }
);

declare var global: any;

if (typeof window === 'undefined') {
    global.XMLHttpRequest = XMLHttpRequest;
}


describe("cashedDB", () => {
    
    before(async () => {
        global.casheddb = await (new CashedDB()).db;
    });


    it("getHeaders and store in block collection", async () => {
        const locatorHashes = ["AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="]
        const res = await mainnet.getHeaders(
            {
                blockLocatorHashes: locatorHashes,
                stopHash: "6RXZpHjjrfMYbAfGGiIiixD9h980PJJ4LswFLAAAAAA="
            }, null);
        let blockDocs = (await res.getHeadersList()).map(x => BlockDocFromObject(x.toObject()))
        try {
            let insertedBlockPromises = await global.casheddb.collections.block.bulkInsert(blockDocs)
        } catch (error) {
            console.log(error)
        }
        
        let block5 = await (await global.casheddb.collections.block.find().where("height").eq(5).exec()).pop()
        assert.equal(block5?.hash, "/DP1lvgioKGVH/2/Kol7CVY2rYcXB79dMWJymwAAAAA=", "check hash of block the 5th is stored");
        assert.equal(block5?.height, 5, "check height of block the 5th is stored");
        assert.equal(block5?.version, 1, "check version of block the 5th is stored");
        assert.equal(block5?.previousBlock, "hRRKhEiOqI0iHIvWwFnaCQ6I+KLJlpDuVdu6TgAAAAA=", "check previous hash of block the 5th is stored");
        assert.equal(block5?.merkleRoot, "4RxI/s3Z5yUQyoTwIzcMmji/kaxcrogBm+6U0kUoUmM=", "check merkleRoot of block the 5th is stored");
        assert.equal(block5?.timestamp, 1231471428, "check timestamp of block the 5th is stored");
        assert.equal(block5?.bits, 486604799, "check bits of block the 5th is stored");
        assert.equal(block5?.nonce, 2011431709, "check nonce of block the 5th is stored");
    });


    it("getTip should get the current best block height", async () => {
        let service = new CashedService({db: global.casheddb, client: mainnet})
        await service.bootstrap()
        
        assert.equal((await service.getTip()), 635259, "assure the starting height is 635259")
    });

    it("bootstrap should download all headers", async () => {
        let service = new CashedService({db: global.casheddb, client: mainnet})
        await service.bootstrap()
        
        await service.sync()
        
        let tip = service.getTip()
        assert.isNumber( (await tip), "assure current tip returns a number")
    });

    it("getHeaders and store 1000 blocks collection", async () => {
        const locatorHashes = ["AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="]
        const res = await mainnet.getHeaders(
            {
                blockLocatorHashes: locatorHashes,
                stopHash: "Ce32RtE9Kn4dqL2tFNJJsDfszYryOqcEN5g3yQAAAAA=" // 1000
            }, null);
        let blockDocs = (await res.getHeadersList()).map(x => BlockDocFromObject(x.toObject()))
        try {
            let insertedBlockPromises = await global.casheddb.collections.block.bulkInsert(blockDocs)
        } catch (error) {
            console.log(error)
        }
    });

    it("getAddressTransactions and store in transaction collection", async () => {
        const exampleAddress = "bitcoincash:qregyd3kcklc58fd6r8epfwulpvd9f4mr5gxg8n8y7";
        const res = await mainnet.getAddressTransactions({ address: exampleAddress, nbFetch: 10 }, null);
        const txnObjects = (await res.getConfirmedTransactionsList())?.map(x => TransactionDocFromObject(x.toObject()))

        let insertedTransactions = await global.casheddb.collections.transaction.bulkInsert(txnObjects)
        let txn = await (await global.casheddb.collections.transaction.find().where("hash").eq("RKN3uztX5ie2bEAwffWRUjDXB3N5J3coX0LIam2QSFI=").exec()).pop()
        assert.equal(txn?.lockTime, 609291, "check the lockTime of the stored transaction");
        assert.equal(txn?.version, 1, "check the version of the stored transaction");
        assert.equal(txn?.hash, "RKN3uztX5ie2bEAwffWRUjDXB3N5J3coX0LIam2QSFI=", "check the hash of the stored transaction");
        assert.equal(txn?.inputs.length, 3, "check the input length of the stored transaction");
        assert.equal(txn?.inputs[0].outpoint.hash, "c95MzcxXLV8foxajfMpeYerA22uvEbbxXJ8D7gvI95Y=", "check the hash of the first input outpoint");
        assert.equal(txn?.inputs[0].outpoint.index, 4, "check the index of the first input outpoint");
        assert.equal(txn?.outputs.length, 1, "check the output length of the stored transaction");
    });

});