### "Presenter" COMPONENTS:

"Presenter" Components are written to handle attributes with ease.

**./components/** contains available Presenters. Develop more when needed but most cases you should be able to reuse what's already there.
**./components/presenter_elements/** contains repeated sub-components used for Presenters and their functions. You shouldn't need to care about these files. They contain the many cases for rendering components and as such are not easy for humans to read.

One shouldn't touch **presenter_elements** other than for bug fixing. For example a card contains conditional rendering for most types of html5 input fields and will render fields based on the model passed to it.
These files if modified will affect **ALL** Presenters that use them.

Presenters are used together with a Model (Object) that defines all of the visible content. In the best scenario all you need to do is define a new model, use existing Presenter components and pass the model-object to it to display data.<br>

Take a look at the files named as samples.<br>

In most cases Redux is used to pass attributes inside the app.<br>

### "Presenter" Models AND TYPESCRIPT:

Ts files should be used when creating defining new models (to reduce dev errors) and compiled then to js. If you then import your file to given typechecks.ts in the folders, you can instantly see if there is an error in your object. with this setup typechecks.ts files are ignored in compilation.

### Model:

**manually giving a field width in % :**

      width: '20%'

**manually grouping fields into a row:**

        {
            type: FieldType.RowStart
        },
        ... add field objects between ...
        {
            type: FieldType.RowEnd
        },

**forms:**
**See sampleCard.js**

current list types: text, textarea, displaytxt, password, radio,   select, checkbox, color, date, datetime-local, month, time, number, range, tel, email, file, button

options:
    header: header for the form

{
    fields: [
        {
            title: 'Username',
            type: FieldType.Text,
            db: 'username',
            placeholder: 'username',
            maxLength: '50',
        }
    ],
    header: 'Sample fields'
}



**lists:**
**See sampleList.js**

current list types: text , button

options:
    alignment: alignment of content inside list item
    type: String - data stored in Redux with this name

{
    items: [
        {
            title: 'Profile',
            type: 'text',
            db: 'clientName',
            placeholder: 'client',
            width: '90%'
        },
        {
            title: 'Show Details',
            type: 'button',
            action: 'actionNameInRedux',
            width: '10%'
        }
    ],
    alignment: 'left',
    type: 'sampleProfiles',
}

**tables:**
**See sampleTable.js**

table column element types: text , button

options:
    alignment: alignment of content inside column
    type: String - data stored in Redux with this name
    fillempty: Boolean - fill rest of a table to force fixed size

{
    columns: [
        {
            title: 'Year',
            type: 'text',
            db: 'year',
            placeholder: 'year'
        },
        {
            title: 'Select',
            type: 'button',
            action: 'actionNameInRedux',
            width: '10%'
        }
    ],
    alignment: 'left',
    type: 'sampleProfiles',
    fillempty: false
}
