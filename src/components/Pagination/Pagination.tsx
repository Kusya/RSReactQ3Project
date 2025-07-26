import { useState } from 'react';

interface PaginationProps {
  page: number;
  sendPageUp: (data: number) => void;
  totalPages: number;
}

export default function Pagination(props: PaginationProps) {
  const [page, setPage] = useState(props.page);
  const totalPages = props.totalPages;
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleInputPage = (pageNumber: number) => {
    setPage(pageNumber);
    props.sendPageUp(pageNumber);
  };

  return (
    <div>
      {pageNumbers.map((i) => (
        <button
          key={i}
          className={`page-item ${page === i ? 'active' : ''}`}
          onClick={() => handleInputPage(i)}
        >
          {i}
        </button>
      ))}
    </div>
  );
}
