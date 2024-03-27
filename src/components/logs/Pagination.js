"use client";

import { useState } from "react";

const Pagination = ({ pagination }) => {
  const {
    totalItems: { totalItems, limit, page: currentPage },
  } = pagination;
  const [page, setPage] = useState(1);
  //   const [totalPage, setTotalPage] = useState(1);

  const totalPage = Math.ceil(totalItems / limit);

  const handlePage = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <div className="pagination mt-5 text-center">
      {[...Array(totalPage > 5 ? 5 : totalPage)].map((p, index) => (
        <button
          key={index}
          type="button"
          className={`px-5 rounded-full text-white mx-1 ${
            page === index + 1 ? "bg-blue-600" : "bg-blue-400"
          }`}
          onClick={() => handlePage(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
