const fs = require("fs");

const show_all_questions = (req, res) => {
  fs.readFile("./data/MinTheinKha.LatHtaukBayDin.json", (err, data) => {
    if (err) {
      console.log(err);
    }
    const rawData = JSON.parse(data);
    res.status(200).json(rawData.questions);
  });
};

const show_all_numbers = (req, res) => {
  fs.readFile("./data/MinTheinKha.LatHtaukBayDin.json", (err, data) => {
    if (err) {
      console.log(err);
    }
    const rawData = JSON.parse(data);
    res.status(200).json(rawData.numberList);
  });
};

const show_answer = (req, res) => {
  const { questionNo, answerNo } = req.body;
  fs.readFile("./data/MinTheinKha.LatHtaukBayDin.json", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    const rawData = JSON.parse(data);
    const answers = rawData.answers;

    const foundAnswer = answers.find((answer) => {
      return answer.questionNo == questionNo && answer.answerNo == answerNo;
    });
    if (foundAnswer) {
      res.status(200).json(foundAnswer.answerResult);
    } else {
      res.status(404).json({ err: "No Answer Found" });
    }
  });
};
module.exports = {
  show_all_questions,
  show_all_numbers,
  show_answer,
};
