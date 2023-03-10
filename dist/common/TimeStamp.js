"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoW = exports.ConvertDateToUnix = exports.NextMissionDate = void 0;
const NextMissionDate = (date) => {
    var split = date.split("|");
    var day = split[0];
    var weekday = 0;
    switch (day) {
        case DoW.SUN:
            weekday = 0;
            break;
        case DoW.MON:
            weekday = 1;
            break;
        case DoW.TUE:
            weekday = 2;
            break;
        case DoW.WED:
            weekday = 3;
            break;
        case DoW.THR:
            weekday = 4;
            break;
        case DoW.FRI:
            weekday = 5;
            break;
        case DoW.SAT:
            weekday = 6;
            break;
        default:
            weekday = 0;
    }
    var today = new Date();
    var dayOffset = weekday > today.getDay()
        ? weekday - today.getDay()
        : weekday - today.getDay() + 7;
    var nextTime = today.getTime();
    nextTime += (dayOffset * 86400000);
    var timezoneCheck = new Date(today.getFullYear(), 0, 1, today.getDay());
    var tzCheck = new Date(timezoneCheck.toDateString() + " " + split[1]);
    tzCheck.setDate(dayOffset);
    tzCheck.setMonth(today.getMonth());
    console.log(tzCheck.toTimeString());
    var nextDay = new Date(nextTime);
    var cont = nextDay.toDateString() + " " + split[1];
    return new Date(cont);
};
exports.NextMissionDate = NextMissionDate;
const IsDstObserved = (date) => {
    let jan = new Date(date.getFullYear(), 0, 1).getTimezoneOffset();
    let jul = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
    var isDst = Math.max(jan, jul) !== date.getTimezoneOffset();
    var newTime = isDst && date.getMonth() <= 5 ? date.getTime() - 3600000 : date.getTime();
    var newDate = new Date(newTime);
    return newDate;
};
const ConvertDateToUnix = (date) => {
    console.log(date);
    console.log(date.toLocaleString());
    console.log(date.toDateString());
    console.log(date.toTimeString());
    const timestamp = "<t:" + Math.floor(IsDstObserved(date).getTime() / 1000) + ":f>";
    return timestamp;
};
exports.ConvertDateToUnix = ConvertDateToUnix;
var DoW;
(function (DoW) {
    DoW["SUN"] = "Sunday";
    DoW["MON"] = "Monday";
    DoW["TUE"] = "Tuesday";
    DoW["WED"] = "Wednesday";
    DoW["THR"] = "Thursday";
    DoW["FRI"] = "Friday";
    DoW["SAT"] = "Saturday";
})(DoW = exports.DoW || (exports.DoW = {}));
