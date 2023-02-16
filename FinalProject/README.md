# REDKICKS
## Group Q: Final Project

### What Works
- Coaches can be added, and they can view their profile, their team, team injuries, and matchups.
- Coaches can create injuries and team players, as well as view other coaches and teams.
- Admins can create teams and matchups.
- All API endpoints are complete, with all GET and POST routes fully tested.
- Service Worker and Offline functionality have been implemented.
- All links work as intended.
- Users authenticate before being able to use the application.
- New users/coaches can register on the app.
- New injuries / teams / players / coaches / matchups can be created and interacted with.
- Players can be removed from roster

### What Doesn't Work
- Multer does not currently work for our implementation. In the meantime, we use imgur links.

### List of Pages
Page Name  | How to Navigate | Offline Functionality
---------- | --------------- | ----------------------
Login | This is the default page. Other pages will route back to this if no user is logged in. | N/A
CreateUser | Login Page -> Click on "Create new account" | N/A 
Home | Login as coach -> This is the landing page after login. | Cached and viewable offline.
Coach | Login as coach -> Click on Profile Picture on top right | Cached and viewable offline.
Roster | Login as coach -> Click on Roster | Cached and viewable offline. Adding a player is not available offline.
Injuries | Login as coach -> Click on Injuries | Cached and viewable offline. Adding an injury is not available offline.
Player Card | Login as coach -> Click on Roster -> Click any player | Cached and viewable offline.
Matchups | Login as coach -> Click on Matchups | Cached and viewable offline.
Team | Login as coach -> Click on Matchups -> Click any opponent's logo | Cached and viewable offline.
Admin | Login as admin from Login Page | Cached, but no functionality.
Offline | Login Page -> Log in while offline. | Informs the user that they are offline.


### Caching Strategy
[Insert stuff here]
fetch first, cache second, offline page third.

### A brief description of your authentication and authorization processes. What techniques are you using? What data is being stored where and how? How are you making sure users only access what they are allowed to?
We used a similar process as shown in class to authenticate our users. We generate JSON Web Tokens using the jsonwebtoken library and store these in cookies checking time to live and validity of cookie. The current user is stored in local storage for easy access through js. Users that are not logged in are rerouted to the Login page. Example User/Password: AWennger/password, AFerguson/password, JMourinio/password.

### ER Diagram
![ER Diagram](https://github.ncsu.edu/engr-csc342/csc342-2022Fall-groupQ/blob/master/Milestone2/frontend/src/static/img/ERDiagram.png?raw=true)

### API Endpoints
API Endpoints were left unchanged from the previous iteration.
Method | Route                 | Description
------ | --------------------- | ---------
`GET`  | `/teams`              | Retrieves all teams  
`GET`  | `/teams/:teamId`      | Retrieves the team with the given ID. 
`GET`  | `/teams/:teamId/players`| Retrieves all players of a given team. 
`GET`  | `/teams/:teamId/injuries`| Retrieves all players with injuries of a given team. 
`GET`  | `/teams/:teamId/schedule` | Returns the list of upcoming games for a specified team. 
`GET`  | `/injuries`           | Retrieves all injuries. 
`GET`  | `/injuries/:injuryId` | Retrieves the injury with the given ID. 
`GET`  | `/players`            | Retrieves all players 
`GET`  | `/players/:playerId`  | Retrieves the player with  the given ID. 
`GET`  | `/players/:playerId/injury` | Retrieves the current injury of a given player.  
`GET`  | `/schedule` | Returns the list of upcoming games.
`GET` | `/users/current` | Retrieves current user.
`POST` | `/users/login` | Log into RedKicks as a coach.
`POST` | `/users/logout` | Log out of RedKicks.
`POST` | `/coaches`    | Insert a new coach.
`POST` | `/players`    | Insert a new player. 
`POST` | `/teams`    | Insert a new teams. 
`POST` | `/injuries`    | Insert a new injury. 
`POST` | `/schedule` | Insert a new game into the schedule. 




