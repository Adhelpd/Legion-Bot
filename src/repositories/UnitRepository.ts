// External DependenciesUnitCollection
import * as mongoDB from "mongodb";
import { Unit } from "src/models/UnitModel";
import { ConnectToDatabase } from "./BaseRepository";

// export async function connectToUserDatabase = () => {
//     const db: mongoDB.Db = await ConnectToDatabase();
//     const UnitCollection: mongoDB.Collection = db.collection(process.env.USER_COLLECTION!);
//     console.log(`Successfully connected to collection: ${UnitCollection.collectionName}`);
//     return UnitCollection;
// };

// export const CreateNewUnit = async (unit: Unit) => {
//     const db: mongoDB.Db = await ConnectToDatabase();
//     const UnitCollection: mongoDB.Collection = db.collection(process.env.USER_COLLECTION!);
//     UnitCollection.up
//     console.log(`Successfully connected to collection: ${UnitCollection.collectionName}`);
//     return UnitCollection.insertOne(unit);
// };