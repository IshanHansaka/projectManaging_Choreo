const express = require("express");
const app = express();
const port = 5000;

const { initializeApp, cert } = require('firebase-admin/app');
var serviceAccount = require("serviceAccount.json"); //add downloadedd service account JSON file path

initializeApp({
    credential: cert(serviceAccount)
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
