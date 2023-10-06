import useQuestions from "../hooks/useQuestions";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const QuestionNormalPagination = () => {
  const navigate = useNavigate();
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const pageLinks = [];
  let paginatedData;

  const { data, isPending, error } = useQuestions(
    "http://localhost:8000/questions"
  );

  let pageCount;

  const handleClick = (questionNo) => {
    navigate("/" + questionNo);
  };

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

  if (data) {
    pageCount = Math.ceil(data.length / itemsPerPage);
    paginatedData = data.slice(
      currentPage * itemsPerPage,
      (currentPage + 1) * itemsPerPage
    );
  }

  if (pageCount) {
    pageLinks.push(
      <>
        <a
          key="previous"
          className={`pagination${currentPage <= 1 ? " disabled" : ""}`}
          onClick={() => {
            if (currentPage > 1) {
              handlePageClick(currentPage - 1);
            }
          }}
        >
          Previous
        </a>
      </>
    );
    if (pageCount < 9) {
      for (let i = 1; i <= pageCount; i++) {
        pageLinks.push(
          <a
            className={`pagination ${i === currentPage + 1 ? "active" : ""}`}
            key={i}
            onClick={() => {
              handlePageClick(i - 1);
            }}
          >
            {i}
          </a>
        );
      }
    } else {
      if (currentPage >= 2 && currentPage <= pageCount - 2) {
        pageLinks.push(
          <>
            <a
              key="1"
              className="pagination"
              onClick={() => {
                handlePageClick(0);
              }}
            >
              1
            </a>
          </>
        );
        if (Number(currentPage) - 1 != 2 || Number(currentPage) - 1 != 1) {
          pageLinks.push(
            <a className="pagination" key="unique">
              ...
            </a>
          );
        }

        pageLinks.push(
          <>
            <a
              key={Number(currentPage)}
              className="pagination"
              onClick={() => {
                handlePageClick(Number(currentPage) - 1);
              }}
            >
              {Number(currentPage)}
            </a>

            <a
              key={Number(currentPage) + 1}
              className="pagination active"
              onClick={() => {
                handlePageClick(Number(currentPage) + 1);
              }}
            >
              {Number(currentPage) + 1}
            </a>
            <a
              key={Number(currentPage) + 2}
              className="pagination"
              onClick={() => {
                handlePageClick(Number(currentPage + 1));
              }}
            >
              {Number(currentPage) + 2}
            </a>
            <a className="pagination">...</a>
            <a
              key={pageCount}
              className="pagination"
              onClick={() => {
                handlePageClick(pageCount - 1);
              }}
            >
              {pageCount}
            </a>
          </>
        );
      } else {
        for (let i = 1; i <= Math.min(pageCount, 3); i++) {
          pageLinks.push(
            <a
              className={`pagination ${i === currentPage + 1 ? "active" : ""}`}
              key={i}
              onClick={() => {
                handlePageClick(i - 1);
              }}
            >
              {i}
            </a>
          );
        }
        pageLinks.push(
          <a className="pagination" key="ellipsis">
            ...
          </a>
        );

        for (let i = Math.max(1, pageCount - 2); i <= pageCount; i++) {
          pageLinks.push(
            <a
              className={`pagination ${i === currentPage + 1 ? "active" : ""}`}
              key={i}
              onClick={() => {
                handlePageClick(i - 1);
              }}
            >
              {i}
            </a>
          );
        }
      }
    }
    pageLinks.push(
      <>
        <a
          key="next"
          className="pagination"
          onClick={() => {
            if (currentPage + 1 < pageCount) {
              handlePageClick(currentPage + 1);
            }
          }}
        >
          Next
        </a>
      </>
    );
  }
  const handlePageNumberChange = (value) => {
    setItemsPerPage(value);
    setCurrentPage(0);
  };
  return (
    <>
      <div className="questionsContents">
        <label> Page Count :</label>
        <select
          className="pageNumbers"
          onChange={(e) => handlePageNumberChange(e.target.value)}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>

        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Questions</th>
            </tr>
          </thead>
          <tbody>
            {error && <th>{error}</th>}
            {isPending && <th>Loading...</th>}

            {paginatedData &&
              paginatedData.map((d) => (
                <tr
                  key={d.questionNo}
                  onClick={() => handleClick(d.questionNo)}
                >
                  <th>{d.questionNo}</th>
                  <th>
                    <span>{d.questionName}</span>
                  </th>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="pagination">{pageLinks}</div>
      </div>
    </>
  );
};

export default QuestionNormalPagination;
