class CommandNames
{
    public App: string = "user-db";
    public AdminGroup: string = "admin";
    public Shorthand: string = "unit-shorthand";
    public EditorGroup: string = "editor";
};

class CommandDescriptions
{
    public AppCommand = "UNIT-DB: Commands to modify editor status";
    public CommandGroup = "Unit Database User Management commands";
    public EditorCommandGroup = "Modify editor permissions";
    public AdminCommandGroup = "GLOBAL-ADMIN ONLY: creates a new admin user";
    public SearchCommandGroup = "";
    public UserStatus = "adds/removes editor permissions";
    public Shorthand = "GLOBAL-ADMIN ONLY: adds editor to specific unit";
};

class CommandResponses
{
    public NoPerms: string = "You do not currently have edit permissions for the user database.\u000a\u000aIf you're looking to edit a specific unit entry, please use the command `/unit-db search editors [unit]` for whom you need to contact.";
    public banned: string = "It seems you've been banned from using the unit database. \u000a\u000aThis is unfortunate and unappealable.";
    public noAdminPerms: string = "***You don't have global admin perms!***\u000a\u000aYou can't use this command.";
    public newGlobalAdmin: string = `> *"With great power comes great responsibility"*\u000a> - Ben Stiller\u000a> "Of Hobbits and Hand Grenades" 1929, Hamburger Hill\u000a\u000aCongratulations {user}, you have been promoted to a unit database global admin. Do not disappoint me.`;
    public globalAdminNoShorthand: string = "Silly, you're a global admin.\u000a\u000aYou need to include a group name to add a new group editor.";
    public globalAdminNoUnits: string = "No unit currently fits that shorthand";
    public globalAdminWrongShorthand: string = "Incorrect unit shorthand:\u000a\u000aDid you mean to input...\u000a";
    public newEditor: string = "Congratulations {user}!\u000a\u000aYou have been made an editor for the group, {unit}\u000a\u000aYou can now use edit commands for your group!";
    public removeEditor: string = "{user}, your permission to edit {unit} has been removed.";
    public removeAdmin: string = "{user}, your global admin powers have been revoked. Git gud.";
    public unchangedAdmin: string = "That's the same permission level";
    public notEnoughAuth: string = "You don't have enough authority to grant that permission.";
    public editBanned: string = "The individual you are trying to add edit permissions for has been banned from using the unit database, most likely due to abusing the system or not keeping their entries up to date.\u000a\u000aThis is unfortunate and unappealable."
};

export class UserDatabase
{
    public CommandNames = new CommandNames();
    public CommandDescriptions = new CommandDescriptions();
    public CommandResponses = new CommandResponses();
};