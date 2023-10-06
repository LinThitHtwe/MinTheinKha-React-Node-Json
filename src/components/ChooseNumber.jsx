import React, { useState } from "react";
import useQuestions from "../hooks/useQuestions";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ChooseNumber = () => {
  const navigate = useNavigate();
  const { data, isPending, error } = useQuestions(
    "http://localhost:8000/numbers"
  );
  const { questionNo } = useParams();
  const [answer, setAnswer] = useState(null);

  const backtoHome = () => {
    console.log("back");
    navigate("/");
  };

  function convertBurmeseToArabic(burmeseNumber) {
    const burmeseNumerals = ["၁", "၂", "၃", "၄", "၅", "၆", "၇", "၈", "၉", "၁၀"];
    const arabicNumerals = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

    const index = burmeseNumerals.indexOf(burmeseNumber);
    if (index !== -1) {
      return arabicNumerals[index];
    } else {
      return burmeseNumber;
    }
  }

  const handelClick = (number) => {
    if (questionNo && number) {
      const arabicNumber = convertBurmeseToArabic(number);
      fetch("http://localhost:8000/answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          questionNo: questionNo,
          answerNo: arabicNumber,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          return response.json();
        })
        .then((answer) => {
          setAnswer(answer);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <div>
        <div className="answer-container">{answer && <p>{answer}</p>}</div>
        <div className="chooseNumber">
          {error && <p>{error}</p>}
          {isPending && <p>Loading...</p>}

          <div className="grid-container">
            {data && !answer && (
              <div className="grid">
                {data.map((number, index) => (
                  <button
                    className="item"
                    key={index}
                    onClick={() => handelClick(number)}
                  >
                    {number}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <button onClick={() => backtoHome()} className="back-button">
          Back
        </button>
      </div>
    </>
  );
};

export default ChooseNumber;
