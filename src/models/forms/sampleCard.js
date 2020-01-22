import lang from '../../lang/index'
import { FieldType } from "./card";
// feel free to use more typescript here to reduce typing errors
var testCard = {
    fields: [
        {
            title: 'Required',
            type: FieldType.Text,
            db: 'email',
            placeholder: lang().email,
            width: '50%',
            maxLength: '50',
            required: 'true'
        },
        {
            title: 'Username',
            type: FieldType.Text,
            db: 'username',
            placeholder: lang().email,
            width: '50%',
            maxLength: '50',
            bg_color: 'warning',
            color: 'dunkelblau'
        },
        {
            title: 'info',
            type: FieldType.Displaytxt,
            db: 'info',
            message: 'optional message, if none then uses attributes',
            width: '100%',
        },
        {
            title: 'Select',
            type: FieldType.Select,
            db: 'choise',
            bg_color: 'weiss',
            options: [
                { title: 'Snow', db: 'snow' },
                { title: 'Rain', db: 'rain' },
            ],
            width: '100%',
        },
        {
            title: 'Story',
            type: FieldType.Textarea,
            db: 'story',
            rows: '5',
            cols: '50',
            width: '100%',
        },
        {
            title: 'locked',
            type: FieldType.Text,
            db: 'msg',
            locked: 'true',
            placeholder: 'locked value',
            width: '50%',
            maxLength: '50'
        },
        {
            title: 'monday',
            type: FieldType.Radio,
            name: 'weekday',
            db: 'monday',
            placeholder: true,
            width: '25%'
        },
        {
            title: 'friday',
            type: FieldType.Radio,
            name: 'weekday',
            db: 'friday',
            placeholder: false,
            width: '25%'
        },
        {
            title: 'Daily',
            type: FieldType.Checkbox,
            db: 'rain',
            placeholder: false,
            width: '20%'
        },
        {
            title: lang().email,
            type: FieldType.Text,
            db: 'username',
            placeholder: lang().email,
            width: '80%',
            maxLength: '50'
        },
        {
            title: 'Color',
            type: FieldType.Color,
            db: 'color',
            width: '25%',
        },
        {
            title: 'File',
            type: FieldType.File,
            db: 'file',
            width: '75%',
        },
        {
            title: lang().email,
            type: FieldType.Text,
            db: 'username',
            placeholder: lang().email,
            width: '50%',
            maxLength: '50'
        },
        {
            title: 'Date',
            type: FieldType.Date,
            db: 'date',
            width: '50%',
        },
        {
            title: 'Datetime local',
            type: FieldType.Datetimelocal,
            db: 'date',
            width: '50%',
        },
        {
            title: 'Month',
            type: FieldType.Month,
            db: 'month',
            width: '25%',
        },
        {
            title: 'Time',
            type: FieldType.Time,
            db: 'month',
            width: '25%',
        },
        {
            title: 'Number',
            type: FieldType.Number,
            db: 'number',
            width: '50%',
            max: 4,
            min: 0,
        },
        {
            title: 'Banana phone',
            type: FieldType.Tel,
            db: 'phone',
            width: '50%',
            max: 4,
            min: 0,
        },
        {
            title: 'Range',
            type: FieldType.Range,
            db: 'number',
            width: '50%',
            max: 4,
            min: 0,
        },
        {
            title: 'redux',
            type: FieldType.Button,
            action: 'sampleAction',
            width: '50%',
            color: 'weiss',
            bg_color: 'blau'
        },
        {
            title: lang().password,
            type: FieldType.Password,
            db: 'password',
            placeholder: lang().password,
            width: '100%',
            maxLength: '250'
        },
        {
            title: 'Submit',
            type: FieldType.Button,
            action: 'submit',
            width: '35%'
        },
        {
            title: lang().register,
            type: FieldType.Button,
            action: 'other',
            width: '35%'
        }
    ],
    header: 'Sample fields',
    alignment: 'center'
};
export default testCard;
