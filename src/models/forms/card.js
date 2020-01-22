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
})(FieldType || (FieldType = {}));
export function typecheckCard(card) {
    return card;
}
