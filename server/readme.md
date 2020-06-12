# Movie App
**Movie App** is your personal app movie, search for movie, actor, trailer and many more

## API Documentation

POST: http://localhost:3000/register
Request Body: {
email: your@email.com
password:12345678
}
Response 201: {

"msg": "Successfully created new user"

}
Response 400: {

"err_code": 400,

"err_msg": "Email already exist"

}

POST: http://localhost:3000/login
Request Body: {
email: your@email.com
password:12345678
}

Response 200: 
{
    "id": 2,
    "email": "getar2@gmail.com",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJnZXRhcjJAZ21haWwuY29tIiwiaWF0IjoxNTkxOTQzNTYwfQ.taoH67mlrTNqSgyAwEXfuUjjDBEXc1fD2SB9XYc28UQ"
}

Response 400:
{

"err_code": 400,

"err_msg": "Email not found"

}  OR
{

"err_code": 400,

"err_msg": "Incorrect password"

}


POST: http://localhost:3000/Movie
Request Headers: {
	"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJnZXRhcjJAZ21haWwuY29tIiwiaWF0IjoxNTkxOTQyNTMxfQ.MHe9g3TMTwb-hQ8IFYhV6sZ3-IJOt5sN6ItfdFgwFS8"
}
Request Body: {
	"title": "Avenger"
}

Response200: 
  [
    {
        "popularity": 21.713,
        "vote_count": 15005,
        "video": false,
        "poster_path": "/vSNxAJTlD0r02V9sPYpOjqDZXUK.jpg",
        "id": 1771,
        "adult": false,
        "backdrop_path": "/iQh64TQiPoTK3yZ3duC3y0tKgy3.jpg",
        "original_language": "en",
        "original_title": "Captain America: The First Avenger",
        "genre_ids": [
            28,
            12,
            878
        ],
        "title": "Captain America: The First Avenger",
        "vote_average": 6.9,
        "overview": "During World War II, Steve Rogers is a sickly man from Brooklyn who's transformed into super-soldier Captain America to aid in the war effort. Rogers must stop the Red Skull – Adolf Hitler's ruthless head of weaponry, and the leader of an organization that intends to use a mysterious device of untold powers for world domination.",
        "release_date": "2011-07-22"
    }, 
      {object}, 
      {object},
      {object}
  ]
    