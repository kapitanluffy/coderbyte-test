## Authentication

To keep things simple, retrieve an `access_token` using a username & password. You will use this as a `Bearer` token for authorization.

The response is made compatible for oauth2 password grant types.

_You must [create a user](#creating-a-user) first_

Request:
```
POST /auth/token
{
    "username": string,
    "password": string
}
```

Response
```
{
    "access_token": string,
    "token_type": "Bearer",
    "expires_in": 3600
}
```

## Users

### Creating a user

Request:
```
POST /auth/signup
{
    "username": string,
    "password": string
}
```

Response
```
{
    "id": number,
    "username": string,
    "credits": number,
    "extraCredits": number,
    "refreshDate": date-string,
    "createdAt": date-string,
    "updatedAt": date-string"
}
```

### Add credits to current user

Request:
```
POST /users/me/credits
{
    "credits": number
}
```

Response: `HTTP.NO_CONTENT (204)`

### Get current user

Request:
```
GET /users/me
```

Response:
```
{
    "id": number,
    "username": string,
    "credits": number,
    "extraCredits": number,
    "refreshDate": date-string,
    "createdAt": date-string,
    "updatedAt": date-string"
}
```

## Posts

All requests to `/posts` will use a user credit. User credits reset monthly.

### Get all posts

Request:
```
GET /posts
```

Response:
```
[
    {
        "id": uuid,
        "title": string,
        "body": string,
        "userId": number
    }
]
```

### Get a post

Request:
```
GET /posts/:id
```

Response:
```
{
    "id": uuid,
    "title": string,
    "body": string,
    "userId": number,
    "createdAt": date-string,
    "updatedAt": date-string,
}
```

### Create a post

Request:
```
POST /posts
{
    "title": string,
    "body": string,
}
```

Response:
```
{
    "id": uuid,
    "title": string,
    "body": string,
    "userId": number,
    "createdAt": date-string,
    "updatedAt": date-string,
}
```

### Update a post

Request:
```
PATCH /posts/:id
{
    "title": string,
    "body": string,
}
```

Response: `HTTP.NO_CONTENT (204)`

### Delete a post

Request:
```
DELETE /posts/:id
```

Response: `HTTP.NO_CONTENT (204)`
