export var tableType;
(function (tableType) {
    tableType["Text"] = "text";
    tableType["Button"] = "button";
})(tableType || (tableType = {}));
export function typecheckTable(table) {
    return table;
}
