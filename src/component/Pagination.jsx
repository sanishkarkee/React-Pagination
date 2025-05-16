import axios from 'axios';
import { useEffect, useState } from 'react';

const Pagination = () => {
  const [tabelData, setTableData] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  useEffect(() => {
    axios.get('https://dummyjson.com/users?limit=0').then((res) => {
      // console.log(res);
      setTableData(res?.data);
    });
  }, []);

  // Actual users data from API
  const usersData = tabelData?.users.slice(startIndex, endIndex);
  console.log(usersData);

  return <>Pagination</>;
};

export default Pagination;
