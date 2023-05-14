// import express (after npm install express)
const express = require('express');

// create new express app and save it as "app"
const app = express();
app.use(express.json());

// server configuration
const PORT = 3000;

const MongoClient = require('mongodb').MongoClient;

kubec
const mongoUsername = process.env.MONGO_INITDB_ROOT_USERNAME;
const mongoPassword = process.env.MONGO_INITDB_ROOT_PASSWORD;

// Connection URL
const url = `mongodb://${mongoUsername}:${mongoPassword}@${mongoHost}:${mongoPort}`;




// POST endpoint to insert a document
app.post('/addStudent', async (req, res) => {
  try {
    // Retrieve the document from the request body
    const document = req.body;

    // Connect to MongoDB
    const client = await MongoClient.connect(url, { useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    // Select the database
    const db = client.db("student_db");

    // Select the collection
    const collection = db.collection("students");

    // Insert the document into the collection
    const result = await collection.insertOne(document)
      .then(() => console.log('Document inserted'))
      .catch((error) => console.error('Error inserting document:', error))
      .finally(() => client.close());

    // Respond with a success message
    res.status(200).json({ message: 'Document inserted successfully' });
  } catch (error) {
    console.error('Error inserting document:', error);

    // Respond with an error message
    res.status(500).json({ error: 'An error occurred while inserting the document' });
  }
});


// POST endpoint to read a document
app.post('/readStudent', async (req, res) => {
  try {
    // Retrieve the document from the request body
    const document = req.body;

    // Connect to MongoDB
    const client = await MongoClient.connect(url, { useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    // Select the database
    const db = client.db("student_db");

    // Select the collection
    const collection = db.collection("students");

    // Insert the document into the collection
    collection.find(document).toArray()
        .then((documents) => {
          console.log('Documents found:');
          //console.log(documents);
          res.status(200).json({ message: documents });
        })
        .catch((error) => console.error('Error querying documents:', error))
      .finally(() => client.close());

    // Respond with a success message
    //res.status(200).json({ message: result });
  } catch (error) {
    console.error('Error reading document:', error);

    // Respond with an error message
    res.status(500).json({ error: 'An error occurred while reading the document' });
  }
});



// POST endpoint to update a document
app.post('/updateStudent', async (req, res) => {
  try {
    // Retrieve the document from the request body
    //const document = req.body;
    const filter = '{ "filter": { "name": "'+req.body.name+'" }, "update": { "age": '+req.body.age+' } }'
    //console.log(filter);
    const document = JSON.parse(filter);
    //console.log(document);

    // Connect to MongoDB
    const client = await MongoClient.connect(url, { useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    // Select the database
    const db = client.db("student_db");

    
    // Select the collection
    const collection = db.collection("students");

    // Insert the document into the collection
    collection.updateOne(document.filter, { $set: document.update })
        .then((documents) => {
          console.log('Document Updated:');
          //console.log(document);
          res.status(200).json({ message: document });
        })
        .catch((error) => console.error('Error updating the documents:', error))
      .finally(() => client.close());

    // Respond with a success message
    //res.status(200).json({ message: result });
  } catch (error) {
    console.error('Error updating document:', error);

    // Respond with an error message
    res.status(500).json({ error: 'An error occurred while updating the document' });
  }
});


// POST endpoint to delete a document
app.post('/deleteStudent', async (req, res) => {
  try {
    // Retrieve the document from the request body
    const document = req.body;

    // Connect to MongoDB
    const client = await MongoClient.connect(url, { useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    // Select the database
    const db = client.db("student_db");

    // Select the collection
    const collection = db.collection("students");

    // Insert the document into the collection
    const result = await collection.deleteOne(document)
    .then(() => console.log('Document Deleted'))
      .catch((error) => console.error('Error deleting document:', error))
      .finally(() => client.close());

    // Respond with a success message
    res.status(200).json({ message: 'Document deleted successfully' });
  } catch (error) {
    console.error('Error deleteing document:', error);

    // Respond with an error message
    res.status(500).json({ error: 'An error occurred while deleting the document' });
  }
});



// create a route for the app
app.get('/', function (req, res) {
  res.send('This is a Student Management microservice \n \
              <br>On this microservice, there are four endpoints:</br> \n \
                  <li>POST /addStudent - takes the request body as completed document to be insterted into the DB</li> \n \
                  <li>POST /readStudent - takes all the columns from request body to read documents from the DB</li> \n\
                  <li>POST /updateStudent - takes "name" from request body and update the "age" of the student into DB</li> \n\
                  <li>POST /deleteStudent - takes all the columns from request body to delete top most (based on the instered time) matching document from the DB</li> \n \
                      <br>Example requets body is as\
                       "{   \
                        "name": "John Doe", \
                        "age": 31 \
                    }"</br>\n \
          ');
});


// make the server listen to requests
app.listen(PORT, () => {
  console.log(`StudentManagement microservice listening at: http://localhost:${PORT}/`);
});
