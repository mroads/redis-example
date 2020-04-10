var Redis = require("ioredis");
var redisClient_publish = new Redis();
var redisClient_subscribe = new Redis();
const channel_history_max = 100;

export default class DBService {

    getMessagesFromRedis = (event, callback) => {
        this.getDataBasedOnEvent(event, callback);
        // this.addRedisSubscriber(event, callback);
    }

    subscribeToMessagesFromRedis = (event, callback) => {
        this.addRedisSubscriber(event, callback);
    }

    sendMsg = (callback) => {
        const callbackParam = function(message_text) {
            console.log("message_text", message_text);
            var message = JSON.stringify({
                message: message_text
            })
            redisClient_publish.zadd('messages', 3, message);
            console.log("publishing data to messages channel", message);
            redisClient_publish.publish('messages', message);
        }
        callback(callbackParam);
    }

    getDataBasedOnEvent = (event, callback) => {
        var data = redisClient_subscribe.zrange(event, -1 * channel_history_max, -1).then(function(result) {
            return result.map(function(x) {
            return JSON.parse(x);
            });
        });
        Promise.all([data]).then(function(values) {
            var subscriptionData = values[0];
            console.log("subscriptionData", subscriptionData);
            subscriptionData.forEach(msg => {
                callback(event, msg);
            })
        }).catch(function(reason) {
            console.log('ERROR: ' + reason);
        });
    }

    addRedisSubscriber = (event, callback) => {
        var client = new Redis();
        if (client) {
            client.subscribe(event);
            client.on('message', function(channel, message) {
                callback(event, JSON.parse(message));
            });
        } else {
            console.error('Redis client is not defined in '+event);
        }
    }

}