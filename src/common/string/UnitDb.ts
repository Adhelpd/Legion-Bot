

class CommandNames {
    public App: string = "unit-db";
    public Modal_createUnitDb: string = "Modal_CreateUnitDb";
    public Modal_createUnitDb1: string = "Modal_CreateUnitDb1";
};

class CommandLabels {
    unitAgree: string = "I agree";
    gotIt: string = "Got it!";
    createNew: string = "Create New Unit";
    editExisting: string = "Edit Existing Unit";
    discordInvite: string = "Discord Invite";
    header: string = "Summary Header";
    modalTitle: string = "Create New Unit in Database";
    summary: string = "Summary";
    availableRoles: string = "Available Certs/Roles";
    missionTimes: string = "Recurring Mission Times";
    submitToDob: string = "Submit to Database";
    editSubmit: string = "Edit Submission";
};

class Placeholders {
    discordInvite: string = "Please input the discord invite made by your group leader here...";
    header: string = "Please put a header or tagline here...";
    description: string = "Unit Summary - Standard Discord Formatting Allowed...";
    availableRoles: string = "Roles must be input like 'Rifleman|AT|ARC|etc.";
    missionTimes: string = "Please separate mission times (Monday|3:00 PM, Friday|2:30 PM)";
};

class UnitEmbed {

};

class CommandIds {
    buttonCancel: string = "button_unitCancel";
    button_createDbAgree: string = "button_unitCreateDbAgree";
    button_unitCreateDb: string = "button_unitCreateDb1";
    button_unitCreateInit: string = "button_unitCreateDbInit";
    button_unitCreateInstruction: string = "button_unitCreateInstruction";
    button_unitUpdateDb: string = "button_unitUpdateDb";
    button_unitSubmitDb: string = "button_submitToDb";
    input_unitDiscordInvite: string = "input_unitDiscordInvite";
    input_unitDescriptionTagline: string = "input_unitDescriptionTagline";
    input_unitDescription: string = "input_unitDescription";
    input_unitRoles: string = "input_unitRoles";
    input_missionTimes: string = "input_missionTimes";
    modal_createUnitDb: string = "modal_CreateUnitDb";
};

class CommandDescriptions {
    public AppCommand = "UNIT-DB: Commands access and modify units status";

};

class CommandResponses {
    public entry: string = "Thank you for using the **Unit Database**!\u000a\u000aWhat would you like to do?";
    public unitCreationInit: string = "*__A few orders of business before we begin__:*\u000a*This database...*\u000a\u2022 **__...is community maintained__.**\u000aIt relies on trust, people **honestly** reporting their numbers and keeping them up to date. Please keep in mind, inflated numbers do not equal a 'better' unit. Some players prefer a smaller and more intimate environment. This is not meant to be a dick measuring tool.\u000a\u000a\u2022 **__...is not *directly* meant to be a recruitment tool___.**\u000aIt's meant to be a a tool to help people find and get exposed to other units.\u000a\u000a\u2022 **__...is provided free of charge as a service to the community__.** \u000aIt will not be 100% up to date *all the time*.\u000a\u000a\u2022 **__...is *NOT A RIGHT*__**. \u000aCommunity members who abuse the privilege, act in bad faith, or otherwise try to 'game' the database will be banned from using it (i.e., a hard-coded ban will be implemented against you).\u000aYou will have **NO** opportunity to appeal this ban.";
    public unitCreationInit1: string = "By adding your unit to this database, you're saying that your unit...\u000a\u2022 ...is actively hosting Star Wars based ops on a regular and consistent basis.\u000a\u2022 ...is actively recruiting and not on any form of 'hiatus', 'suspension', or 'break' (i.e., closed its doors publicly and is not holding ops or hosting an arma 3 server)\u000a\u000a**Any unit that does not fulfill these requirements WILL be considered 'dead' and should be updated to reflect that.**";
    public unitCreationInitInstructions: string = "";
    public helpDescription: string = "";
    public previewContent: string = "**Here is snapshot of what your entry will look like.**\u000a\u000aAfter you hit 'submit' your entry, you'll be able to:\u000a\u2022 configure advanced search parameters\u000a\u2022 configure additonal search parameters\u000a\u2022 add applicant requirements\u000a\u2022 ...and more!\u000aVia the 'Edit Existing Unit' button.";
};

export class UnitDatabase {
    public CommandLabels = new CommandLabels();
    public CommandIds = new CommandIds();
    public CommandNames = new CommandNames();
    public CommandDescriptions = new CommandDescriptions();
    public CommandResponses = new CommandResponses();
    public Placeholders = new Placeholders();

};