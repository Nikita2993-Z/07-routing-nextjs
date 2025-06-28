import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";


interface PaginationProps {
  totalPages: number;
  setPage: (page: number) => void;
  currentPage: number;
  pageRangeDisplayed?: number;
  marginPagesDisplayed?: number;
  containerClassName?: string;
  activeClassName?: string;
  nextLabel?: string;
  previousLabel?: string;
}

export default function Pagination({
  totalPages,
  setPage,
  currentPage,
  pageRangeDisplayed = 5,
  marginPagesDisplayed = 1,
  containerClassName,
  activeClassName,
  nextLabel,
  previousLabel,
}: PaginationProps) {
  const safeTotalPages = Math.max(1, totalPages);
  const safeCurrentPage = Math.min(Math.max(1, currentPage), safeTotalPages);

  return (
    <ReactPaginate
      pageCount={safeTotalPages}
      pageRangeDisplayed={pageRangeDisplayed}
      marginPagesDisplayed={marginPagesDisplayed}
      onPageChange={({ selected }) => setPage(selected + 1)}
      forcePage={safeCurrentPage - 1}
      containerClassName={containerClassName || css.pagination}
      activeClassName={activeClassName || css.active}
      nextLabel={nextLabel || "→"}
      previousLabel={previousLabel || "←"}
    />
  );
}