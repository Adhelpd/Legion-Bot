import { Challenge } from "./commands/ChallengeTest";
import { GitHubIssue, GithubModalReply, GithubSearchReplyYes } from "./commands/CreateIssue";
import { UnitDbHandler } from "./commands/messages/UnitInfo";
import { DBManagement } from "./commands/UserDatabase/DbManagement";
import { UnitButtonCancelled, UnitButtonReplyCreate,UnitModalCreate, UnitButtonReplyCreate1, UnitButtonReplyEdit, UnitButtonReplySearch, UnitHandler, UnitButtonReplyCreate2 } from "./commands/UnitsInfo";
import { ButtonSubmitReply, Command, MessageCommand, ModalSubmitReply } from "./models/Command";
// import { Hello } from "./commands/Hello";

export const Commands: Command[] = [
    GitHubIssue, 
    UnitHandler,
    DBManagement
];

export const MessageCommands: MessageCommand[] = [
    UnitDbHandler,
];

export const ModalReplies: ModalSubmitReply[] = [
    GithubModalReply,
    UnitModalCreate
]
export const ButtonReplies: ButtonSubmitReply[] = [
    GithubSearchReplyYes,
    UnitButtonReplyCreate,
    UnitButtonReplySearch,
    UnitButtonReplyEdit,
    UnitButtonCancelled,
    UnitButtonReplyCreate1,
    UnitButtonReplyCreate2
];



// export const MessageCommands = {
//     testMe: 'test-me',
//     embedMe: 'embed',
//     createIssue: 'gitHub issue'
// };

