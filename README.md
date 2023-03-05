# AniMedia
![facebook_cover_photo_1](https://user-images.githubusercontent.com/70659748/207225784-8d3cd428-2144-4a98-8645-f2956e8b5955.png)

AniMedia is a web application that allows users to review anime that they have watched. Users can search any anime they would like, add it to their favourites page, give it a rating and even leave a review. All of the top rated animes on AniMedia can be viewed on the main page along with the ratings if the button underneath the anime is clicked. The anime search functionality also allows users to view information about the main characters of that anime.

## Motivation

The main motivation for this anime reviewing application was to provide my siblings and cousins a place to review the anime they have watched and keep track of them through their favourites page. By having a rating and reviewing system, all of the kids in my family are able to better gauge what they want to watch next. Also in the future all of us can look back at the reviews we left and the animes we watched.

## Tech Stack
MongoDB, Express, Node and React

## Challenges
I had a hard time figuring out how I wanted to store JWT tokens in the frontend so I can use them as a part of the requests I make to the backend. With the options of local storage, session storage and cookies I decided to go with local storage since it was something I was familiar with.

Another challenge was to get the data of the clicked anime into the model to display. The mapping technique I used to render the anime cards made this process quite confusing but I managed to come up with a solution that used useState.

## Accomplishments
I managed to complete a full stack project from start to finish. It is now running and being used by 10+ people who have viewed, rated, reviewed and favourited anime already!

## Future Improvements
In terms of a security aspect, I could store the JWT tokens in cookies rather than local storage or session storage. Even though session storage data is cleared when the session ends it doesn't completely remove the risk of token theft. I believe that with HttpOnly cookies, it will be much safer from attackers.

## Link To Backend Code
https://github.com/Parmvir-S/AnimeReviewer-Backend 
