import { assert } from "chai";
import {
    CashedService,
    Address,
    ConfirmedTransaction,
    Block
} from "../src/index";
import { default as CashedDB } from "../src/db";
import { Dexie } from 'dexie';
import { GrpcClient } from "grpc-bchrpc-browser";

// Security notice:
// Below is a collection of tools to approximate core javascript libraries that were not in nodejs.
//
// These libraries are only used for testing and should not be exported in the final module.
//
import { XMLHttpRequest } from "xhr2";

declare var global: any;
/*
   If running within nodejs, import these substitutes for core libraries
*/

let db = new CashedDB

const mainnet = new GrpcClient(
    {
        //url: "https://bchd.fountainhead.cash",
        url: "https://bchd.sploit.cash",
        testnet: false,
        options: {}
    }
);

declare var global: any;

if (typeof window === 'undefined') {
    global.XMLHttpRequest = XMLHttpRequest;
}

export function deleteDatabase(db: Dexie) {
    var Promise = Dexie.Promise;
    return false ? db.delete() : db.transaction('rw!', db.tables, function () {
        // Got to do an operation in order for backend transaction to be created.
        var trans = Dexie.currentTransaction;
        return Promise.all(trans.storeNames.filter(function (tableName) {
            // Don't clear 'meta tables'
            return tableName[0] != '_' && tableName[0] != '$';
        }).map(function (tableName) {
            // Clear all tables
            return db.table(tableName).clear();
        }));
    });
}

function sleep(milliseconds: number) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

describe("cashedDB", () => {

    before(async () => {
        global.casheddb = db;
    });

    afterEach(async () => {
        //await deleteDatabase(global.casheddb)
    })


    it("getHeaders and store in block collection", async () => {
        const locatorHashes = ["AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="]
        const res = await mainnet.getHeaders(
            {
                blockLocatorHashes: locatorHashes,
                stopHash: "6RXZpHjjrfMYbAfGGiIiixD9h980PJJ4LswFLAAAAAA="
            });
        let blocks = res.getHeadersList().map(x => x.toObject() as Block);
        let block5 = await db.transaction("rw", global.casheddb.block, (): Promise<void> => {
            return Promise.resolve(global.casheddb.block.bulkPut(blocks));
        }).then((): Promise<Block> => {
            return global.casheddb.block.get({ "height": 5 })
        }).then((block5) => {
            return block5
        }).catch(function (error) {
            console.error(error);
            throw error;
        });
        assert.equal(block5.hash, "/DP1lvgioKGVH/2/Kol7CVY2rYcXB79dMWJymwAAAAA=", "check hash of block the 5th is stored");
        assert.equal(block5.height, 5, "check height of block the 5th is stored");
        assert.equal(block5.version, 1, "check version of block the 5th is stored");
        assert.equal(block5.previousBlock, "hRRKhEiOqI0iHIvWwFnaCQ6I+KLJlpDuVdu6TgAAAAA=", "check previous hash of block the 5th is stored");
        assert.equal(block5.merkleRoot, "4RxI/s3Z5yUQyoTwIzcMmji/kaxcrogBm+6U0kUoUmM=", "check merkleRoot of block the 5th is stored");
        assert.equal(block5.timestamp, 1231471428, "check timestamp of block the 5th is stored");
        assert.equal(block5.bits, 486604799, "check bits of block the 5th is stored");
        assert.equal(block5.nonce, 2011431709, "check nonce of block the 5th is stored");


    });


    it("getTip should get the current best block height", async () => {
        let service = new CashedService({ db: global.casheddb, client: mainnet })
        let tip = await service.bootstrap()
        assert.equal(tip, 635259, "assure the starting height is 635259")
    });

    it("sync should download all headers", async () => {
        let service = new CashedService({ db: global.casheddb, client: mainnet })
        let isSynced = new Promise(resolve => setTimeout(resolve, 1000)).then(() => {
            return service.bootstrap()
        }).then((tip) => {
            console.log("sync tip :" + tip)
            return service.sync()
        })
        assert.isTrue((await isSynced), "assure sync returns true")
    });


    it("getAddressTransactions and store in transaction collection", async () => {
        const exampleAddress = "bitcoincash:qregyd3kcklc58fd6r8epfwulpvd9f4mr5gxg8n8y7";
        const res = await mainnet.getAddressTransactions({ address: exampleAddress, nbFetch: 10 });
        const confirmedTransactions = res.getConfirmedTransactionsList()?.map(x => x.toObject() as ConfirmedTransaction)
        
        let txn = await global.casheddb.transaction("rw", global.casheddb.txn, (): Promise<void> => {
            console.log("Putting " + confirmedTransactions.length + " transactions in db in bulk")
            return global.casheddb.txn.bulkPut(confirmedTransactions);
        }).then((n: any) => {
            return global.casheddb.txn.get({ 'hash': "RKN3uztX5ie2bEAwffWRUjDXB3N5J3coX0LIam2QSFI=" });
        });
        console.log(txn.blockHash)
        assert.equal(txn?.lockTime, 609291, "check the lockTime of the stored transaction");
        assert.equal(txn?.version, 1, "check the version of the stored transaction");
        assert.equal(txn?.hash, "RKN3uztX5ie2bEAwffWRUjDXB3N5J3coX0LIam2QSFI=", "check the hash of the stored transaction");
        assert.equal(txn?.inputsList.length, 3, "check the input length of the stored transaction");
        assert.equal(txn?.inputsList[0].outpoint.hash, "c95MzcxXLV8foxajfMpeYerA22uvEbbxXJ8D7gvI95Y=", "check the hash of the first input outpoint");
        assert.equal(txn?.inputsList[0].outpoint.index, 4, "check the index of the first input outpoint");
        assert.equal(txn?.outputsList.length, 1, "check the output length of the stored transaction");
    });

    // it("getAddressTransactions and store in transaction collection", async () => {
    //     const exampleAddress = "bitcoincash:qregyd3kcklc58fd6r8epfwulpvd9f4mr5gxg8n8y7";
    //     const res = await mainnet.getAddressTransactions({ address: exampleAddress, nbFetch: 10 }, null);
    //     const confirmedTransactions = res.getConfirmedTransactionsList()?.map(x => x.toObject() as ConfirmedTransaction)
        
    //     let txn = await global.casheddb.transaction("rw", global.casheddb.txn, (): Promise<void> => {
    //         console.log("Putting " + confirmedTransactions.length + " transactions in db in bulk")
    //         return global.casheddb.txn.bulkPut(confirmedTransactions);
    //     }).then((n: any) => {
    //         return global.casheddb.txn.get({ 'hash': "RKN3uztX5ie2bEAwffWRUjDXB3N5J3coX0LIam2QSFI=" });
    //     });
    //     console.log(txn.blockHash)
    //     assert.equal(txn?.lockTime, 609291, "check the lockTime of the stored transaction");
    //     assert.equal(txn?.version, 1, "check the version of the stored transaction");
    //     assert.equal(txn?.hash, "RKN3uztX5ie2bEAwffWRUjDXB3N5J3coX0LIam2QSFI=", "check the hash of the stored transaction");
    //     assert.equal(txn?.inputsList.length, 3, "check the input length of the stored transaction");
    //     assert.equal(txn?.inputsList[0].outpoint.hash, "c95MzcxXLV8foxajfMpeYerA22uvEbbxXJ8D7gvI95Y=", "check the hash of the first input outpoint");
    //     assert.equal(txn?.inputsList[0].outpoint.index, 4, "check the index of the first input outpoint");
    //     assert.equal(txn?.outputsList.length, 1, "check the output length of the stored transaction");
    // });


    
});