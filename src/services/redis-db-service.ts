var Redis = require("ioredis");
var redisClient = new Redis();
var redis_subscribers = {};
import * as LZString from 'lz-string';
const JSONFORMAT = "JSON";
const compressionEnabled = false;
const compressionType = JSONFORMAT;
const newResponseFormat = false;
const channel_history_max = 100;

export default class DBService {

    static getAllCheckUpdates = (storeId, employeeId, socket, event, callback) => {
        DBService.addRedisSubscriber(event, socket, callback);
        // if (this.connection.isOpen()) {
        //     return r.table('SaCheckUpdate')
        //         .filter(r.row('storeId').eq(storeId))
        //         .filter(r.row('employeeId').eq(employeeId))
        //         .run(this.connection)
        //         .then(cursor => cursor.toArray())
        // } else {
        //     throw new Error('rethinkdb connection closed in subscribe menu update');
        // }
    }


    static getStoreCheckUpdates = (storeId, socket, event, callback) => {
        DBService.addRedisSubscriber(event, socket, callback);

        // if (this.connection.isOpen()) {
        //     return r.table('SaCheckUpdate')
        //         .filter(r.row('storeId').eq(storeId))
        //         .run(this.connection)
        //         .then(cursor => cursor.toArray())
        // } else {
        //     throw new Error('rethinkdb connection closed in getStoreCheckUpdates');
        // }
    }


    static getNotifications = (storeId, extraData, socket, event, callback) => {
        DBService.addRedisSubscriber(event, socket, callback);

        // const { employeeId, deviceTypeId, jobTypeId } = extraData || { employeeId: null, deviceTypeId: null, jobTypeId: null };
        // if (this.connection.isOpen()) {
        //     let query = r.table('SaNotification')
        //         .filter(r.row('storeId').eq(storeId));
        //     if (employeeId) {
        //         query = query.filter(r.row('employeeId').eq(employeeId))
        //     }
        //     if (deviceTypeId) {
        //         query = query.filter(r.row('deviceTypeId').eq(deviceTypeId))
        //     }
        //     if (jobTypeId) {
        //         query = query.filter(r.row('jobTypeId').eq(jobTypeId))
        //     }
        //     return query.run(this.connection)
        //         .then(cursor => cursor.toArray())
        // } else {
        //     throw new Error('rethinkdb connection closed in getEmployeeNotifications');
        // }
    }



    static subscribeNotifications = (storeId, extraData, socket, event, callback) => {
        DBService.addRedisSubscriber(event, socket, callback);

        // const { employeeId, deviceTypeId, jobTypeId, includeInitial } = extraData || { employeeId: null, deviceTypeId: null, jobTypeId: null, includeInitial: false };
        // if (this.connection.isOpen()) {
        //     let query = r.table('SaNotification')
        //         .filter(r.row('storeId').eq(storeId));
        //     if (employeeId) {
        //         query = query.filter(r.row('employeeId').eq(employeeId))
        //     }
        //     if (deviceTypeId) {
        //         query = query.filter(r.row('deviceTypeId').eq(deviceTypeId))
        //     }
        //     if (jobTypeId) {
        //         query = query.filter(r.row('jobTypeId').eq(jobTypeId))
        //     }
        //     return query.changes({
        //         squash: true,
        //         includeTypes: true,
        //         includeInitial: !!includeInitial
        //     }).run(this.connection).then(data => data.each((error, row) => {
        //         callback(error, row);
        //     }));
        // } else {
        //     throw new Error('rethinkdb connection closed in subscribeNotifications');
        // }
    }


    static getFireboardChecks = (storeId, extraData, socket, event, callback) => {
        DBService.addRedisSubscriber(event, socket, callback);

        // const { employeeId, deviceTypeId, jobTypeId } = extraData || { employeeId: null, deviceTypeId: null, jobTypeId: null };
        // if (this.connection.isOpen()) {
        //     let query = r.table('SaFireBoardUpdate')
        //         .filter(r.row('storeId').eq(storeId));
        //     if (employeeId) {
        //         query = query.filter(r.row('employeeId').eq(employeeId))
        //     }
        //     if (deviceTypeId) {
        //         query = query.filter(r.row('deviceTypeId').eq(deviceTypeId))
        //     }
        //     if (jobTypeId) {
        //         query = query.filter(r.row('jobTypeId').eq(jobTypeId))
        //     }
        //     return query.run(this.connection)
        //         .then(cursor => cursor.toArray())
        // } else {
        //     throw new Error('rethinkdb connection closed in getFireboardChecks');
        // }
    }


    static subscribeFireboardChecks = (storeId, extraData, socket, event, callback) => {
        DBService.addRedisSubscriber(event, socket, callback);

        // const { employeeId, deviceTypeId, jobTypeId, includeInitial } = extraData || { employeeId: null, deviceTypeId: null, jobTypeId: null, includeInitial: false };
        // if (this.connection.isOpen()) {
        //     let query = r.table('SaFireBoardUpdate')
        //         .filter(r.row('storeId').eq(storeId));
        //     if (employeeId) {
        //         query = query.filter(r.row('employeeId').eq(employeeId))
        //     }
        //     if (deviceTypeId) {
        //         query = query.filter(r.row('deviceTypeId').eq(deviceTypeId))
        //     }
        //     if (jobTypeId) {
        //         query = query.filter(r.row('jobTypeId').eq(jobTypeId))
        //     }
        //     return query.changes({
        //         squash: true,
        //         includeTypes: true,
        //         includeInitial: !!includeInitial
        //     }).run(this.connection).then(data => data.each((error, row) => {
        //         callback(error, row);
        //     }));
        // } else {
        //     throw new Error('rethinkdb connection closed in subscribeFireboardChecks');
        // }
    }


