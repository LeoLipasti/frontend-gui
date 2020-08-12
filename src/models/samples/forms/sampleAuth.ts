import lang from '../../../lang/index'
import { FieldType } from "../../tsutils/forms/card"
import classNames from '../../../style/bootstrap/classNames';

const authCard = {
  fields: [
    {
      title: lang.email,
      type: FieldType.Text,
      db: 'username',
      placeholder: lang.email,
      maxLength: '50',
      width: classNames.md12,
      required: 'true',
      showOnCallStatus: ['waiting','error']
    },
    {
      title: lang.password,
      type: FieldType.Password,
      db: 'password',
      placeholder: lang.password,
      maxLength: '250',
      width: classNames.md12,
      required: 'true',
      showOnCallStatus: ['waiting','error']
    },
    {
      title: 'login error !',
      type: FieldType.Displaytxt,
      db: 'error',
      message: lang.genericerror,
      showOnCallStatus: ['error']
    },
    {
        title: 'connection error !',
        type: FieldType.Displaytxt,
        db: 'error',
        message: lang.servererror,
        showOnCallStatus: ['servererror']
    },
    {
      type: FieldType.Image,
      image: './images/spinner.gif',
      imageWidth: '25%',
      imageClass: 'rounded mx-auto d-block',
      imageAlt: 'spinning icon',
      width: classNames.md12,
      showOnCallStatus: ['calling']
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
  header: lang.login
};

export default authCard;