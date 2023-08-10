const MongoClient = require('mongodb').MongoClient;

const client = new MongoClient('mongodb+srv://terromaher:jmxKzFwlhNsMrlOf@cluster0.jk8s3sf.mongodb.net/project0');

async function connect() {
  await client.connect();
  console.log('Connected to MongoDB');
}

connect();