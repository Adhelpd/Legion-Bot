"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectToDatabase = exports.Collections = void 0;
const tslib_1 = require("tslib");
const mongoDB = tslib_1.__importStar(require("mongodb"));
exports.Collections = {};
const ConnectToDatabase = async () => {
    const client = new mongoDB.MongoClient(process.env.DB_CONN_STRING);
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const userCollection = db.collection(process.env.USER_COLLECTION);
    const unitCollection = db.collection(process.env.UNIT_COLLECTION);
    exports.Collections.users = userCollection;
    exports.Collections.units = unitCollection;
    console.log(`Successfully connected to database: ${db.databaseName}\n ...with Collections:\n- ${unitCollection.collectionName}\n- ${userCollection.collectionName}`);
};
exports.ConnectToDatabase = ConnectToDatabase;
