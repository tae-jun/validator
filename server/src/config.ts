module config {
    export var web = {
        port: 80,
        distFolder: '../client/dist'
    }

    export var mongo = {
        mongodbUrl: 'mongodb://localhost:27017/',
        dbList: [
            'validator',
            //'serverLog'
        ],
        dbConnectTimeout: 5000
    }

    export var serial = {
        msgByteLength: 4,
        validateMsg: [35, 36],
        successMsg: [35, 36, 71, 38],
        errorMsg: [35, 36, 70, 38],
        lightOnMsg: [35, 36, 79, 38],
        validateTimeout: 3000
    }
}

export = config;