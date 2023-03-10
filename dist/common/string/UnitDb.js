"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDatabase = void 0;
class CommandNames {
    App = "user-db";
    AdminGroup = "admin";
    Shorthand = "unit-shorthand";
    EditorGroup = "editor";
}
;
class CommandDescriptions {
    AppCommand = "UNIT-DB: Commands to modify editor status";
    CommandGroup = "Unit Database User Management commands";
    EditorCommandGroup = "Modify editor permissions";
    AdminCommandGroup = "GLOBAL-ADMIN ONLY: creates a new admin user";
    SearchCommandGroup = "";
    UserStatus = "adds/removes editor permissions";
    Shorthand = "GLOBAL-ADMIN ONLY: adds editor to specific unit";
}
;
class CommandResponses {
    NoPerms = "You do not currently have edit permissions for the user database.\u000a\u000aIf you're looking to edit a specific unit entry, please use the command `/unit-db search editors [unit]` for whom you need to contact.";
    banned = "It seems you've been banned from using the unit database. \u000a\u000aThis is unfortunate and unappealable.";
    noAdminPerms = "***You don't have global admin perms!***\u000a\u000aYou can't use this command.";
    newGlobalAdmin = `> *"With great power comes great responsibility"*\u000a> - Ben Stiller\u000a> "Of Hobbits and Hand Grenades" 1929, Hamburger Hill\u000a\u000aCongratulations {user}, you have been promoted to a unit database global admin. Do not disappoint me.`;
    globalAdminNoShorthand = "Silly, you're a global admin.\u000a\u000aYou need to include a group name to add a new group editor.";
    globalAdminNoUnits = "No unit currently fits that shorthand";
    globalAdminWrongShorthand = "Incorrect unit shorthand:\u000a\u000aDid you mean to input...\u000a";
    newEditor = "Congratulations {user}!\u000a\u000aYou have been made an editor for the group, {unit}\u000a\u000aYou can now use unit database editor commands for your chosen unit.";
    removeEditor = "{user}, your permission to edit {unit} has been removed.";
    removeAdmin = "{user}, your global admin powers have been revoked. Git gud.";
    unchangedAdmin = "That's the same permission level";
    notEnoughAuth = "You don't have enough authority to grant that permission.";
    editBanned = "The individual you are trying to add edit permissions for has been banned from using the unit database, most likely due to abusing the system or not keeping their entries up to date.\u000a\u000aThis is unfortunate and unappealable.";
}
;
class UserDatabase {
    CommandNames = new CommandNames();
    CommandDescriptions = new CommandDescriptions();
    CommandResponses = new CommandResponses();
}
exports.UserDatabase = UserDatabase;
;
