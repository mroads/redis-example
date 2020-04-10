const io = require('socket.io-client')
var fs = require('fs');


const stores = {};

for(let i=100;i<150;i++){
    stores[i] = {
        id: i,
        checks:{}
    }
}


function Connection(store){
    return new Promise((resolve)=>{
        // const socket = io(location.origin);
        const socket = io('https://rtd.dev.onedine.com');


        const checks = store.checks;

        socket.on('connect', function () {
            console.log('connected');
            // subscribeToStore();
            start();
        });
        async function start(){
            let count = 0;
            while(count<100){
                console.info('iteration ',count);
                await sendMessage();
                count++;
            }
            resolve();
        }


        function sendMessage(){
            const promise = new Promise((resolve)=>{
                const id = new Date().getTime();
                checks[id] = {sentAt:new Date()};
                subscribeToStore(()=>{
                    sendCheckUpdate(id);
                },()=>{
                    socket.off('subscribeToStore')
                    resolve();
                });
                
            });
            return promise;
        }

        socket.on('disconnect', function (reason) {
            console.log('reason', reason);
        });

        function subscribeToStore(callback,subscriber){
            socket.emit('subscribeToStore',store.id,(error,data)=>{
                // console.log('response subscribeToStore', error, data);
                callback && callback();
                socket.on('subscribeToStore',(data)=>{
                    // response.innerHTML = JSON.stringify(data);
                    const existingCheck = checks[data.checkHeaderId];
                    // console.info('data.checkHeaderId',data.checkHeaderId);
                    const timeTaken = new Date().getTime() - new Date(existingCheck.sentAt).getTime();
                    checks[data.checkHeaderId] = { timeTaken,size:JSON.stringify(data).length/1000};
                    console.info('checks',Object.keys(checks).length);
                    subscriber && subscriber();
                })
            })
        }

        function sendCheckUpdate(id){
            socket.emit('sendCheckUpdate',store.id,id||new Date().getTime(),(error,data)=>{
                // console.log('response sendCheckUpdate', error, data);
            })
        }
    })
        
}

const promises = Object.values(stores).map(store=>  Connection(store));

Promise.all(promises).then(()=>{
    console.info('completed',JSON.stringify(stores).length);
    fs.writeFileSync('output.json', JSON.stringify(stores), function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
})