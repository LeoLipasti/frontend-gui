### columns [] :

###### title
 title for table column.

###### type
 type must be text or a button

###### db
 data name for calls. Use this as the actual data naming

###### placeholder
 placeholder text displayed on undefined data

###### width
 use percentage for convenience. Mobile stretches inputs to 100%

### type: button
 buttons need an action which can be a redux action name defined in res_tableButtons.js.

### ADDITIONAL

###### header (optional)
 header text for table

###### alignment
 align floating content such as buttons to right/center/left

###### type
 type is the redux state for these attributes and must match with redux state name

###### fillempty
 if less results than a page, fill missing with empty rows