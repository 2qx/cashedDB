import Dexie from 'dexie';
import { DexieOptions } from 'dexie';
/*
*    The general layout is 
*
*    Address
*      Confirmed<Transaction>
*        BlockHash    
*      Unconfirmed<Transaction>
*        BlockHash    
*
*    Block
*/

export default class CashedDB extends Dexie {

    block!: Dexie.Table<Block, number>;
    txn!: Dexie.Table<ConfirmedTransaction, number>;
    mempool!: Dexie.Table<MempoolTransaction, number>;
    address!: Dexie.Table<Address, number>;

    constructor(args: DexieOptions) {

        super("cashedDB", args);

        var db = this;


        //
        // Define tables and indexes
        //
        db.version(1).stores({
            block: 'height, &hash, previousBlock',
            txn: '&hash, blockHeight, blockHash',
            mempool: '&hash, blockHeight, blockHash',
            address: '&address',
        });

        // Let's physically map Address class to address table.
        // This will make it possible to call loadAddresses()
        // directly on retrieved database objects.
        db.address.mapToClass(Address);
        db.block.mapToClass(Block);
        db.txn.mapToClass(ConfirmedTransaction);
        db.mempool.mapToClass(MempoolTransaction);
    }
}

/* This is a 'physical' class that is mapped to
    * the address table. We can have methods on it that
    * we could call on retrieved database objects.
    */
   export class Address {

    address: string;
    balance: number;
    txn: ConfirmedTransaction[];
    mempool: MempoolTransaction[];

    constructor(address: string) {
        this.address = address;
        this.balance = 0
        this.txn = []
        this.mempool = []
        // Define navigation properties.
        // Making them non-enumerable will prevent them from being handled by indexedDB
        // when doing put() or add().
        Object.defineProperties(this, {
            txn: { value: [], enumerable: false, writable: true },
            mempool: { value: [], enumerable: false, writable: true }
        });
    }

    async loadNavigationProperties() {
        [this.txn, this.mempool] = await Promise.all([
            // db.txn.where('inputsList.[].address').equals(this.address).or('outputsList.[].address').equals(this.address).toArray(),
            // db.mempool.where('inputsList.[].address').equals(this.address).or('outputsList.[].address').equals(this.address).toArray()
        ]);
    }

    // save() {
    //     return db.transaction('rw', db.address, db.txn, db.mempool, async () => {

    //         // Add or update our selves. If add, record this.id.
    //         await db.address.put(this);

    //         // Save all navigation properties (arrays of emails and phones)
    //         // Some may be new and some may be updates of existing objects.
    //         // put() will handle both cases.
    //         // (record the result keys from the put() operations into emailIds and phoneIds
    //         //  so that we can find local deletes)
    //         let [confirmedHashes, mempooldHashes] = await Promise.all([
    //             Promise.all(this.txn.map(tx => db.txn.put(tx))),
    //             Promise.all(this.mempool.map(tx => db.mempool.put(tx)))
    //         ]);

    //     });
    // }
}


/* Just for code completion and compilation - defines
    * the interface of objects stored in the transaction tables.
    */
   export class BaseTransaction {
    hash: string;
    version: number;
    timestamp: number;
    size: number;
    inputsList: ITransactionInput[];
    outputsList: ITransactionOutput[];
    lockTime: number;
    computedHash?: string;

    constructor(
        hash: string,
        version: number,
        timestamp: number,
        size: number,
        inputsList: ITransactionInput[],
        outputsList: ITransactionOutput[],
        lockTime: number,
        computedHash?: string,
    ) {
        this.hash = hash;
        this.version = version;
        this.timestamp = timestamp;
        this.size = size;
        this.inputsList = inputsList;
        this.outputsList = outputsList;
        this.lockTime = lockTime
    }
}

export class ConfirmedTransaction extends BaseTransaction {

    blockHeight: number;
    blockHash: string;

    constructor(
        hash: string,
        blockHeight: number,
        blockHash: string,
        version: number,
        timestamp: number,
        size: number,
        inputsList: ITransactionInput[],
        outputsList: ITransactionOutput[],
        lockTime: number,
        computedHash?: string,
    ) {
        super(hash, version, timestamp, size, inputsList, outputsList, lockTime)
        this.blockHeight = blockHeight;
        this.blockHash = blockHash;
    }
}

export class MempoolTransaction {


    transaction: BaseTransaction
    addedTime: number
    addedHeight: number
    fee: number
    feePerKb: number
    startingPriority: number

    constructor(
        transaction: BaseTransaction,
        addedTime: number,
        addedHeight: number,
        fee: number,
        feePerKb: number,
        startingPriority: number
    ) {
        this.transaction = transaction;
        this.addedTime = addedTime
        this.addedHeight = addedHeight
        this.fee = fee
        this.feePerKb = feePerKb
        this.startingPriority = startingPriority
    }
}



export interface ITransactionOutpoint {
    index: number,
    hash: string
}

export interface ITransactionInput {

    index: number;
    outpoint: ITransactionOutpoint;
    signatureScript: string;
    sequence: number;
    value: number;
    previousScript: string;
    address: string;
};

export interface ITransactionOutput {

    index: number;
    value: number;

    pubkeyScript: string;
    address: string;
    scriptClass: string;
    disassembledScript: string;
};



/* Just for code completion and compilation - defines
    * the interface of objects stored in the block table.
    */
   export class Block {

    height: number;
    hash: string;

    version: number;
    previousBlock: string;
    merkleRoot: string;
    timestamp: number;
    bits: number;
    nonce: number;
    filter?: string;
    isVerified?: number;

    constructor(
        height: number,
        hash: string,
        version: number,
        previousBlock: string,
        merkleRoot: string,
        timestamp: number,
        bits: number,
        nonce: number
    ) {
        this.height = height;
        this.hash = hash;
        this.version = version;
        this.previousBlock = previousBlock;
        this.merkleRoot = merkleRoot;
        this.timestamp = timestamp;
        this.bits = bits;
        this.nonce = nonce;
    }

};

