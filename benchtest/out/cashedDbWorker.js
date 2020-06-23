import './cashedDB.js';
import './bchrpc.js';
import { handlePing } from './ping.js'

export default class Console {

    constructor() {
    }

    log(txt) {
        postMessage(txt);
    }
}
console = new Console();

onmessage = function (messageObject) {
    let m = messageObject.data;
    console.log('cashedDbWorker: Message received from main script');
    switch (m.command) {
        case 'init':
            let pong = handlePing()
            postMessage(pong);
            
            const mainnet = new GrpcClient(
                {
                    url: "https://bchd.sploit.cash",
                    testnet: false,
                    options: {}
                }
            );
            postMessage('cashedDbWorker: bootstrapping database');
            let db = new CashedDB()
            let service = new CashedService({ db: db, client: mainnet })
            service.bootstrap()
            postMessage('cashedDbWorker: getting recent headers');
            service.sync()
            break;
        case 'connect':
            postMessage('cashedDbWorker: The worker is already running');
            break;
        case 'address':
            switch(m.subcommand){
                case 'add':
                    postMessage('cashedDbWorker: adding address - ' + m.args);
                    break;
                case 'remove':
                    postMessage('cashedDbWorker: removing address - ' + m.args);
            }
            break;
        case 'ping':
            postMessage('cashedDbWorker: pong');
            break;
        case 'stop':
            console.log('cashedDbWorker: can\'t stop won\'t stop');
            break;
        default:
            console.log('cashedDbWorker: please pass a command');
            postMessage('command not recognized: ' + m.command);
    }
}