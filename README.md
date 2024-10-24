# SCISSOR
## Overview
Brief is the new black, this is what inspires the project "Scissor". In today’s world, it’s important to keep things as short as possible, and this applies to more concepts than you may realize. From music, and speeches, to wedding receptions, brief is the new black. Scissor is a simple tool that makes URLs as short as possible.


## API Documentation
### Create user
**URL**: `/auth/register`
**METHOD**: `POST`

**Request Body**:
```json
{
  "first_name": "James",
  "last_name": "King",
  "email": "james23@gmail.com",
  "password": "jdfk83#jds"
}
```


### Login user
**URL**: `/auth/login`
**METHOD**: `POST`

**Request Body**:
```json
{
  "email": "james23@gmail.com",
  "password": "jdfk83#jds"
}
```


### Shorten URL
**URL**: `/url`
**Method**: `POST`

**Request Body**:
```json
{
  "longUrl": "https://mongoosejs.com/docs/queries.html",
  "customAlias": "queries"
}
```


### Redirect URL
**URL**: `/url/redirect/:code`
**Method**: `GET`


### Generate QR-Code for URL
**URL**: `/url/generate-qrcode`
**Method**: `POST`

**Request Body**
``` json
{
    "shortUrl": "http://localhost:8000/devhub"
}
```


### Get all shortend URLs
**URL**: `/url`
**Method**: `GET`


### Get url by ID
**URL**: `/url/:id`
**Method**: `GET`


### Update URL by ID using custom-alias
**URL**: `/url/id`
**Method**: `PUT`

**Request Body**:
``` json
{
  "newAlias": "mongoose-queries"
}
```


### Delete URL by ID
**URL**: `/url/:id`
**Method**: `DELETE`