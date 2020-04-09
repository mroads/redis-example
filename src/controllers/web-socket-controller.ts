import DBService from '../services/redis-db-service';
import * as LZString from 'lz-string';

/**
 * Supported socket operations
 */

const GET_ALL_CHECK_UPDATES = 'getAllCheckUpdates';
const GET_STORE_CHECK_UPDATES = 'getStoreCheckUpdates';
const SUBSCRIBE_TO_MENU_UPDATE = 'subscribeMenuUpdate';
const GET_MENU = 'getMenu';
const SUBSCRIBE_TO_STORE_CHECK_UPDATE = 'subscribeStoreCheckUpdate';
const SUBSCRIBE_TO_CHECK_UPDATE = 'subscribeCheckUpdate';
const SUBSCRIBE_TO_EMPLOYEE_CHECK_UPDATE = 'subscribeEmployeeCheckUpdate';
const DISCONNECT = 'disconnect';

const GET_NOTIFICATIONS = 'getNotifications';
const SUBSCRIBE_NOTIFICATIONS = 'subscribeNotifications';

const JSONFORMAT = "JSON";

const GET_FIREBOARD_CHECKS = 'getFireboardChecks';
const SUBSCRIBE_TO_FIREBOARD_CHECKS = 'subscribeFireboardChecks';

export default class WebSocketController {

    socket;
    dbInstance: DBService;
    compressionEnabled = false;
    compressionType = JSONFORMAT;
    newResponseFormat = false;

    constructor(socket) {
        this.socket = socket;
        this.initializeListeners();
    }

    initializeListeners() {
        this.socket.on(GET_ALL_CHECK_UPDATES, this.onGetAllCheckUpdates);
        this.socket.on(GET_STORE_CHECK_UPDATES, this.onGetStoreCheckUpdates);
        this.socket.on(SUBSCRIBE_TO_MENU_UPDATE, this.onSubscribeMenuUpdate);
        this.socket.on(GET_MENU, this.onGetMenu);
        this.socket.on(SUBSCRIBE_TO_CHECK_UPDATE, this.onSubscribeCheckUpdate);
        this.socket.on(SUBSCRIBE_TO_EMPLOYEE_CHECK_UPDATE, this.onSubscribeEmployeeCheckUpdate);
        this.socket.on(SUBSCRIBE_TO_STORE_CHECK_UPDATE, this.onSubscribeStoreCheckUpdate);
        this.socket.on(DISCONNECT, this.onDisconnect);
        this.socket.on(GET_NOTIFICATIONS, this.getNotifications);
        this.socket.on(SUBSCRIBE_NOTIFICATIONS, this.onSubscribeNotifications);
        // Fireboard
        this.socket.on(GET_FIREBOARD_CHECKS, this.getFireboardChecks);
        this.socket.on(SUBSCRIBE_TO_FIREBOARD_CHECKS, this.onSubscribeFireboardChecks);
    }

    onGetStoreCheckUpdates = (storeId, callback) => {
        DBService.getStoreCheckUpdates(storeId, this.socket, GET_STORE_CHECK_UPDATES, callback);

        // if (this.dbInstance) {
        //     this.dbInstance.getStoreCheckUpdates(storeId).then((result) => {
        //         const storeCheckUpdates = this.compressData(result);
        //         callback(null, storeCheckUpdates);
        //     }).catch((error) => {
        //         console.error('error getting check updates');
        //         callback(error);
        //     })
        // } else {
        //     console.error('db instance not defined in subscribe menu update');
        //     callback(new Error('db instance is not defined'));
        // }
    }


    onGetAllCheckUpdates = (storeId, employeeId, callback) => {
        DBService.getAllCheckUpdates(storeId, employeeId, this.socket, GET_ALL_CHECK_UPDATES, callback);

        // if (this.dbInstance) {
        //     this.dbInstance.getAllCheckUpdates(storeId, employeeId).then((result) => {
        //         const allCheckUpdates = this.compressData(result);
        //         callback(null, allCheckUpdates);
        //     }).catch((error) => {
        //         console.error('error getting check updates');
        //         callback(error);
        //     })
        // } else {
        //     console.error('db instance not defined in subscribe menu update');
        //     callback(new Error('db instance is not defined'));
        // }
    }

    onSubscribeMenuUpdate = (storeId, callback) => {
        DBService.subscribeMenuUpdate(storeId, this.socket, SUBSCRIBE_TO_MENU_UPDATE, callback);

        // if (this.dbInstance) {
        //     this.dbInstance.subscribeMenuUpdate(storeId, (error, row) => {
        //         if (error) {
        //             console.error('error subscribing to menu update');
        //             callback(error);
        //         } else {
        //             callback(null, 'success');
        //             this.sendMessage(SUBSCRIBE_TO_MENU_UPDATE, row);
        //         }
        //     })
        // } else {
        //     console.error('db instance not defined in subscribe menu update');
        //     callback(new Error('db instance is not defined'));
        // }
    }


    onGetMenu = (storeId, callback) => {
        DBService.getMenu(storeId, this.socket, GET_MENU, callback);

        // if (this.dbInstance) {
        //     this.dbInstance.getMenu(storeId).then((result) => {
        //         const time = new Date().getTime();
        //         const data = this.compressData(result);
        //         callback(null, data);
        //     }).catch((error) => {
        //         console.error('error onGetMenu', error);
        //         callback(error);
        //     })
        // } else {
        //     console.error('db instance not defined in onGetMenu');
        //     callback(new Error('db instance is not defined'));
        // }
    }

