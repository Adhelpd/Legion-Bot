import { UnitDatabase } from "./string/UnitDb";
import { UserDatabase } from "./string/UserDb";
class CommandNames
{
    public User:string = "user";
    public Status: string = "status";
    public Edit: string = "edit";
    public Search: string = "search";
};

class Labels
{
    public Cancel: string = "Cancel";
};

class CommandDescriptions
{
    public User: string = "@user to edit/add permissions";
};

class Common
{
    public CommandNames = new CommandNames();
    public CommandDescriptions = new CommandDescriptions();
    public Labels = new Labels();
};


export const defaultStrings =
{
    Common: new Common(),
    UnitDb: new UnitDatabase(),
    UserDb: new UserDatabase(),
};