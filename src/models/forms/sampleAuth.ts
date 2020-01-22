import lang from '../../lang/index'
import { FieldType } from "./card"

const authCard = {
  fields: [
    {
      title: lang().email,
      type: FieldType.Text,
      db: 'username',
      placeholder: lang().email,
      width: '80%',
      maxLength: '50',
      required: 'true'
    },
    {
      title: lang().password,
      type: FieldType.Password,
      db: 'password',
      placeholder: lang().password,
      width: '80%',
      maxLength: '250',
      required: 'true'
    },
    {
      title: lang().login,
      type: FieldType.Button,
      action: 'submit',
      width: '40%'
    },
    {
      title: lang().register,
      type: FieldType.Button,
      action: 'other',
      width: '40%'
    }
  ],
  header: 'Login',
  alignment: 'center',
  offset1st: true
};

export default authCard;