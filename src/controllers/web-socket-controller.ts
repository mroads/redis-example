import DBService from '../services/redis-db-service';
import check from '../data/check';

export default class WebSocketController {

    socket;
    dbInstance: DBService;

    constructor(socket) {
        this.socket = socket;
        this.initializeListeners();
        this.dbInstance = new DBService();
    }

    initializeListeners() {
        // this.socket.on('messages', this.getMessages);
        // this.socket.on('send', this.sendMessage);
        this.socket.on('subscribeToStore', this.subscribeToStore);
        this.socket.on('sendCheckUpdate', this.sendCheckUpdate);
    }


    subscribeToStore = (storeId,callback) => {
        try{
            this.dbInstance.subscribeToStore(storeId,(data)=>{
                this.socket.emit('subscribeToStore',data);
            });
            callback(null,'success');
        } catch(error){
            callback(error,null);
        }
    }

    sendCheckUpdate = (storeId,callback) => {
        try{
            check.checkHeaderId = new Date().getTime();
            this.dbInstance.sendCheckUpdate(storeId,check);
            callback(null,'success');
        } catch(error){
            callback(error,null);
        }
    }

}