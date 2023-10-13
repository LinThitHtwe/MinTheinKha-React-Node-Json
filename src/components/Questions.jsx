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
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isPending, error } = useQuestions(
    "http://localhost:8000/questions"
  );

  let paginatedData;
  const handleClick = (quesionNo) => {
    navigate("/" + quesionNo);
  };

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const handlePageNumberChange = (value) => {
    setItemsPerPage(value);
    setCurrentPage(0);
  };

  const filteredData = data?.filter((d) =>
    d.questionName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  if (data) {
    paginatedData = data.slice(startIndex, endIndex);
  }

  const noResults = filteredData && filteredData.length === 0;

  paginatedData = filteredData?.slice(startIndex, endIndex);

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
        <div className="search">
          <label>Search Questions:</label>
          <input
            className="search-box"
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
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
            {noResults ? (
              <tr>
                <td colSpan="2">No Data Found</td>
              </tr>
            ) : (
              paginatedData &&
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
              ))
            )}
          </tbody>
        </table>

        <div className="paginationContainer">
          {filteredData && filteredData.length > itemsPerPage && (
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageCount={Math.ceil(
                (filteredData ? filteredData.length : data ? data.length : 0) /
                  itemsPerPage
              )}
              marginPagesDisplayed={1}
              pageRangeDisplayed={2}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              pageClassName={"pagination"}
              pageLinkClassName={"pagination"}
              previousClassName={"pagination next"}
              previousLinkClassName={"pagination"}
              nextClassName={"pagination next"}
              nextLinkClassName={"pagination"}
              activeClassName={"active"}
              breakClassName={"pagination"}
              breakLinkClassName={"pagination"}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Questions;
