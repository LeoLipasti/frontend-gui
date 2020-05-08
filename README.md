### Frontend-GUI
Depends on infrastructure for environment settings.<br>
CORS issues avoided with api-proxy.

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
(TODO) React helmet for SEO.

### React Workflow

**"PRESENTER" COMPONENTS:**

"Presenter" Components are defined as a larger entity to handle attributes with ease.

For example, a card contains conditional rendering for most types of html5 input fields.

These Presenters are then used as components and one of the parameters is a Model (Object) that defines all of the content of given card.<br>
These Presenters also take in attributes which are used to display the data. Redux is used to pass attributes inside the app.<br>
These Presenters have React-way passing function for triggers such as: closing card, form submit, input change.<br>
Additionally the Presenter allows Redux buttons for anything else. The Redux action name needs to be defined in the Model.<br>
Take a look at the files named as samples.

In case when these Presenters don't stretch enough to match the need, they can still be used as a base for something more custom.

Note that changing the Presenters changes every component everywhere. The way they are supposed to be used is by using models.

**"Presenter" COMPONENTS AND TYPESCRIPT:**

Ts files should be used when defining new models and compiled then to js. If you then import your file to given typechecks.ts in the folders, you can instantly see if there is an error in your object. with this setup typechecks.ts files are ignored in compilation.

**CSS:**

Containers and animations should be defined in regular css files.<br>
For inner css Presenter components use React inline-styles as conditional, dynamic rendering.<br>
Inline-styles import rules to avoid typing errors. Define css format e.g. units, and colors under rules.<br>
This ensures that everything follows the same definitions.

**FETCH:**

(TODO) Fetch calls are also use in a more dynamic way. A fetch call is defined which takes in following parameters:

*   endpoint
*   method
*   body (optional)
*   token (optional)
*   offset (optional)
*   filters (optional)

sample call:<br>
fetch( '/users/:id', 'patch', {}, 'token', offset: 12, filters: [] );

This fetch call doesn't require API_ENDPOINT as it is taken from environment settings (nconf).

**REDUX:**

(TODO) This app relies heavily on redux.