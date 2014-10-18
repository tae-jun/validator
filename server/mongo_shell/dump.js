var logNum = 1000;

db.log.drop();

var logs = [];

function ran(max) {
    return Math.round(Math.random() * max);
}

for (var i = 0; i < logNum; i++) {
    var now = new Date();
    now.setTime(now.getTime() - ran(7 * 1000 * 60 * 60 * 24)); // 7 days before ~ now

    var isError;
    var isChecked;

    if (ran(10) == 0) {
        isError = true;
        isChecked = false;
    }
    else {
        isError = false;
        isChecked = undefined;
    }

    var record = {
        _id: now.toISOString(),
        isError: isError,
        isChecked: isChecked
    };

    if (record.isChecked == undefined)
        delete record.isChecked;

    logs.push(record);
}

db.log.insert(logs);

db.log.find({
    $and: [
        { isError: true },
        { isChecked: false }
    ]
}).count();
