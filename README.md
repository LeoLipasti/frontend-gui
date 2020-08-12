### Frontend-GUI
Depends on infrastructure for environment settings.<br>
CORS issues avoided with api-proxy.
Follows Model–view–presenter (MVP) logic for files.

/entities -> data entities imported to use for models

/models -> object definitions for component Presenter
    /list/list.ts -> interface for any list element
    /list/yourModel.ts -> your new frontend elements or imported entities

/components/***Presenter.js -> Presenters as middle-men

React is -> View

This is a template for frontend that aims to automate data handling between backend api using **JSON:API** specification and **types** in data.<br>
As front end developer you can use the ready offered reusable components (Presenters). As such they work as conditional react components that expect specific inputs, most importantly a model. Models are your definition for the displayed data. Take a look at the given sample models. Much of the data turned to states is handled with redux where the JSON types play a very important part.<br>
<br>
To ensure you have created proper models there are tests available. I would encourage writing models first in typescript as it will already give you errors if the model format is wrong to begin with. Using tests however is also recommended. Current version has a responses folder under tests which you can use to store actual call responses for testing that the attributes and json response match with your models and if not give detailed errors.<br>
<br>
This template is still under works and is very likely to change.<br>

### Development
npm run dev<br>
runs 2 instances: <br>
api at port 8096, <br>
frontend at 8097

### Production
npm run build && npm start

### Commit
npm run commit

### Requirements

**Backend:**
This frontend template is automated in sense of handling data by reducing manual work and errors. The format should follow JSON:API.
This however comes with a requirement that every set of table data should be defined with a type and type should be unique per set. This is the most important requirement.
If tables of data share the same type then they would override and mix eachother via redux. And having no type would result to having no automation.

To avoid mistakes I have added tests for which you should give correct reference responses.

### React
bundle.js is build to the public folder.<br>
Fetch calls tailored for JSONAPI format.<br>
React helmet for SEO.

### React Workflow

**"Presenter" COMPONENTS:**

"Presenter" Components are written to handle attributes with ease but also have a very important task of triggering model requests from middle proxy server (between backend and frontend) and then presenting visuals based on given model.<br>

This middleware given model makes these possible (to develop):<br>
A. authorization level based models e.g. admins only get certain models.<br>
B. Only share models after authentication token and even no hints to backend/database structure.<br>
C. With more modifications even send models (in correct object format) from backend services if useful<br>

! Note that model does not stand for data itself but is the presenting frame for a presenter.<br>
A Presenter may display forms based on model without or with data.<br>
data must be passed to Presenter component as attributes prop.<br>

**./components/** contains available Presenters. Develop more when needed but most cases you should be able to reuse what's already there.
**./components/presenter_elements/** contains repeated sub-components used for Presenters and their functions. You shouldn't need to care about these files. They contain the many cases for rendering components and as such are not easy for humans to read.<br>

One shouldn't touch **presenter_elements** other than for bug fixing. For example a card contains conditional rendering for most types of html5 input fields and will render fields based on the model passed to it.<br>
These files if modified will affect **ALL** Presenters that use them.<br>

For security never import models directly into react files as they will then always be visible to user after build, making the middleware useless. Only import models for server.js<br>

**"Presenter" Models AND TYPESCRIPT:**

Ts files should be used when creating defining new models (to reduce dev errors) and compiled then to js. If you then import your file to given typechecks.ts in the folders, you can instantly see if there is an error in your object. with this setup typechecks.ts files are ignored in compilation.

**FETCH:**

Fetch calls are also used in a more automated way. A fetch call is defined which takes in following parameters:

*   {String} devPath
*   {Object} devOptions
*   {Boolean} devToken
*   {String} reduxID
*   {Number} userOffset
*   {String[]} userFilters

sample calls:<br>
jsonFetch( '/something', { method: 'PATCH' }, true, somedatatype, 0, [] );<br>
jsonFetch( '/health', { method: 'GET' }, false );<br>

You might not even need to use jsonfetch, see first if redux actions offer already implemented ones such as req_formSubmits by using Presenters.

This fetch call doesn't require API_ENDPOINT as it is taken from environment settings (nconf).

**REDUX:**

This gui relies heavily on redux which bonds together with fetch calls. JSONApi type is used to store fetched data into states as well as store token, and automatically determine right fetch format if you use given Presenters.

The redux states are separated into three categories:<br>
**Responses** - data from responses - e.g. Tables<br>
**Requests** - data for requests - e.g. Forms<br>
**Static** - data that belongs to neither - e.g. Language and app states<br>

You should follow this structure as it makes sense for Forms to have both: <br>
response states = attribute form fills based on api response<br>
and<br>
request states = user form fills for submit<br>

In practise<br>
First check reducers index to see import names as they are the base state name in redux with this setup (appPath,req_cardButtons,res_responseStates...)<br>
Then the actual type<br>
res_ and req_ in state names are for clarity when debugging via reduxDevTools

example: state.res_responseStates['sampleProfiles']

### STYLING

This setup aims to use best of everything which is why there's some css, bootstrap and react inline-styling.<br>

**./style/css**
Big elements on the page use containers defined by basic css.<br>
Also potential custom elements which would fail to work well with react-style and cannot be achieved with boostrap.

**./style/bootstrap**
For automatic form field sizing bootstrap related strings are defined here and must not be removed! Make use of these objects when you wish to reduce dev errors.<br>

**./style/modules**
Presenters use this information. Or now depricated? Should at least be renamed to presenters. Modules is now called presenters.<br>

**./style/rules**
Presenters use this information. Or now depricated?<br>

**./style/scss**
Bootstrap files. Can be modified for desired styling. To build the bootstrap use **npm run bootstrap**. A npm run build is also required after.<br>

For most styling just apply bootstrap classes in react.

**./style/chartjs**

Styling files for chartjs.

### CHARTJS

Package includes chartjs. React Components are available and are very basic but as such can already display data.
Chartjs does not work well with bootstrap which is understandable because of canvas resizing javascript. Please use basic css or inline styles for chartjs elements and minimal bootstrap.

### FONTAWESOME

Font Awesome in index.html allows these icons:
https://fontawesome.com/icons?from=io

currently available for buttons, form field titles, list item, list button, table column title, table column button

use them in models like so:
        {
            title: 'Username',
            type: FieldType.Text,
            db: 'username',
            placeholder: lang.email,
            maxLength: '50',
            icon: 'address-book fa-fw',
        },

'fa fa-' String is added always inside components so you can start with icon name and any additional strings supported by font awesome such as here fa-fw adds space between icon and text.