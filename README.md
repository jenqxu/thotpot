# thotpot

## Idea
A hot pot matchmaker where people will be able to find other people based on their hot  pot preferences and availability, which will be displayed in their profiles. Users can either start a group where others can join or decide to join other groups. 

## Components
1. HTML input field: where users fill in their profile data. As users fill in these fields, a drop down menu will open and give autocomplete suggestions as the user types their answer. Profils includes soup base, spice level, location, time/date, party size, ingredients, dietary restrictions, friends, picture, and bio. 

2. Sign up process with username/email and password. Will store info a/b the preferences of hot pot for the user. 

3. Create, read, update resource from public, private, user. 
  - Public data store is where any user can create and read profiles, and non-authenticated users will be able to search for other users/groups, create their own user, or report/delete users/groups for suspicious activity. 
  - Private data store is where only logged in users will be able to connect with other users and create groups to go to hot pot. User will be able to create groups, search groups, and delete groups based on suspicious behavior.   
  - User data store is where users will be able to edit their own profle data. Will be able to add preference to their profile, delete preferences, and search for preferences (e.g. a specific soup base). 
    
4. Dynamic data source: Content will be developed using templates for groups and profiles. Personalized profile data will be filled in dynamically based on input from the user.

5. 3rd Party API. Google maps API will be used to display hot pot groups in the area. Stormpath will also be considered for use due to the nature of account registration that needs to happen in order to connect users. It will also allow for integration with the most popular social media platforms such as Facebook and Google.



## Use
When user first opens the app, they will have access to the log-in page or create an account. Here they will choose their personal preferences.  
Once the user has a profile, they will have a feed where they can look through other profiles of random users or search for specific users. 
Users can connect with each other and create an event. The event will then be displayed on the profiles of the useres involved. 
Other users will then see the event on these profiles, and they can choose to connect in order to join this event. 






