// import { ObjectId } from "mongodb";
import { Collections, ConnectToDatabase } from "../repositories/TestRepository";
import { Unit } from "../models/UnitModel";
import * as mongoDB from "mongodb";
import { Singleton } from "typescript-ioc";

export type UnitCreationParams = Pick<Unit, "availableRoles" | "discordInvite"
    | "additionalNotes" | "attitude" | "avgAttendence" | "faction" | "hasCustoms" | "preReqs"

    | "lastUpdated" | "missionTimes" | "unitColor" | "shorthandName" | "unitDescription"
    | "unitDescriptionTag" | "unitLeader">;

export type UnitEditParams = Pick<Unit, "hasCustoms" | "attitude" | "dead">;

@Singleton
export class UnitService {
    // public get(id: ObjectId, discordName?: string): User {
    //     // const res = connectToUserDatabase()
    //     return {
    //         id,
    //         discordName: discordName ?? "test"
    //     };
    // };

    private UnitFilter(filter: mongoDB.Filter<Unit> = {}): mongoDB.Filter<Unit> {
        return filter;
    };

    public async QueryUnit(filter: mongoDB.Filter<Unit> = {}): Promise<Array<Unit>> {
        return Collections.units?.find(filter).toArray() as unknown as Unit[];
    };

    public async searchUnitShorthand(shorthandName: string): Promise<Array<Unit>> {
        const units = await this.QueryUnit({
            "shorthandName": { $regex: shorthandName }
        });
        return units;
    };

    public async searchUnitAdmin(discordId: string): Promise<Array<Unit>> {
        const Units: Unit[] = await this.QueryUnit({
            "editors": { $regex: discordId }
            //"editors": {$in: discordId}
        });
        return Units;
    };

    // public getOneUnit(): Unit {
    //     // const unit
    // }

    public async getAllUnit(): Promise<Array<Unit>> {
        const user = Collections.units?.find({}).toArray() as unknown as Unit[];
        return user
    };

    public async updateUserEditor(adminId: string, addId: string, status: boolean): Promise<void> {
        var isUpdate: boolean = false;
        if (status) {
            isUpdate = (await Collections.units!.updateOne(
                this.UnitFilter({ "editors": adminId }),
                { $addToSet: this.UnitFilter({ 'editors': addId }) },
                { 'upsert': false }
            )).acknowledged;
        } else {
            isUpdate = (await Collections.units!.updateOne(
                this.UnitFilter({ "editors": adminId }),
                { $pull: this.UnitFilter({ 'editors': addId }) },
                { 'upsert': false }
            )).acknowledged;
        }
        console.log(isUpdate);
    };

    public async adminUpdateUserEditor(groupName: string, addId: string, status: boolean): Promise<void> {
        var isUpdate: boolean = false;
        if (status) {
            isUpdate = (await Collections.units!.updateOne(
                this.UnitFilter({ 'shorthandName': groupName }),
                { $addToSet: this.UnitFilter({ 'editors': addId }) },
                { 'upsert': false }
            )).acknowledged;
        } else {
            isUpdate = (await Collections.units!.updateOne(
                this.UnitFilter({ 'shorthandName': groupName }),
                { $pull: this.UnitFilter({ 'editors': addId }) },
                { 'upsert': false }
            )).acknowledged;
        }
        console.log(isUpdate);
    }

    public async create(UnitCreationParams: UnitCreationParams): Promise<Unit> {
        const today = new Date();
        const unit: Unit = {
            ...UnitCreationParams,
            addedDate: today,
            lastUpdated: today
        };
        Collections.units!.insertOne(unit);

        return unit;
    };
};