import { useEffect, useState } from 'react';

function projectsPagination(data = [], text = '', itemPerPage = 3) {
  const filteredData =
    text.length > 0
      ? data.filter((item) => item.name.toLowerCase().includes(text.toLowerCase()))
      : data;

  const totalRow = filteredData.length;

  const totalPage = Math.ceil(totalRow / itemPerPage);

  const [paginatedData, setPaginatedData] = useState({});

  useEffect(() => {
    let obj = {};
    if (totalPage > 1) {
      for (let i = 1; i <= totalPage; i++) {
        obj['page' + i] = filteredData.slice((i - 1) * itemPerPage, i * itemPerPage);
      }
    } else {
      obj['page1'] = filteredData.slice(0, totalRow);
    }
    setPaginatedData(obj);
  }, [text]);

  return {
    totalPage,
    paginatedData,
  };
}

export default projectsPagination;
