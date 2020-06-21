import {
    RxDatabase,
    RxCollection,
    RxDocument,
} from 'rxdb';

export type BlockDocType = {
    height: number;
    hash: string;

    version: number;
    previousBlock: string;
    merkleRoot: string;
    timestamp: number;
    bits: number;
    nonce: number;
    isVerified?: number;
};

export function BlockDocFromObject(o: any) {
    return {
        height: o.height,
        hash: o.hash,
        version: o.version,
        previousBlock: o.previousBlock,
        merkleRoot: o.merkleRoot,
        timestamp: o.timestamp,
        nonce: o.nonce,
        bits: o.bits
    } as BlockDocType
}

export type BlockDocMethods = {
    hashHex: (v: string) => string;
};


export type BlockDocument = RxDocument<BlockDocType, BlockDocMethods>;

// we declare one static ORM-method for the collection
export type BlockCollectionMethods = {
    countAllDocuments: () => Promise<number>;
}


// and then merge all our types
export type BlockCollection = RxCollection<BlockDocType, BlockDocMethods, BlockCollectionMethods>;

export type TransactionDocType = {

    hash: string;
    blockHeight: number;

    version: number;
    inputs: TransactionInputDocType[];
    outputs: TransactionOutputDocType[];
    lockTime: number;
    isVerified?: number;
};

export function TransactionDocFromObject(t:any) {
    return {
        blockHeight: t.blockHeight,
        hash: (typeof t?.hash === 'string') ?  t.hash: null,

        version: t.version,
        lockTime: t.lockTime,
        inputs: t.inputsList?.map((i:any) => ({
            index: i.index,
            outpoint: {
                index: i.outpoint?.index,
                hash:  (typeof i.outpoint?.hash === 'string') ? i.outpoint?.hash : null
            },
            signatureScript: i.signatureScript,
            sequence: i.sequence,
            value: i.value,
            previousScript: i.previousScript,
            address: i.address
        })),
        outputs: t.outputsList?.map((o:any) => ({
            index: o.index,
            pubkeyScript: o.pubkeyScript,
            scriptClass: o.scriptClass,
            disassembledScript: o.disassembledScript,
            address: o.address,
            value: o.value,
        }))
    } as TransactionDocType
}

export type TransactionInputOutpointDocType = {
    index: number,
    hash: string
}

export type TransactionInputDocType = {

    index: number;
    outpoint: TransactionInputOutpointDocType;
    signatureScript: string;
    sequence: number;
    value: number;
    previousScript: string;
    address: string;
};

export type TransactionOutputDocType = {

    index: number;
    value: number;

    pubkeyScript: string;
    address: string;
    scriptClass: string;
    disassembledScript: string;
};

export type TransactionDocMethods = {
    hashHex: (v: string) => string;
};

export type TransactionDocument = RxDocument<TransactionDocType, TransactionDocMethods>;

// we declare one static ORM-method for the collection
export type TransactionCollectionMethods = {
    countAllDocuments: () => Promise<number>;
}

// and then merge all our types
export type TransactionCollection = RxCollection<TransactionDocType, TransactionDocMethods, TransactionCollectionMethods>;


export type DatabaseCollections = {
    block: BlockCollection
    transaction: TransactionCollection
}

export type CashedDatabase = RxDatabase<DatabaseCollections>;
