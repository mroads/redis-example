import DBService from '../services/redis-db-service';

export default class WebSocketController {

    socket;
    dbInstance: DBService;

    constructor(socket) {
        this.socket = socket;
        this.initializeListeners();
        this.dbInstance = new DBService();
    }

    initializeListeners() {
        this.socket.on('messages', this.getMessages);
        this.socket.on('send', this.sendMessage);
        // this.socket.on('subscribeToMessages', this.subscribeToMessages);
    }

    sendMessage = () => {
        this.dbInstance.sendMsg(this.socket, 'send');
    }

    getMessages = (callback) => {
        this.dbInstance.getMessagesFromRedis(this.socket, 'messages', callback);
    }

    subscribeToMessages = (callback) => {
        this.dbInstance.subscribeToMessagesFromRedis(this.socket, 'messages', callback);
    }

}