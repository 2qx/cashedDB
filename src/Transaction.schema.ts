import {
    RxJsonSchema
} from 'rxdb';

const transactionSchema: RxJsonSchema = {
    title: 'transaction schema',
    description: 'describes a transaction',
    version: 0,
    keyCompression: true,
    type: 'object',
    properties: {
        hash: {
            type: 'string',
            default: '',
            primary: true
        },
        blockHeight: {
            type: 'number',
            minimum: 0
        },
        version: {
            type: 'number',
            minimum: 1
        },
        inputs: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    index: {
                        type: 'number'
                    },
                    outpoint: {
                        type: 'object',
                        properties: {
                            index: {
                                type: 'number'
                            },
                            hash: {
                                type: 'string'
                            }
                        }
                    },
                    signatureScript: {
                        type: 'string'
                    },
                    sequence: {
                        type: 'number'
                    },
                    value: {
                        type: 'number'
                    },
                    
                    previousScript: {
                        type: 'string'
                    },
                    address: {
                        type: 'string'
                    },
                }
            }
        },
        outputs: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    index: {
                        type: 'number'
                    },
                    value: {
                        type: 'number'
                    },   
                    pubkeyScript: {
                        type: 'string'
                    },
                    address: {
                        type: 'string'
                    },
                    scriptClass: {
                        type: 'string'
                    },   
                    disassembledScript: {
                        type: 'string'
                    },
                }
            }
        },
        lockTime: {
            type: 'number',
            minimum: 0
        }
    },
    indexes: [
        'hash', 
        'blockHeight', 
        'inputs.[].address',
        'outputs.[].address'
      ],
    required: ['hash', 'blockHeight', 'version', 'inputs', 'outputs']
};

export default transactionSchema;