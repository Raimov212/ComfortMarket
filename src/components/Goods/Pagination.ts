import { useState } from "react";
import { PaginationType } from "./goods";

function usePagination({ data, itemsPerPage }: PaginationType) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const maxPage = Math.ceil(data.length / itemsPerPage);

  function currentData() {
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return data.slice(begin, end);
  }

  function next(_: React.MouseEvent) {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
  }

  function lastPage(_: React.MouseEvent) {
    setCurrentPage(maxPage);
  }

  function prev(_: React.MouseEvent) {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  }

  function firstPage(_: React.MouseEvent) {
    setCurrentPage(1);
  }

  function jump(page: number) {
    const pageNumber = Math.max(1, page);
    setCurrentPage(() => Math.min(pageNumber, maxPage));
  }

  return {
    next,
    prev,
    jump,
    currentData,
    currentPage,
    setCurrentPage,
    maxPage,
    lastPage,
    firstPage,
  };
}

export default usePagination;
