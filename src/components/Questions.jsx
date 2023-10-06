import useQuestions from "../hooks/useQuestions";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Questions = () => {
  const navigate = useNavigate();

  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = Number(startIndex) + Number(itemsPerPage);
  console.log(endIndex);
  let paginatedData;

  const { data, isPending, error } = useQuestions(
    "http://localhost:8000/questions"
  );
  const handleClick = (quesionNo) => {
    navigate("/" + quesionNo);
  };

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };
  if (data) {
    paginatedData = data.slice(startIndex, endIndex);
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
        <div className="paginationContainer">
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={Math.ceil((data?.length || 0) / itemsPerPage)}
            marginPagesDisplayed={1}
            pageRangeDisplayed={2}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            pageClassName={"pagination"}
            pageLinkClassName={"pagination"}
            previousClassName={"pagination"}
            previousLinkClassName={"pagination"}
            nextClassName={"pagination"}
            nextLinkClassName={"pagination"}
            activeClassName={"active"}
            breakClassName={"pagination"}
            breakLinkClassName={"pagination"}
          />
        </div>
      </div>
    </>
  );
};

export default Questions;
