import {
    createRxDatabase,
    addRxPlugin
} from 'rxdb';



// import typings
import {
    BlockDocument,
    TransactionDocument,
    CashedDatabase,
    DatabaseCollections,
    BlockDocType,
    TransactionDocType
} from './cashedSchema';


import blockSchema from './Block.schema';
import transactionSchema from './Transaction.schema';

import * as PouchdbAdapterIdb from 'pouchdb-adapter-idb';

const collections = [
    {
        name: 'block',
        schema: blockSchema,
        sync: true
    },
    {
        name: 'transaction',
        schema: transactionSchema,
        sync: true
    }
];



export class CashedDB {

    public db: Promise<CashedDatabase>
    public useAdapter: any

    constructor() {
        
        if (typeof window === 'undefined') {
            addRxPlugin(require('pouchdb-adapter-leveldb'));
            this.useAdapter = require('memdown');    
        } else {
            addRxPlugin(PouchdbAdapterIdb);
            this.useAdapter = 'idb';
        }
        this.db = this._create()
    }

    /**
     * creates the database
     */
    private async _create(): Promise<CashedDatabase> {
        console.log('DatabaseService: creating database..');
        const db = await createRxDatabase<DatabaseCollections>({
            name: 'bch',
            adapter: this.useAdapter
        });
        console.log('DatabaseService: created database');


        // create collections
        console.log('DatabaseService: create collections');

        await Promise.all(collections.map(colData => db.collection(colData)));

        // hooks
        console.log('DatabaseService: add hooks');
        db.collections.block.preInsert((docObj: BlockDocType) => {

            const height = docObj.height;
            return db.collections.block
                .findOne({
                    selector: {
                        height
                    }
                })
                .exec()
                .then((has: BlockDocument | null) => {
                    if (has != null) {
                        //    throw new Error('height already there');
                    }
                    return db;
                });
        }, true);

        db.collections.transaction.preInsert((docObj: TransactionDocType) => {
            const hash = docObj.hash;
            return db.collections.transaction
                .findOne({
                    selector: {
                        hash
                    }
                })
                .exec()
                .then((has: TransactionDocument | null) => {
                    if (has != null) {
                        //    throw new Error('hash already there');
                    }
                    return db;
                });
        }, true);

        return db;
    }
     
}
