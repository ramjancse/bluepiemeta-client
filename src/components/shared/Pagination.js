"use client";

import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const PaginationComp = () => {
  const [page, setPage] = useState(paramsPage ? paramsPage : 1);
  const [totalPage, setTotalPage] = useState(1);

  let start = 0;
  let end = 7;

  if (Number(paramsPage)) {
    start = Number(paramsPage) - 1;
    end = start + end;

    // if (end > totalPage) {
    //   start = totalPage - 5;
    // }
  }

  return (
    <Pagination className="mt-5">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`/logs?page=${page - 1}`}
            className={
              page <= 1
                ? "pointer-events-none opacity-50 select-none"
                : undefined
            }
          />
        </PaginationItem>

        {[...Array(totalPage)].slice(start, end).map((_, index, array) => {
          const pageNumber = Number(page) + index;

          const isFirstThree = index < 3;
          const isCurrentPage = Number(page) === pageNumber;
          const isMiddle = index === 3;

          if (array.length < 4) {
            return (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  isActive={isCurrentPage}
                  href={`?page=${pageNumber}`}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            );
          } else if (isFirstThree) {
            return (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  isActive={isCurrentPage}
                  href={`?page=${pageNumber}`}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            );
          } else if (isMiddle && array.length > 4) {
            return (
              <PaginationItem key="dots-middle">
                <PaginationEllipsis />
              </PaginationItem>
            );
          } else if (array.length === 4) {
            return (
              <PaginationItem key={totalPage}>
                <PaginationLink
                  // isActive={totalPage}
                  href={`?page=${totalPage}`}
                >
                  {totalPage}
                </PaginationLink>
              </PaginationItem>
            );
          } else if (array.length === 5) {
            return (
              <PaginationItem key={totalPage - 5 + index + 1}>
                <PaginationLink
                  // isActive={totalPage}
                  href={`?page=${totalPage - 5 + index + 1}`}
                >
                  {totalPage - 5 + index + 1}
                </PaginationLink>
              </PaginationItem>
            );
          } else if (array.length === 6) {
            return (
              <PaginationItem key={totalPage - 6 + index + 1}>
                <PaginationLink
                  // isActive={totalPage - 6 + index}
                  href={`?page=${totalPage - 6 + index + 1}`}
                >
                  {totalPage - 6 + index + 1}
                </PaginationLink>
              </PaginationItem>
            );
          } else {
            return (
              <PaginationItem key={totalPage - 3 + (index - 3)}>
                <PaginationLink
                  // isActive={isCurrentPage}
                  href={`?page=${totalPage - 3 + (index - 3)}`}
                >
                  {totalPage - 3 + (index - 3)}
                </PaginationLink>
              </PaginationItem>
            );
          }
        })}

        <PaginationItem>
          <PaginationNext href={`/logs?page=${Number(page) + 1}`} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComp;
