"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectToDatabase = void 0;
const tslib_1 = require("tslib");
const mongoDB = tslib_1.__importStar(require("mongodb"));
async function ConnectToDatabase() {
    const client = new mongoDB.MongoClient(process.env.DB_CONN_STRING);
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    console.log(`Successfully connected to database: ${db.databaseName}`);
    return db;
}
exports.ConnectToDatabase = ConnectToDatabase;
;
