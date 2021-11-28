# StudyBuddy

StudyBuddy is a web application that matches students with similar interests as accountability partners. Users will be able to schedule zoom study sessions with their “study buddy”, and be better motivated to complete their tasks when studying together. Users can also find new connections, saving past study buddies as friends, and message each other outside of the study session. 

## Folders
* Frontend
  - Studybuddy - React application
    + src - Folder contains code for frontend side
      + Components - Contains multiple components folder which were reused in this application
        + button
        + header
        + request_popup
        + search
        + signin
        + validation
        + zoon
      + pages - Folder included some main pages folder
        + buddies
        + findBuddy
        + home
        + landing
        + register
        + requestPopup
        + resetPassword
        + search
        + sendingRequest
* backend
  - model - Files defining constants for mongodb and defining the schema for collections.
  - routes - Files defining the express server and the subsequent endpoints in the server.
  - test - Files defining testing constants, data and functions.
  
## APIs
| Name      | File | Description     |
| :---        |    :----:   |          ---: |
| User      | backend/routes/user.js       | File defines endpoints for performing related account operations on the database    |
| Search      | backend/routes/search.js       | File defines endpoints for performing search operations on the database    |
| Zoom      | backend/routes/zoom.js       | File defines endpoints for creating a zoom link on the database    |
| Major      | backend/routes/major.js       | File defines endpoints for retrieving all available majors on the database    |
| Email      | backend/routes/email.js       | File defines endpoints for creating and sending a zoom link email    |
| Classes      | backend/routes/classes.js       | File defines endpoints for retrieving a page of classes on the database    |
| BuddyRequest      | backend/routes/buddyrequest.js      | File defines endpoints for performing buddyrequest operations on the database    |
