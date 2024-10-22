# SCISSOR
## Overview
Brief is the new black, this is what inspires the project "Scissor". In today’s world, it’s important to keep things as short as possible, and this applies to more concepts than you may realize. From music, and speeches, to wedding receptions, brief is the new black. Scissor is a simple tool that makes URLs as short as possible.


## API Documentation
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
**URL**: `http:localhost:8000/url/queries`
**Method**: `GET`


### Generate QR-Code for URL
**URL**: `/url/generate-qrcode`
**Method**: `POST`

**Request Body**
``` json
{
    "shortUrl": "http://localhost:8000/url/devhub"
}
```


### Get all shortend URLs
**URL**: `/url`
**Method**: `GET`


### Update URL by ID using custom-alias
**URL**: `/url/id`
**Method**: `PUT`

**Request Body**:
``` json
{
  "newAlias": "wiki-wikihomepage"
}
```


### Delete URL by ID
**URL**: `/url/id`
**Method**: `DELETE`