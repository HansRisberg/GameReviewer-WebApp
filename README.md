Using C#, asp.net core web api with entity framework core, .NET v.8
React.js with axios and material UI in Frontend

In GameDetail.js I have a hidden api key: 
const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY || 'defaultApiKey';

To create a key go to https://console.cloud.google.com and set up a key, adding this library:  YouTube Data API v3 

This is a work in progress where I wanted to expand my knowledge in web-app creation. Because of this I wanted to have my own database instead of getting all the game information from an API like RAWG or IGDB.
It has a function for adding games to the database and sorting them based on their categories from a multiselect window. A user can log in to view their profile page and leave reviews on a game. 
I have tried to incorporate the Identity library in .NET 8, where I use a JWT to authenticate the users. 

I struggled a lot with getting Identity to work because I had not intended to have a User-System when I planned the app out. So I had to modify a lot of the files extensivly to get it to work. This was definetly a lesson learned for me about planing projects. 

I still have some work to do with the functions of the app, there are things I would like to add (favouritting games, friends requests, messages ect) and also a lot of styling remains to be done. 
