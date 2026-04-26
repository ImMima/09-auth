import css from "./Pagination.module.css";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  currentPage: number;
  pageCount: number;
  onPageChange: (select: number) => void;
}

const Pagination = ({
  currentPage,
  pageCount,
  onPageChange,
}: PaginationProps) => {
  return (
    <ReactPaginate
      forcePage={currentPage - 1}
      pageCount={pageCount}
      onPageChange={(event) => onPageChange(event.selected + 1)}
      containerClassName={css.pagination}
      activeClassName={css.active}
      pageClassName={css.pageItem}
      previousClassName={css.pageItem}
      nextClassName={css.pageItem}
      disabledClassName={css.disabled}
      previousLabel="←"
      nextLabel="→"
    />
  );
};

export default Pagination;
