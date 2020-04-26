// this is a sample nodejs preview. Just add environment variables to run this function

const mongoose = require('mongoose');

const REACT_APP_MONGO_URI_STRING = '';

const REACT_APP_MONGO_USERNAME = '';

const REACT_APP_MONGO_PASSWORD = '';

const REACT_APP_MONGO_DB = '';

mongoose
    .connect(REACT_APP_MONGO_URI_STRING, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        user: REACT_APP_MONGO_USERNAME,
        pass: REACT_APP_MONGO_PASSWORD,
        dbName: REACT_APP_MONGO_DB,
    })
    .catch(err => {
        console.log(`DB Connection Error: ${err.message}`);
        throw err;
    });

//Get the default connection
const db = mongoose.connection;
const Schema = mongoose.Schema;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const honeyInfoSchema = new Schema({
    _id: Schema.Types.ObjectId,
    batchId: String,
    analyticaFile: {
        _meta: {
            Location: String,
        },
    },
    mgo: Number,
    rmpId: String,
    mfgDate_utc: Date,
    bbDate_utc: Date,
    beekeeper: mongoose.ObjectId,
});

const beekeeperSchema = new Schema({
    _id: Schema.Types.ObjectId,
    city: String,
    postcode: String,
    area: String,
    firstName: String,
    lastName: String,
    nickName: String,
});

const grabBatch = async batchId => {
    try {
        // eslint-disable-next-line no-unused-vars
        let beekeeperData;
        const honeyInfo = db.model('honeyinfos', honeyInfoSchema);
        const beekeeper = db.model('beekeepers', beekeeperSchema);
        const data = await honeyInfo.findOne({ batchId });

        if (data && data._id) {
            beekeeperData = await beekeeper.findOne({ _id: data.beekeeper });
            return {
                ...data._doc,
                beekeeper: {
                    ...beekeeperData._doc,
                },
            };
        }

        return null;
        // throw error for debugging with UI testing.
    } catch (err) {
        return err;
    }
};

grabBatch('13245');
