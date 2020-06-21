import {
    RxJsonSchema
} from 'rxdb';

const blockSchema: RxJsonSchema = {
    title: 'block schema',
    description: 'describes a block',
    version: 0,
    keyCompression: true,
    type: 'object',
    properties: {
        height: {
            type: 'number',
            minimum: 0
        },
        hash: {
            type: 'string',
            default: '',
            primary: true
        },
        version: {
            type: 'number',
            minimum: 1
        },
        previousBlock: {
            type: 'string',
            default: ''
        },
        merkleRoot: {
            type: 'string',
            default: ''
        },
        timestamp: {
            type: 'number',
            minimum: 0
        },
        bits: {
            type: 'number',
        },
        nonce: {
            type: 'number',
        },
        isVerified: {
            type: 'number',
            default: 0
        }
    },
    indexes: [
        'hash', 
        'height',
      ],
    required: ['height', 'hash', 'version', 'previousBlock', 'merkleRoot', 'timestamp', 'bits', 'nonce']
};

export default blockSchema;