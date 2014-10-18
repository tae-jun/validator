var config = {
    port: 80,
    distFolder: '../client/dist',
    mongodbUrl: 'mongodb://localhost:27017/',
    dbList: [
        'validator'
    ],
    dbConnectTimeout: 5000
};

export = config;