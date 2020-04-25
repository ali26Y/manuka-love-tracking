const { MongoClient } = require('mongodb');

const grabBatch2 = async batchId => {
    try {
        let data = undefined;
        MongoClient.connect(process.env.REACT_APP_OLD_MONGO_URI, function(err, client) {
            const db = client.db('manuka-love');
            const collection = db.collection('honeyinfos');

            collection.findOne({ batchId: '13245' }, function(err, result) {
                data = result;
            });
        });
        return data;
    } catch (err) {
        console.log('err', err);
        throw err;
    }
};

grabBatch2();
