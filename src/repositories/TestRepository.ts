// External Dependencies
import * as mongoDB from "mongodb";
// import * as dotenv from "dotenv";
// Global Variables
export const Collections: {
    users?: mongoDB.Collection
    units?: mongoDB.Collection
} = {}
// Initialize Connection
export const ConnectToDatabase = async () => {
    // dotenv.config();

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING!);

    await client.connect();

    const db: mongoDB.Db = client.db(process.env.DB_NAME);

    const userCollection: mongoDB.Collection = db.collection(process.env.USER_COLLECTION!);
    const unitCollection: mongoDB.Collection = db.collection(process.env.UNIT_COLLECTION!);

    Collections.users = userCollection;
    Collections.units = unitCollection;

    console.log(`Successfully connected to database: ${db.databaseName}\n ...with Collections:\n- ${unitCollection.collectionName}\n- ${userCollection.collectionName}`);// and collection: ${userCollection.collectionName}`);
}

