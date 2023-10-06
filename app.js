const express = require("express");
const port = 8000;
const app = express();
const bodyParser = require("body-parser");
const router = require("./routes/router");
const cors = require("cors");
app.listen(port);
app.use(cors());
app.use(bodyParser.json());
app.use("/", router);

// app.get("/", (req, res) => {
//   fs.readFile("./data/MinTheinKha.LatHtaukBayDin.json", (err, data) => {
//     if (err) {
//       console.log(err);
//     }
//     const rawData = JSON.parse(data);
//     //console.log(data.toString());
//     //   res.send(rawData.questions);
//     res.status(200).json(rawData.questions);
//   });

//   let data = fs.readFileSync("./data/MinTheinKha.LatHtaukBayDin.json");
//   let finaldata = JSON.parse(data);
//   res.send(finaldata);
//console.log(finaldata);
// });
