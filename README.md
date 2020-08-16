# Clevero Full Stack Hiring Challenge

System Requirements: Node 6.x+

Before starting the project,
    * Update the mongoDB URL: ./models/index.js
    * Create a collection named 'taskCategories' and run the migration in the project: migration.sql

To run the project:
    1. cd to project directory.
    2. npm install
    3. By default, application is launched@3000 port. To modify, update the ./index.js file.
    4. If modifying the port, then also update the '~.service.js' baseURL port number.


Feauters:
1. Have implemented secure oauth register/login using passport-local.
2. Have implemented user based ToDo App.
3. Each logged-in user, will be able to add todo tasks to the list.
4. Added due date functionality.
5. Added Lable-wise task curation.
6. Can mark a task as completed, which is persisted.
7. User can delete the tasks after marking them as completed.
8. All the APIs are securly oauth protected and data sharing between the Front-End and Back-End is in JSON.
9. All the users, and their corresponding data is persisted in MongoDB, along with hashed passwords.
10. Code is very modular, following the standard pratices with basic documentaion.


Technology:
* Express
* Passport-local
* Angular 1.4 - I am not well-versed with Angular2.


Known Issues:
* Label CSS is hard-coded to only given in the list.
* Cannot add more labels customised to each User.
* No validations on due-date.
* Not well-tested.


Please feel free to contact me for any queries.

Sagar Chilukuri
sagarch888@gmail.com
+91 9480309290.