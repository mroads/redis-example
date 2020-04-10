var Redis = require("ioredis");
var redisClient_publish = new Redis(process.env.REDIS_URL);
var redisClient_subscribe = new Redis(process.env.REDIS_URL);
const channel_history_max = 100;

export default class DBService {

    // getMessagesFromRedis = (event, callback) => {
    //     this.getDataBasedOnEvent(event, callback);
    //     // this.addRedisSubscriber(event, callback);
    // }

    // subscribeToMessagesFromRedis = (event, callback) => {
    //     this.addRedisSubscriber(event, callback);
    // }

    // sendMsg = (message_text,callback) => {
    //         console.log("message_text", message_text);
    //         var message = JSON.stringify({
    //             message: message_text
    //         })
    //         redisClient_publish.zadd('messages', 3, message);
    //         console.log("publishing data to messages channel", message);
    //         redisClient_publish.publish('messages', message);
    //     callback();
    // }

    // getDataBasedOnEvent = (event, callback) => {
    //     var data = redisClient_subscribe.zrange(event, -1 * channel_history_max, -1).then(function(result) {
    //         return result.map(function(x) {
    //         return JSON.parse(x);
    //         });
    //     });
    //     Promise.all([data]).then(function(values) {
    //         var subscriptionData = values[0];
    //         console.log("subscriptionData", subscriptionData);
    //         subscriptionData.forEach(msg => {
    //             callback(event, msg);
    //         })
    //     }).catch(function(reason) {
    //         console.log('ERROR: ' + reason);
    //     });
    // }

    addRedisSubscriber = (event, callback) => {
        if (redisClient_subscribe) {
            redisClient_subscribe.subscribe(event);
            redisClient_subscribe.on('message', function(channel, message) {
                console.info('message',JSON.parse(message));
                callback(JSON.parse(message));
            });
        } else {
            console.error('Redis client is not defined in '+event);
            throw(new Error('Redis client is not defined in '+event));
        }
    }

    subscribeToStore = (storeId,callback)=>{
        this.addRedisSubscriber(storeId,callback);
    }
    
    sendCheckUpdate = (storeId,data) => {
        console.log("message_text", storeId);
        redisClient_publish.zadd(storeId, 3, JSON.stringify(data));
        console.log("publishing data to messages channel", data);
        redisClient_publish.publish(storeId, JSON.stringify(data));
    }

}