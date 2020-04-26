// example of async handler using async-await
// https://github.com/netlify/netlify-lambda/issues/43#issuecomment-444618311

// import { grabBatch } from '../utils/mongo';
import mockData from '../utils/mock';

export async function handler(event, context, callback) {
    try {
        let data;
        const batchId = event.queryStringParameters.batchId;
        if (batchId && batchId.length) {
            // data = await grabBatch(batchId);
            data = mockData;
        }
        if (data) {
            callback(null, {
                statusCode: 200,
                body: JSON.stringify(data),
            });
        } else {
            throw new Error('Data does not exist');
        }
    } catch (err) {
        console.log(err); // output to netlify function log
        callback(null, {
            statusCode: 500,
            body: JSON.stringify({ msg: err.message }), // Could be a custom message or object i.e. JSON.stringify(err)
        });
    }
}
