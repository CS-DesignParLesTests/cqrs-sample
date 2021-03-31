# Cqrs sample project
The goal of the project is to build a RESTful API with NestJs  and make it use Command Query Responsibility Segregation – CQRS.
For the development of this REST-API we will use the Test Driven Development (TDD) approach.

The theme of our API is "lockdown friendly 😷" a "click and collect", reserve a time slot to to go to the hairdresser 💇 like "https://reservations.jeanlouisdavid.com/reservation/salon"

# REST API 🛣️
The REST API is described below.

## Get list of possible reservation

### Request

`GET /reservation/`

    curl -i -H 'Accept: application/json' http://localhost:3000/reservation/

### Response

    HTTP/1.1 200 OK
    Date: Thu, 29 Feb 2021 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2
    [
	    {
		    "id": "1",
		    "title": "Mariana",
		    "Availability": [12:30, 12:45]
	    },
	    {
		    "id": "2",
		    "title": "Etienne",
			"Availability": [13:50, 19:20, 17:40]
	    }
    ]


## Make a reservation

`PUT /reservation/:id`


    curl -i -H 'Accept: application/json' -X PUT -d 'status=changed3' http://localhost:7000/reservations/1

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:32 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 41

    {"id":1,"name":"Mariana","status":"changed"}


## Delete a reservation

### Request

`DELETE /reservaiton/id`

    curl -i -H 'Accept: application/json' -X POST -d'_method=DELETE' http://localhost:3000/reservation/2/

### Response

    HTTP/1.1 204 No Content
    Date: Thu, 24 Feb 2011 12:36:33 GMT
    Status: 204 No Content
    Connection: close
   
   
## Try to delete same Thing again

### Request

`DELETE /reservation/id`

    curl -i -H 'Accept: application/json' -X DELETE http://localhost:7000/reservation/2/

### Response

    HTTP/1.1 404 Not Found
    Date: Thu, 24 Feb 2011 12:36:32 GMT
    Status: 404 Not Found
    Connection: close
    Content-Type: application/json
    Content-Length: 35

    {"status":404,"reason":"Not found"}

## Structure of the repository

```
├── src
│   ├── Queries
│   └── Entities
│   └── Commands
```
## ROADMAP 🤔

- [ ] Create entities object (Reservation class)
- [ ] Make API type (typescript)
- [ ] CQRS Get Route Get list of reservation
- [ ] CQRS Post Route Create a reservation
- [ ] CQRS Put Make a reservation
- [ ] CQRS Delete a reservation
