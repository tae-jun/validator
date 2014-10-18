// 2014-10-08 ~ 2014-10-09
db.log.find({
    _id: {
        $gt: new Date('2014-10-08').toISOString(),
        $lt: new Date('2014-10-09').toISOString()
    }
});
