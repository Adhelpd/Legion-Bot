"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Attitude = exports.InterUnitActivity = exports.UnitOrganization = exports.FACTION = void 0;
;
var FACTION;
(function (FACTION) {
    FACTION["MANDO"] = "Mandalorian";
    FACTION["GAR"] = "Republic";
    FACTION["IMP"] = "Imperial";
    FACTION["CIS"] = "Confederacy of Independent Systems";
    FACTION["MERC"] = "Mercenary";
    FACTION["REBEL"] = "Rebel Alliance";
    FACTION["INDEP"] = "Independent";
})(FACTION = exports.FACTION || (exports.FACTION = {}));
;
var UnitOrganization;
(function (UnitOrganization) {
    UnitOrganization["COMMUNITY"] = "Gaming Community";
    UnitOrganization["MILSIM"] = "Milsim";
    UnitOrganization["HYBRID"] = "Hybrid";
})(UnitOrganization = exports.UnitOrganization || (exports.UnitOrganization = {}));
;
var InterUnitActivity;
(function (InterUnitActivity) {
    InterUnitActivity["NONE"] = "None";
    InterUnitActivity["LIMITED"] = "Limited";
    InterUnitActivity["LOW"] = "Low";
    InterUnitActivity["MED"] = "Medium";
    InterUnitActivity["HIGH"] = "High";
})(InterUnitActivity = exports.InterUnitActivity || (exports.InterUnitActivity = {}));
var Attitude;
(function (Attitude) {
    Attitude["SERIOUS"] = "Serious";
    Attitude["BATTLEFRONT"] = "Run and Gun";
    Attitude["CASUAL"] = "Casual";
    Attitude["OPERATOR"] = "Operator; Gameface at all times";
})(Attitude = exports.Attitude || (exports.Attitude = {}));
;
