import axios from 'axios';
import { useEffect, useState } from 'react';
import '../component/Pagination.css';

const Pagination = () => {
  const [tabelData, setTableData] = useState();

  const [currentPage, setCurrentPage] = useState(1);

  const [itemsPerPage, setItemsPerPage] = useState(10);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const totalPages = Math.ceil(tabelData?.total / itemsPerPage);

  // Actual users data from API -- this runs before API Data is received so, [empty array] is used
  const currentUsersData = tabelData?.users.slice(startIndex, endIndex) || [];

  useEffect(() => {
    axios.get('https://dummyjson.com/users?limit=0').then((res) => {
      console.log(res);
      setTableData(res?.data);
    });
  }, []);

  // ------------PREV / NEXT button functionality--------------------
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  //----IMP: set currentPage value
  const handlePageClick = (pageNo) => {
    setCurrentPage(pageNo);
  };

  return (
    <>
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
          </tr>
        </thead>

        <tbody>
          {currentUsersData.map((value, index) => {
            return (
              <tr key={index}>
                <td>{value.firstName}</td>
                <td>{value.email}</td>
                <td>{value.gender}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* ------------------BUTTONS---------------- */}
      <div className='pagination'>
        <button onClick={() => handlePrevious()} disabled={currentPage === 1}>
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => {
          return (
            //----IMP: set currentPage value
            <button
              onClick={() => handlePageClick(index + 1)}
              className={currentPage === index + 1 ? 'active' : ''}
            >
              {index + 1}
            </button>
          );
        })}

        <button
          onClick={() => handleNext()}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Pagination;
