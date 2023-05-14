# sit323_737-2023-t1-prac9p
sit323_737-2023-t1-prac9p


---------------------------------------------------

This is a Student Management microservice
On this microservice, there are four endpoints:

POST /addStudent - takes the request body as completed document to be insterted into the DB

POST /readStudent - takes all the columns from request body to read documents from the DB

POST /updateStudent - takes "name" from request body and update the "age" of the student into DB

POST /deleteStudent - takes all the columns from request body to delete top most (based on the instered time) matching document from the DB

Example requets body is as "{ "name": "John Doe", "age": 31 }"
