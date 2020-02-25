import lang from '../../lang/index'
import { FieldType } from "./card";
var authCard = {
    fields: [
        {
            title: lang.email,
            type: FieldType.Text,
            db: 'username',
            placeholder: lang.email,
            maxLength: '50',
            required: 'true'
        },
        {
            title: lang.password,
            type: FieldType.Password,
            db: 'password',
            placeholder: lang.password,
            maxLength: '250',
            required: 'true'
        },
        {
            title: lang.login,
            type: FieldType.Button,
            action: 'submit',
        },
        {
            title: lang.register,
            type: FieldType.Button,
            action: 'other',
        }
    ],
    header: 'Login'
};
export default authCard;
