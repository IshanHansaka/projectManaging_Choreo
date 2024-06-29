const express = require("express");
const app = express();
const port = 5000;

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
//add downloadedd service account JSON file path
var serviceAccount = require("./serviceAccount.json");

initializeApp({
  credential: cert(serviceAccount),
  //add your project_id
  databaseURL: "peapleapi.firebaseio.com",
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/projects", (req, res) => {
  try {
    const db = getFirestore();
    const people = db.collection("projects");
    people.get().then((snapshot) => {
      const projects = [];
      snapshot.forEach((doc) => {
        projects.push(doc.data());
      });
      res.send(projects);
    });
  } catch (error) {
    res.status(500);
    res.send({
      message: "Error getting projects",
      error: error,
    });
  }
});

app.post("/projects", (req, res) => {
  const requestBody = req.body;
  try {
    const db = getFirestore();
    const project = db.collection("projects");
    project.add(requestBody).then(() => {
      res.send({
        message: "Project added successfully",
        project: requestBody,
      });
    });
  } catch (error) {
    res.status(500);
    res.send({
      message: "Error adding project",
      error: error,
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
