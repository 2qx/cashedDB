import Console from './console';

const console = new Console(); 

document.addEventListener('DOMContentLoaded', async function () {
    
    //
    // Bootstrapping
    //
    
    // Initialize our Console widget - it will log browser window.
    document
        .getElementById('consoleArea')
        .appendChild(console.textarea);

    

    // Test it:
    console.log("Browser: Hello!");

    try {
        //
        // Let's clear and re-seed the database:
        //
        //console.log("Clearing database...");
        //await db.delete();
        //await db.open();
        //await Promise.all([db.contacts.clear(), db.emails.clear(), db.phones.clear()]);
        
        
        if (window.Worker) {
            const dbWebWorker = new Worker("./cashedDbWorker.js", { type: "module" });
            let startWorkerButton = document.getElementById('startWorker')
            startWorkerButton.onclick = function() {
                dbWebWorker.postMessage({command:'init'});
              console.log('Message posted to worker');
            }
        
        
            dbWebWorker.onmessage = function(e) {
                console.log('web worker: ' + e.data);
            }
        } else {
            console.log('Your browser doesn\'t support web workers.')
        }
    } catch (ex) {
        console.error(ex);
    }
});

