import { ItemType } from "../../tsutils/lists/list";
// list-type has to match with data and is used to link table names for redux
// feel free to use more typescript here to reduce typing errors
var sampleList = {
    items: [
        {
            title: 'name',
            type: ItemType.Text,
            db: 'name',
            placeholder: 'undefined',
            width: '30%'
        },
        {
            title: 'country',
            type: ItemType.Text,
            db: 'country',
            placeholder: 'undefined',
            width: '35%'
        },
        {
            title: 'sampleInteger',
            type: ItemType.Text,
            db: 'sampleInteger',
            placeholder: 'undefined',
            width: '20%'
        },
        {
            title: 'Edit',
            type: ItemType.Button,
            action: 'sampleAction',
            image: 'close',
            width: '15%'
        },
    ],
    alignment: 'left',
    type: 'sampleProfiles',
};
export default sampleList;
