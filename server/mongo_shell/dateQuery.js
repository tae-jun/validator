db.log.find({
    _id: {
        $lt: new Date().toISOString()
    }
}).sort({_id: -1}).limit(10)
