import { Block } from "./db";
import CashedDB from "./db"

import { checkpoints } from "./Config";
//import * as bchrpcModule from "grpc-bchrpc-browser"
import * as bchrpc from "../../grpc-bchrpc-browser"

declare var global: any;

// if (!global.bchrpc) {
//     let bchrpc = bchrpcModule
// }


export class CashedService {

    public db: CashedDB
    private client: bchrpc.GrpcClient
    public useAdapter: any
    private blockStream: any;

    constructor({ db, client }: { db: CashedDB, client: any }) {
        this.client = client
        this.db = db
    }

    // initially populates a database
    public async bootstrap() {
        let blockInfoPromises = checkpoints.map((p) => {
            return this.client.getBlockInfo({ hash: bchrpc.hexToU8(p.hashHex!).reverse() })
        })
        return Promise.all(blockInfoPromises).then((blockInfos) => {
            let blocks = blockInfos.map(i => i.getInfo()!.toObject() as Block)
            return blocks
        }).then((blocks) => {
            return this.bulkPutBlocksAsTransaction(blocks)
        })

    }

    // bulkPut an array of blocks and return the current local tip in the same transaction
    public async bulkPutBlocksAsTransaction(blocks: Block[]) {
        return this.db.transaction("rw", this.db.block, () => {
            console.log("Putting "+ blocks.length  +" blocks in db in bulk")
            return this.db.block.bulkPut(blocks);
        }).then((n) => {
            return this.db.block.orderBy('height').reverse().first();
        }).then((block) => {
            if (block) {
                return Promise.resolve(block.height)
            } else {
                throw new Error("no block returned during bootstrap");
            }
        });
    }

    // syncs a database, 
    public async sync() {

        let bestBlockHeight = (await this.client.getBlockchainInfo({})).getBestHeight()
        console.log("current network height: " + bestBlockHeight)
        let currentTip = (await this.getTip())
        let blockHeaderWatchdogLimit = 765; // 2038-01
        for (var watchdog = 0; bestBlockHeight > currentTip && watchdog < blockHeaderWatchdogLimit; watchdog++) {
            const locatorHashes = await this.getLocatorHashes(currentTip)
            const res = await this.client.getHeaders({ blockLocatorHashes: locatorHashes });
            let blocks = (res.getHeadersList()).map(x => x.toObject() as Block)
            currentTip = (await this.bulkPutBlocksAsTransaction(blocks))
            console.log("  new chaintip " + currentTip)
        }
        return (currentTip == bestBlockHeight)

    }

    public async subscribe() {
        this.subscribeBlocks()
    }

    public async reorg() {

    }

    public update() {

    }

    /*
    *    Get a sparse list of block heights, starting from the currently known local tip,
    *    getting sparser back to genisis block.
    */
    private getLocatorHeights(localTip: number) {
        let step = 1
        let bucket = 10
        let cursor = localTip
        let heightLocators: number[] = []
        if (cursor > 0) {
            for (var watchdog = 0; cursor > 0 && watchdog < 20; watchdog++) {
                heightLocators.push.apply(
                    heightLocators,
                    [...Array(bucket).keys()].map(x => cursor - x * step)
                );
                cursor -= step * bucket;
                step *= 10;
            }
            // remove heights prior to the highest checkpoint

            let lastCheckpointHeight = checkpoints[checkpoints.length-1].height
            heightLocators = heightLocators.filter(h => h > lastCheckpointHeight)
            Array.from(checkpoints).reverse().map(c => {
                heightLocators.push(c.height)
            })            
            return heightLocators
        }
        // if there was no block tip locally, just return an empty list.
        return []


    }


    private async unsubscribeBlocks() {
        console.log("Canceling block subscription... ")
        await this.blockStream.cancel()
        console.log("block subscription canceled")
    }

    private async subscribeBlocks() {
        console.log("Subscribing to unconfirmed transactions... ")

        this.blockStream = await this.client.subscribeBlocks({
            includeSerializedBlock: false,
            includeTxnData: false,
            includeTxnHashes: false
        })

        this.blockStream.on('data', function (blockNotification:bchrpc.BlockNotification) {
            console.log(blockNotification.getType())
            console.log(blockNotification.getBlockCase())
            const bInfo = blockNotification.getBlockInfo()
            console.log(bInfo?.getVersion())
            console.log(bInfo?.getPreviousBlock_asB64())
            console.log(bInfo?.getMerkleRoot_asB64())
            console.log(bInfo?.getTimestamp())
            console.log(bInfo?.getBits())
            console.log(bInfo?.getNonce())
        });
        this.blockStream.on('status', function (status:any) {
            console.log(status)
        });
        this.blockStream.on('error', (err:any) => {
            console.log(
                'Error code: ' + err.code + ' "' + err.message + '"');
        });
        this.blockStream.on('end', function () {
            console.log('stream end signal received');
        });
    }


    private getLocatorHashes(localTip: number): Promise<string[]> {
        let locatorHeights = this.getLocatorHeights(localTip)

        // There block database was empty, so an pre-genesis block hash is passed
        if (locatorHeights.length == 0) {
            return Promise.resolve(["AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="])
        }
        // Only one block height was returned (1) so we return a promise to it as a list
        else if (locatorHeights.length == 1) {
            return this.getHashFromHeight(locatorHeights[0]).then((locatorHash) => {
                return Promise.resolve([locatorHash])
            })
        } else {
            // This is the expected case where heights were built.
            let locatorHashPromises = (locatorHeights.map(h => (this.getHashFromHeight(h))))
            return Promise.all(locatorHashPromises)
        }

    }

    private async getHashFromHeight(height: number) {
        return this.db.block.get({ 'height': height }).then((block?: Block) => {
            if(block){
                return block.hash
            }else{
                throw new Error("attempted to get a block height not stored locally")
            }
        })
    }

    public getTip(): Promise<number> {
        return this.db.block.orderBy('height').reverse().first().then((block?: Block) => {
            return block ? block.height : Promise.resolve(0)
        })

    }
}