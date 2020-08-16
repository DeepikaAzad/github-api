# Github API Demo
 
System Requirements: Node 6.x+
 
Before starting the project,
* Get Access Token from your GitHub account, make sure you have allowed `user:follow` scope while creating token.
 
To run the project:
1. cd to the project directory.
2. npm install
3. Create .env from .env.example.
4. By default, the application is launched 3000 port. To modify, update .env file.
5. Replace your OAuth Token in .env file with `GITHUB_API_KEY` and GitHub username with `GITHUB_USER`.
7. Run command `node index`. 
6. Go to Browser and hit http://localhost:3000/
  
Api: 
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/e67f3ed98833d45fc393)

Features:
1. Have implemented Facebook/react repository's fork members list with pagination.
2. Users can follow the fork members.
 
Technology:
* Express
* Angular 1.4 - I am not well-versed with Angular2.
 
Known Issues:
* Implemented very basic frontend.
* Not implemented unit testing.
* On page load, followed member should be shown already followed but click on `Follow` button will get to know the member is already followed.
 
 
Please feel free to contact me with any queries.
 
Deepika Azad
azaddeepika05@gmail.com


