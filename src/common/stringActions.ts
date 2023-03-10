/**
 * Return ping-able userId
 */
export function pingableUser (userid: string):string {
    return "<@!" + userid + ">";
}

/**
 * Builds a bullet list from an array
 * @param list Array of strings
 */
export function BulletListBuilder (list: Array<string>): string {
    var formattedList = "";
    list.forEach(entry => {
        formattedList += ("\u2022 " + entry + "\u000a");
    });
    return formattedList;
};