    static subscribeMenuUpdate = (storeId, socket, event, callback) => {
        DBService.addRedisSubscriber(event, socket, callback);

        // if (this.connection.isOpen()) {
        //     return r.table('SaMenuUpdate')
        //         .filter(r.row('storeId').eq(storeId))
        //         .changes({
        //             squash: true,
        //             includeInitial: true,
        //             includeTypes: true,
        //         }).run(this.connection).then(data => data.each((error, row) => {
        //             callback(error, row);
        //         }));
        // } else {
        //     throw new Error('rethinkdb connection closed in subscribe menu update');
        // }
    }


    static getMenu = (storeId, socket, event, callback) => {
        DBService.addRedisSubscriber(event, socket, callback);

        // if (this.connection.isOpen()) {
        //     return r.table('SaMenuUpdate')
        //         .filter(r.row('storeId').eq(storeId))
        //         .run(this.connection)
        //         .then(cursor => cursor.toArray())

        // } else {
        //     throw new Error('rethinkdb connection closed in subscribe menu update');
        // }
    }

    static subscribeCheckUpdate = (storeId, socket, event, callback) => {
        DBService.addRedisSubscriber(event, socket, callback);
        // if (this.connection.isOpen()) {
        //     return r.table('SaCheckUpdate')
        //         .filter(r.row('storeId').eq(storeId))
        //         .changes({
        //             squash: true,
        //             includeInitial: true,
        //             includeTypes: true,
        //         }).run(this.connection).then(data => data.each((error, row) => {
        //             callback(error, row);
        //         }));
        // } else {
        //     throw new Error('rethinkdb connection closed in subscribe check update');
        // }
    }

    static subscribeStoreCheckUpdate = (storeId, socket, event, callback) => {
        DBService.addRedisSubscriber(event, socket, callback);

        // if (this.connection.isOpen()) {
        //     return r.table('SaCheckUpdate')
        //         .filter(r.row('storeId').eq(storeId))
        //         .changes({
        //             squash: true,
        //             includeTypes: true,
        //         }).run(this.connection).then(data => data.each((error, row) => {
        //             callback(error, row);
        //         }));
        // } else {
        //     throw new Error('rethinkdb connection closed in subscribe check update');
        // }
    }

    static subscribeEmployeeCheckUpdate = (storeId, employeeId, socket, event, callback) => {
        DBService.addRedisSubscriber(event, socket, callback);

        // if (this.connection.isOpen()) {
        //     return r.table('SaCheckUpdate')
        //         .filter(r.row('storeId').eq(storeId))
        //         .filter(r.row('employeeId').eq(employeeId))
        //         .changes({
        //             squash: true,
        //             // includeInitial: true,
        //             includeTypes: true,
        //         }).run(this.connection).then(data => data.each((error, row) => {
        //             callback(error, row);
        //         }));
        // } else {
        //     throw new Error('rethinkdb connection closed in subscribe check update');
        // }
    }

    static getDataBasedOnEvent = (event, socket) => {
        var data = redisClient.zrange(event, -1 * channel_history_max, -1).then(function(result) {
            return result.map(function(x) {
            return JSON.parse(x);
            });
        });

        Promise.all([data]).then(function(values) {
            var subscriptionData = values[0];
            // subscriptionData.forEach(msg => {
            //     io.emit(event, msg);
            // })
            socket.emit(event, subscriptionData);
        }).catch(function(reason) {
            console.log('ERROR: ' + reason);
        });
    }

    static addRedisSubscriber = (event, socket, callback) => {
        var client = new Redis();
        if (client) {
            client.subscribe(event);
            client.on('message', function(channel, message) {
                socket.emit(event, this.compressData(JSON.parse(message)), callback);
            });
            redis_subscribers[event] = client;
        } else {
            console.error('Redis client is not defined in '+event);
            callback(new Error('Redis client is not defined'));
        }
    }

    static closeRedisClients = () => {
        if (redis_subscribers) {
            for(var key in redis_subscribers) {
                if (redis_subscribers[key]) {
                    redis_subscribers[key].quit();
                }
            }
        } else {
            console.error('Redis client is not defined in disconnect');
            console.info('Redis client is not defined');
        }
    }

    static compressData = (data) => {
        if (newResponseFormat) {
            let compressData = data;
            if (compressionEnabled) {
                let parsedData = data;
                if (typeof data === 'object') {
                    parsedData = JSON.stringify(data);
                }
                compressData = LZString.compressToUTF16(parsedData);
            }
            return {
                data: compressData,
                isCompressed: compressionEnabled,
                compressionType: compressionType,
                dataType: typeof data
            }
        }
        return data;
    }


}