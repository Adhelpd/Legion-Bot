import * as mongoDB from "mongodb";
import { Collections } from "../repositories/TestRepository";
import { User, UserAdminStatus } from "../models/TestModel";
import { Singleton } from "typescript-ioc";

export type UserCreationParams = Pick<User, "discordName" | "status" | "discordId" | "unitHistory">;

@Singleton
export class UserService {
    // constructor() {

    // };
    private UserFilter (filter: mongoDB.Filter<User> ={} ): mongoDB.Filter<User> {
        return filter;
    };

    private async QueryUser(filter: mongoDB.Filter<User> = {}): Promise<Array<User>> {
        return await Collections.users?.find(filter).toArray() as unknown as User[];
    };

    public async get(discordID: string): Promise<User> {
        var user: Array<User> = [];
        try {
            user = await this.QueryUser({
                "discordId": discordID
            });
        } catch (error) {
            console.log(error);
        }
        return user[0];
    };

    public async getAllUser(): Promise<Array<User>> {
        const user = Collections.users?.find({}).toArray() as unknown as User[];
        return user
    };

    public async updateAdminStatus(id: string, status: UserAdminStatus): Promise<void> {
        const isupdate = (await Collections.users!.updateOne(
            this.UserFilter({"discordId": id}),
            {$set: this.UserFilter({'status': status})},
            {'upsert': true}
            )).acknowledged;
        console.log(isupdate);
    };

    // public async updateUser()

    public async create(UserCreationParams: UserCreationParams): Promise<User> {
        const today = new Date();
        const user: User = {
            ...UserCreationParams,
            dateAdded: today
        };
        Collections.users!.insertOne(user);

        return user;
    };
};