    onSubscribeCheckUpdate = (storeId, callback) => {
        DBService.subscribeCheckUpdate(storeId, this.socket, SUBSCRIBE_TO_CHECK_UPDATE, callback);

        // if (this.dbInstance) {
        //     this.dbInstance.subscribeCheckUpdate(storeId, (error, row) => {
        //         if (error) {
        //             console.error('error subscribing to check update');
        //             callback(error);
        //         } else {
        //             callback(null, 'success');
        //             this.sendMessage(SUBSCRIBE_TO_CHECK_UPDATE, row);
        //         }
        //     })
        // } else {
        //     console.error('db instance not defined in subscribe check update');
        //     callback(new Error('db instance is not defined'));
        // }
    }

    onSubscribeEmployeeCheckUpdate = (storeId, employeeId, callback) => {
        DBService.subscribeEmployeeCheckUpdate(storeId, employeeId, this.socket, SUBSCRIBE_TO_EMPLOYEE_CHECK_UPDATE, callback);

        // if (this.dbInstance) {
        //     this.dbInstance.subscribeEmployeeCheckUpdate(storeId, employeeId, (error, row) => {
        //         if (error) {
        //             console.error('error subscribing to check update');
        //             callback(error);
        //         } else {
        //             callback(null, 'success');
        //             this.sendMessage(SUBSCRIBE_TO_EMPLOYEE_CHECK_UPDATE, row);
        //         }
        //     })
        // } else {
        //     console.error('db instance not defined in subscribe check update');
        //     callback(new Error('db instance is not defined'));
        // }
    }


    onSubscribeStoreCheckUpdate = (storeId, callback) => {
        DBService.subscribeStoreCheckUpdate(storeId, this.socket, SUBSCRIBE_TO_STORE_CHECK_UPDATE, callback);

        // console.info('subscribing to store check updates', storeId);
        // if (this.dbInstance) {
        //     this.dbInstance.subscribeStoreCheckUpdate(storeId, (error, row) => {
        //         if (error) {
        //             console.error('error onSubscribeStoreCheckUpdate', error);
        //             callback(error);
        //         } else {
        //             callback(null, 'success');
        //             this.sendMessage(SUBSCRIBE_TO_STORE_CHECK_UPDATE, row);
        //         }
        //     })
        // } else {
        //     console.error('db instance not defined in onSubscribeStoreCheckUpdate');
        //     callback(new Error('db instance is not defined'));
        // }
    }

    onDisconnect = (error) => {
        console.info('socket disconnected', error);
        DBService.closeRedisClients();
    }

    getNotifications = (storeId, extraData, callback) => {
        DBService.getNotifications(storeId, extraData, this.socket, GET_NOTIFICATIONS, callback);

        // if (this.dbInstance) {
        //     this.dbInstance.getNotifications(storeId, extraData).then((result) => {
        //         const notifications = this.compressData(result);
        //         callback(null, notifications);
        //     }).catch((error) => {
        //         console.error('error getNotifications', error);
        //         callback(error);
        //     })
        // } else {
        //     console.error('db instance not defined in getNotifications');
        //     callback(new Error('db instance is not defined'));
        // }
    }


    onSubscribeNotifications = (storeId, extraData, callback) => {
        DBService.subscribeNotifications(storeId, extraData, this.socket, SUBSCRIBE_NOTIFICATIONS, callback);


        // if (this.dbInstance) {
        //     this.dbInstance.subscribeNotifications(storeId, extraData, (error, row) => {
        //         if (error) {
        //             console.error('error onSubscribeNotifications', error);
        //             callback(error);
        //         } else {
        //             callback(null, 'success');
        //             this.sendMessage(SUBSCRIBE_NOTIFICATIONS, row);
        //         }
        //     })
        // } else {
        //     console.error('db instance not defined in subscribe check update');
        //     callback(new Error('db instance is not defined'));
        // }
    }


    getFireboardChecks = (storeId, extraData, callback) => {
        DBService.getFireboardChecks(storeId, extraData, this.socket, GET_FIREBOARD_CHECKS, callback);

        // if (this.dbInstance) {
        //     this.dbInstance.getFireboardChecks(storeId, extraData).then((result) => {
        //         const notifications = this.compressData(result);
        //         callback(null, notifications);
        //     }).catch((error) => {
        //         console.error('error getFireboardChecks', error);
        //         callback(error);
        //     })
        // } else {
        //     console.error('db instance not defined in getNotifications');
        //     callback(new Error('db instance is not defined'));
        // }
    }


    onSubscribeFireboardChecks = (storeId, extraData, callback) => {
        DBService.subscribeFireboardChecks(storeId, extraData, this.socket, SUBSCRIBE_TO_FIREBOARD_CHECKS, callback);

        // if (this.dbInstance) {
        //     this.dbInstance.subscribeFireboardChecks(storeId, extraData, (error, row) => {
        //         if (error) {
        //             console.error('error onSubscribeFireboardChecks', error);
        //             callback(error);
        //         } else {
        //             callback(null, 'success');
        //             this.sendMessage(SUBSCRIBE_TO_FIREBOARD_CHECKS, row);
        //         }
        //     })
        // } else {
        //     console.error('db instance not defined in subscribe check update');
        //     callback(new Error('db instance is not defined'));
        // }
    }

}