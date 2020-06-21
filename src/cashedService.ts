import { CashedDatabase } from "../index";
import { GrpcClient } from "../../grpc-bchrpc-browser";
import { checkpoints } from "./Config"
import {
    BlockDocument,
    BlockDocFromObject,
    TransactionDocFromObject
} from "./cashedSchema";
import transactionSchema from "./Transaction.schema";


export class CashedService {

    public db: CashedDatabase
    public client: GrpcClient
    public useAdapter: any

    constructor({ db, client }: { db: CashedDatabase, client: GrpcClient }) {
        this.client = client
        this.db = db
    }

    // private utilGroupBy = (items, key) => items.reduce(
    //     (result, item) => ({
    //       ...result,
    //       [item[key]]: [
    //         ...(result[item[key]] || []),
    //         item,
    //       ],
    //     }), 
    //     {},
    //   );

    // initially populates a database
    public async bootstrap() {
        let blockInfoPromises = checkpoints.map((p) => {
            console.log(this.client.utilHexToU8(p.hashHex!).reverse())
            return this.client.getBlockInfo({hash:this.client.utilHexToU8(p.hashHex!).reverse()}, null)
        })
        Promise.all(blockInfoPromises).then(async (blockInfos) => {
            let blockDocs = (blockInfos).map(i => BlockDocFromObject(i.getInfo()!.toObject()))
            console.log(blockDocs)
            try {
                let insertedBlockPromises = await this.db.collections.block.bulkInsert(blockDocs)
            } catch (error) {
                console.log(error)
            }
        }).catch(function (error) {
            console.log(error);
       });

    }


    // syncs a database, 
    public async sync() {

        let bestBlockHeight = (await this.client.getBlockchainInfo({}, null)).getBestHeight()
        console.log("current network height: " + bestBlockHeight)


        // get current state headers currently in the database
        
        let currentTip = await this.getTip()
        let blockHeaderWatchdogLimit = 765;
        for (var watchdog = 0; bestBlockHeight > currentTip && watchdog < blockHeaderWatchdogLimit ; watchdog++)  {
            console.log("current local height: " + currentTip)

            const locatorHashes = await this.getLocatorHashes()
            console.log("locator hashes: " + locatorHashes)
            const res = await this.client.getHeaders({blockLocatorHashes: locatorHashes}, null);
            let blockDocs = (res.getHeadersList()).map(x => BlockDocFromObject(x.toObject()))
            try {
                let insertedBlockPromises = await this.db.collections.block.bulkInsert(blockDocs)
            } catch (error) {
                console.log(error)
            }
            // get the height of the current block
            currentTip = await this.getTip()
            
        }

    }

    public async reorg(){

    }

    public update() {

    }

    /*
    *    Get a sparse list of block heights, starting from the currently known local tip,
    *    getting sparser back to genisis block.
    */
    private async getLocatorHeights() {

        let step = 1
        let bucket = 10
        let cursor = await this.getTip()
        let heightLocators: number[] = []
        if (cursor > 0) {
            for (var watchdog = 0; cursor > 0 && watchdog < 20 ; watchdog++)  {
                heightLocators.push.apply(
                    heightLocators,
                    [...Array(bucket).keys()].map(x => cursor - x * step)
                );
                cursor -= step * bucket;
                step *= 10;
            }
            // remove negative block heights
            heightLocators = heightLocators.filter(h => h > 0)
            // add the genesis block
            if(heightLocators[heightLocators.length-1] != 1){
                heightLocators.push(1)
            }
            return heightLocators
        }
        // if there was no block tip locally, just return an empty list.
        return []


    }



    private async getLocatorHashes() : Promise<string[]> {
        let locatorHeights = await this.getLocatorHeights()

        // There block database was empty, so an pre-genesis block hash is passed
        if (locatorHeights.length == 0) {
            return Promise.resolve(["AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="])
        } 
        // Only one block height was returned (1) so we return a promise to it as a list
        else if (locatorHeights.length == 1){
            return Promise.resolve([await this.getHashFromHeight(locatorHeights[0])])
        } else {
        // This is the expected case where heights were built.
            let locatorHashPromises = (locatorHeights.map(  h  => ( this.getHashFromHeight(h))))
            return Promise.all(locatorHashPromises)
            .then((locatorHashes)=>{return locatorHashes});
        }

    }

    private async getHashFromHeight(height: number) {
        return  (await this.db.collections.block.findOne().where('height').eq(height).exec())!.hash
    }

    public async getTip(): Promise<number> {
        let query = this.db.collections.block.findOne().sort("-height")
        let height = (await query.exec())?.height
        return height ? height : Promise.resolve(0)
    }
}