import { useEffect, useState } from 'react';
import './Pagination.css';

interface PaginationProps {
  page: number;
  sendPageUp: (data: number) => void;
  totalPages: number;
}

export default function Pagination({
  page: initialPage,
  sendPageUp,
  totalPages,
}: PaginationProps) {
  const [page, setPage] = useState(initialPage);
  const pageNumbers = Array<number>();
  const siblings = 1;
  const boundaries = 2;

  useEffect(() => {
    setPage(initialPage);
  }, [initialPage]);

  const createArrayOfPagesBySelectedPattern = () => {
    for (let i = 1; i <= Math.min(boundaries, totalPages); i++) {
      pageNumbers.push(i);
    }

    const shouldShowLeftEllipsis = page - siblings > boundaries + 1;
    if (shouldShowLeftEllipsis) {
      pageNumbers.push(-1);
    }

    const start = Math.max(boundaries + 1, page - siblings);
    const end = Math.min(totalPages - boundaries, page + siblings);

    for (let i = start; i <= end; i++) {
      if (i > boundaries && i <= totalPages - boundaries) {
        pageNumbers.push(i);
      }
    }

    const shouldShowRightEllipsis = page + siblings < totalPages - boundaries;
    if (shouldShowRightEllipsis) {
      pageNumbers.push(-1);
    }

    for (
      let i = Math.max(totalPages - boundaries + 1, boundaries + 1);
      i <= totalPages;
      i++
    ) {
      pageNumbers.push(i);
    }
  };

  const handleInputPage = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages || pageNumber === page)
      return;
    setPage(pageNumber);
    sendPageUp(pageNumber);
  };

  createArrayOfPagesBySelectedPattern();

  return (
    <div>
      {pageNumbers.map((i) => {
        if (i == -1) {
          return (
            <span key="right-ellipsis" className="ellipsis">
              ...
            </span>
          );
        } else {
          return (
            <button
              key={i}
              className={`page-item ${page === i ? 'active' : ''}`}
              onClick={() => handleInputPage(i)}
              aria-label={`Go to page ${i}`}
              aria-current={page === i ? 'page' : undefined}
            >
              {i}
            </button>
          );
        }
      })}
    </div>
  );
}
