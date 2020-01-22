### fields [] :

###### title
 title above input fields. import titles from lang file

###### type
 type must be html5 input type or a button
 notice that radiobuttons need the shared name

###### db
 data name for calls. Use this as the actual data naming

###### placeholder (optional)
 displays placeholder value for input field

###### width
 use percentage for convenience. Mobile stretches inputs to 100%

###### maxLength
 maxLength for text, password fields

###### max / min
 max or min for number input fields

### type: button
 buttons need an action which can be 'submit' / 'other' / 'renameThisReduxAction'
 'submit' is used to trigger form submit event
 'other' is used to trigger other event in parent component such as cancel or register instead of login
 'renameThisReduxAction' as existing redux action name in cardbuttons.js must be given for any buttons other than 'submit' or 'other'.

### type: select
 options must be given as an array of objects with title and db
 [{ title: x, db: x }]

### ADDITIONAL

###### header (optional)
 header text for card

###### alignment
 align floating content such as buttons to right/center/left

###### offset1st (optional)
 offset1st: true - offsets inputs down, good when only two inputs