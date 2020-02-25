import lang from '../../lang/index'
import { FieldType } from "./card"
// feel free to use more typescript here to reduce typing errors
var testCard = {
    fields: [
        {
            type: FieldType.RowStart
        },
        {
            title: 'Required',
            type: FieldType.Text,
            db: 'email',
            placeholder: lang.email,
            maxLength: '50',
            required: 'true'
        },
        {
            title: 'Username',
            type: FieldType.Text,
            db: 'username',
            placeholder: lang.email,
            maxLength: '50',
        },
        {
            type: FieldType.RowEnd
        },
        {
            title: 'info',
            type: FieldType.Displaytxt,
            db: 'info',
            message: 'optional message, if none then uses attributes',
        },
        {
            title: 'Select',
            type: FieldType.Select,
            db: 'choise',
            options: [
                { title: 'Snow', db: 'snow' },
                { title: 'Rain', db: 'rain' },
            ],
        },
        {
            title: 'Story',
            type: FieldType.Textarea,
            db: 'story',
            rows: '5',
            cols: '50',
        },
        {
            title: 'locked',
            type: FieldType.Text,
            db: 'msg',
            locked: 'true',
            placeholder: 'locked value',
            maxLength: '50'
        },
        {
            title: 'monday',
            type: FieldType.Radio,
            name: 'weekday',
            db: 'monday',
            placeholder: true,
        },
        {
            title: 'friday',
            type: FieldType.Radio,
            name: 'weekday',
            db: 'friday',
            placeholder: false,
        },
        {
            title: 'Daily',
            type: FieldType.Checkbox,
            db: 'rain',
            placeholder: false,
        },
        {
            title: lang.email,
            type: FieldType.Text,
            db: 'username',
            placeholder: lang.email,
            maxLength: '50'
        },
        {
            title: 'Color',
            type: FieldType.Color,
            db: 'color',
        },
        {
            title: 'File',
            type: FieldType.File,
            db: 'file',
        },
        {
            title: lang.email,
            type: FieldType.Text,
            db: 'username',
            placeholder: lang.email,
            maxLength: '50'
        },
        {
            title: 'Date',
            type: FieldType.Date,
            db: 'date',
        },
        {
            title: 'Datetime local',
            type: FieldType.Datetimelocal,
            db: 'date',
        },
        {
            title: 'Month',
            type: FieldType.Month,
            db: 'month',
        },
        {
            title: 'Time',
            type: FieldType.Time,
            db: 'month',
        },
        {
            title: 'Number',
            type: FieldType.Number,
            db: 'number',
            max: 4,
            min: 0,
        },
        {
            title: 'Banana phone',
            type: FieldType.Tel,
            db: 'phone',
            max: 4,
            min: 0,
        },
        {
            title: 'Range',
            type: FieldType.Range,
            db: 'number',
            max: 4,
            min: 0,
        },
        {
            title: 'redux',
            type: FieldType.Button,
            action: 'sampleAction',
        },
        {
            title: lang.password,
            type: FieldType.Password,
            db: 'password',
            placeholder: lang.password,
            maxLength: '250'
        },
        {
            title: 'Submit',
            type: FieldType.Button,
            action: 'submit',
        },
        {
            title: lang.register,
            type: FieldType.Button,
            action: 'other',
        }
    ],
    header: 'Sample fields'
};
export default testCard;
