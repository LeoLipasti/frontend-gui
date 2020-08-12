export var FieldType;
(function (FieldType) {
    FieldType["Displaytxt"] = "displaytxt";
    FieldType["Text"] = "text";
    FieldType["Password"] = "password";
    FieldType["Select"] = "select";
    FieldType["Textarea"] = "textarea";
    FieldType["Radio"] = "radio";
    FieldType["Checkbox"] = "checkbox";
    FieldType["Color"] = "color";
    FieldType["File"] = "file";
    FieldType["Number"] = "number";
    FieldType["Tel"] = "tel";
    FieldType["Range"] = "range";
    FieldType["Date"] = "date";
    FieldType["Datetimelocal"] = "datetime-local";
    FieldType["Time"] = "time";
    FieldType["Month"] = "month";
    FieldType["Button"] = "button";
    FieldType["RowStart"] = "row-start";
    FieldType["RowEnd"] = "row-end";
    FieldType["Image"] = "image";
    FieldType["Chart"] = "chart";
})(FieldType || (FieldType = {}));
export var ChartType;
(function (ChartType) {
    ChartType["Bar"] = "bar";
    ChartType["Bubble"] = "bubble";
    ChartType["Line"] = "line";
    ChartType["Pie"] = "pie";
    ChartType["Polar"] = "polarArea";
    ChartType["Radar"] = "radar";
})(ChartType || (ChartType = {}));
export var BootStrap;
(function (BootStrap) {
    BootStrap["colsm"] = "col-sm";
    BootStrap["colmd"] = "col-md";
})(BootStrap || (BootStrap = {}));
export function typecheckCard(card) {
    return card;
}
