"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultStrings = void 0;
const UnitDb_1 = require("./string/UnitDb");
class UnitCreationStrings {
    unitCreationInit = "*__A few orders of business before we begin__:*\u000a*This database...*\u000a\u2022 **__...is community maintained__.**\u000aIt relies on trust, people **honestly** reporting their numbers and keeping them up to date. Please keep in mind, inflated numbers do not equal a 'better' unit. Some players prefer a smaller and more intimate environment. This is not meant to be a dick measuring tool.\u000a\u000a\u2022 **__...is not *directly* meant to be a recruitment tool___.**\u000aIt's meant to be a a tool to help people find and get exposed to other units.\u000a\u000a\u2022 **__...is provided free of charge as a service to the community__.** \u000aIt will not be 100% up to date *all the time*.\u000a\u000a\u2022 **__...is *NOT A RIGHT*__**. \u000aCommunity members who abuse the privilege, act in bad faith, or otherwise try to 'game' the database will be banned from using it (i.e., a hard-coded ban will be implemented against you).\u000aYou will have **NO** opportunity to appeal this ban.";
    unitCreationInit1 = "By adding your unit to this database, you're saying that your unit...\u000a\u2022 ...is actively hosting Star Wars based ops on a regular and consistent basis.\u000a\u2022 ...is actively recruiting and not on any form of 'hiatus', 'suspension', or 'break' (i.e., closed its doors publicly and is not holding ops or hosting an arma 3 server)\u000a\u000a**Any unit that does not fulfill these requirements WILL be considered 'dead' and should be updated to reflect that.**";
}
;
class UnitDatabaseStrings {
    entry = "Thank you for using the **Unit Database**!\u000a\u000aWhat would you like to do?";
}
;
class CommandNames {
    User = "user";
    Status = "status";
    Edit = "edit";
    Search = "search";
}
;
class CommandDescriptions {
    User = "@user to edit/add permissions";
}
;
class Common {
    CommandNames = new CommandNames();
    CommandDescriptions = new CommandDescriptions();
}
;
exports.defaultStrings = {
    Common: new Common(),
    UnitCreation: new UnitCreationStrings(),
    UnitDb: new UnitDatabaseStrings(),
    UserDb: new UnitDb_1.UserDatabase(),
};
