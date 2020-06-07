import { assert } from "chai";
import { CashedDB } from "./index";
import { GrpcClient } from "../grpc-bchrpc-browser";

// Security notice:
// Below is a collection of tools to approximate core javascript libraries that were not in nodejs.
//
// These libraries are only used for testing and should not be exported in the final module.
//
import { XMLHttpRequest } from "xhr2";
import { BlockDocType } from "./src/cashedSchema";

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


    it("getHeaders and store in block collection", async () => {
        const locatorHashes = ["AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="]
        const res = await mainnet.getHeaders(
            {
                blockLocatorHashes: locatorHashes,
                stopHash: "6RXZpHjjrfMYbAfGGiIiixD9h980PJJ4LswFLAAAAAA="
            }, null);
        let blockInfoObjects = (await res.getHeadersList()).map(x => x.toObject()).map((o) =>
            ({
                height: o.height,
                hash: o.hash,

                version: o.version,
                previousBlock: o.previousBlock,
                merkleRoot: o.merkleRoot,
                timestamp: o.timestamp,
                nonce: o.nonce,
                target: o.bits
            })
        )
        let casheddb = await (await (new CashedDB())).db;
        let insertedBlocks = await casheddb.collections.block.bulkInsert((blockInfoObjects as unknown[]) as BlockDocType[])
        let block5 = await (await casheddb.collections.block.find().where("height").eq(5).exec()).pop()
        assert.equal(block5?.hash, "/DP1lvgioKGVH/2/Kol7CVY2rYcXB79dMWJymwAAAAA=", "check hash of block the 5th is stored");
        assert.equal(block5?.height, 5, "check height of block the 5th is stored");
        assert.equal(block5?.version, 1, "check version of block the 5th is stored");
        assert.equal(block5?.previousBlock, "hRRKhEiOqI0iHIvWwFnaCQ6I+KLJlpDuVdu6TgAAAAA=", "check previous hash of block the 5th is stored");
        assert.equal(block5?.merkleRoot, "4RxI/s3Z5yUQyoTwIzcMmji/kaxcrogBm+6U0kUoUmM=", "check merkleRoot of block the 5th is stored");
        assert.equal(block5?.timestamp, 1231471428, "check timestamp of block the 5th is stored");
        assert.equal(block5?.target, 486604799, "check target of block the 5th is stored");
        assert.equal(block5?.nonce, 2011431709, "check nonce of block the 5th is stored");
    });

});