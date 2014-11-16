module config {
    export var web = {
        port: 80,
        distFolder: '../client/dist'
    }

    export var mongo = {
        mongodbUrl: 'mongodb://localhost:27017/',
        dbList: [
            'validator'
        ],
        dbConnectTimeout: 5000
    }

    export var serial = {
        testMsg: new Buffer([0, 0, 0]),
        correctMsg: '',
        validateTimeout: 3000
    }
}

export = config;