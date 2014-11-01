db.log.find({
    _id: {
        $gt: new Date('2014-10-08').toISOString()
    }
}).limit(10);
