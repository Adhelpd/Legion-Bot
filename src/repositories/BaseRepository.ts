// External Dependencies
import * as mongoDB from "mongodb";

export async function ConnectToDatabase():Promise<mongoDB.Db> {
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING!);
    await client.connect();
    const db: mongoDB.Db = client.db(process.env.DB_NAME);
    console.log(`Successfully connected to database: ${db.databaseName}`);
    return db;
    // const userCollection: mongoDB.Collection = db.collection(process.env.USER_COLLECTION!);
};