var Redis = require("ioredis");
var redisClient = new Redis();
const channel_history_max = 100;

export default class DBService {

    getMessagesFromRedis = (socket, event, callback) => {
        console.log("getMessagesFromRedis invoked");
        this.getDataBasedOnEvent(event, socket, callback);
        // this.addRedisSubscriber(event, socket, callback);
    }

    subscribeToMessagesFromRedis = (socket, event, callback) => {
        this.addRedisSubscriber(event, socket, callback);
    }

    sendMsg = (socket, event) => {
        console.log("send message invoked");
        socket.on('send', function(message_text) {
            console.log("message_text send msg", message_text);
            var message = JSON.stringify({
                message: message_text
            })
            redisClient.zadd('messages', 3, message); 
            redisClient.publish('messages', message);
        });
    }

    getDataBasedOnEvent = (event, socket, callback) => {
        var data = redisClient.zrange(event, -1 * channel_history_max, -1).then(function(result) {
            return result.map(function(x) {
            return JSON.parse(x);
            });
        });
        Promise.all([data]).then(function(values) {
            var subscriptionData = values[0];
            console.log("subscriptionData", subscriptionData);
            subscriptionData.forEach(msg => {
                socket.emit(event, msg, callback);
            })
        }).catch(function(reason) {
            console.log('ERROR: ' + reason);
        });
    }

    addRedisSubscriber = (event, socket, callback) => {
        var client = new Redis();
        if (client) {
            client.subscribe(event);
            client.on('message', function(channel, message) {
                socket.emit(event, JSON.parse(message), callback);
            });
        } else {
            console.error('Redis client is not defined in '+event);
            callback(new Error('Redis client is not defined'));
        }
    }

}