// External dependencies
import { ObjectId } from "mongodb";
// import Character from "./Character";
// Class Implementation
export interface User {
    discordName: string;
    discordId: string;
    status: UserAdminStatus;
    unitHistory: Array<string>
    id?: ObjectId;
    dateAdded: Date;
    // characterData: Character;
};

/**
 * Status within the userAdmin
 */
export enum UserAdminStatus {
    /**
     * Owner of Unit-DB
     */
    Owner,
    /**
     * Is a global admin
     */
    GlobalAdmin,
    /**
     * User Editor
     */
    User,
    /**
     * Former Global Admin
     */
    NoRights,
    /**
     * Has lost rights to use the unit database
     */
    isBanned
};

