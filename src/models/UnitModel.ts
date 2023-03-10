// import  from "discord.js";
import { ObjectId } from "mongodb";


export interface Unit {
    id?: ObjectId;
    unitLeader: string;
    discordInvite: string;
    shorthandName: string;
    faction: FACTION;
    unitDescriptionTag: string;
    unitDescription: string;
    availableRoles: string;
    // timezone: string;
    missionTimes: Array<string>;
    preReqs: Prereqs;
    addedDate: Date;
    lastUpdated: Date;
    additionalNotes?: string;
    unitColor?: string;
    editors?: Array<string>;
    hasCustoms?: boolean;
    dead?: boolean;
    deadDate?: Date;
    avgAttendence?: number;
    attitude?: Attitude;
};

export enum FACTION {
    NONE,
    GAR,
    CIS,
    MANDO,
    IMP,
    REBEL,
    MERC,
    INDEP
};

export const FactionString: Array<string> = [
    "None",
    "Galactic Republic",
    "Confederacy of Independent Systems",
    "Mandalorian",
    "Imperial",
    "Rebel Alliance",
    "Mercenary",
    "Independent Forces"
];

export interface Prereqs {
    age?: number;
    legalCopy?: boolean;
    microphone?: boolean;
    teamspeak?: boolean;
    language?: string;
    dualSim?: string;
    dualFaction?: boolean;
}

export enum UnitOrganization {
    COMMUNITY = "Gaming Community",
    MILSIM = "Milsim",
    HYBRID = "Hybrid",
};

export enum InterUnitActivity {
    NONE = "None",
    LIMITED = "Limited",
    LOW = "Low",
    MED = "Medium",
    HIGH = "High"
}

export enum Attitude {
    SERIOUS = "Serious",
    BATTLEFRONT = "Run and Gun",
    CASUAL = "Casual",
    OPERATOR = "Operator; Gameface at all times"
};
