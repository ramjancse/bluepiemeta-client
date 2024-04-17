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
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

const PaginationComp = ({
  route = "/albums",
  page = "1",
  totalPage = "2",
  paramsPage,
}) => {
  // const session = useSession();
  // const searchParams = useSearchParams();
  // const paramsPage = searchParams.get("page");
  // const [page, setPage] = useState(paramsPage ? paramsPage : 1);
  // const [totalPage, setTotalPage] = useState(1);

  let start = 0;
  let end = 7;

  if (Number(paramsPage)) {
    start = Number(paramsPage) - 1;
    end = start + end;

    // if (end > totalPage) {
    //   start = totalPage - 5;
    // }
  }

  // const p = {
  //   currentPage: page,
  //   previousPage: page - 1,
  //   nextPage: page + 1,
  //   hasPreviousPage: page > 1,
  //   hasNextPage: page * limit < totalAlbumsCount,
  //   lastPage: Math.ceil(totalAlbumsCount / limit),
  // };

  const count = 15; // totalPage
  const defaultPage = 1;
  const siblingCount = 2;
  const boundaryCount = 2;

  return (
    <Pagination className="mt-5">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`${route}?page=${page - 1}`}
            className={
              page <= 1
                ? "pointer-events-none opacity-50 select-none"
                : undefined
            }
          />
        </PaginationItem>

        {[...Array(totalPage)].slice(start, end).map((_, index, array) => {
          if (count <= 5) {
            // tahole sob koyta number print hobe
            return (
              <PaginationItem key={index}>
                <PaginationLink
                  // isActive={isCurrentPage}
                  href={`?page=${index + 1}`}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            );
          } else if (count > 5 && siblingCount === 0 && boundaryCount === 0) {
            // < 1, 2, 3, 4, 5 >
            // < [1], 2, 3, 4, 5 >
            // < 1, [2], 3, 4, 5 >
            // < 1, 2, [3], 4, 5 >
            // < 1, 2, 3, [4], 5 >
            // < 1, 2, 3, 4, [5] >
            //  ---------------------------------------
            // < 1, 2, 3, 4, 5, 6 >
            // < [1], 2, 3, 4, .., 6 >
            // < 1, [2], 3, 4, .., 6 >
            // < 1, 2, [3], 4, .., 6 >
            // < 1, 2, 3, [4], .., 6 >
            // < 1, .., 3, 4, [5], 6 >
            // < 1, .., 3, 4, 5, [6] >
            //  ---------------------------------------
            // < 1, 2, 3, 4, 5, 6, 7 >
            // < [1], 2, 3, 4, .., 7 >
            // < 1, [2], 3, 4, .., 7 >
            // < 1, 2, [3], 4, .., 7 >
            // < 1, 2, 3, [4], .., 7 >
            // < 1, .., 4, [5], 6, 7 >
            // < 1, .., 4, 5, [6], 7 >
            // < 1, .., 4, 5, 6, [7] >
            //  ---------------------------------------
            // < 1, 2, 3, 4, 5, 6, 7, 8 >
            // < [1], 2, 3, 4, 5, .., 7, 8 >
            // < 1, [2], 3, 4, 5, .., 7, 8 >
            // < 1, 2, [3], 4, 5, .., 7, 8 >
            // < 1, 2, 3, [4], 5, .., 7, 8 >
            // < 1, 2, 3, 4, [5], .., 7, 8 >
            // < 1, 2, .., 4, 5, [6], 7, 8 >
            // < 1, 2, .., 4, 5, 6, [7], 8 >
            // < 1, 2, .., 4, 5, 6, 7, [8] >
            //  ---------------------------------------
            // < 1, 2, 3, 4, 5, 6, 7, 8, 9 >
            // < [1], 2, 3, 4, 5, .., 8, 9 >
            // < 1, [2], 3, 4, 5, .., 8, 9 >
            // < 1, 2, [3], 4, 5, .., 8, 9 >
            // < 1, 2, 3, [4], 5, .., 8, 9 >
            // < 1, 2, 3, 4, [5], .., 8, 9 >
            // < 1, 2, .., 5, [6], 7, 8, 9 >
            // < 1, 2, .., 5, 6, [7], 8, 9 >
            // < 1, 2, .., 5, 6, 7, [8], 9 >
            // < 1, 2, .., 5, 6, 7, 8, [9] >
            //  ---------------------------------------
            // < 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 >
            // < [1], 2, 3, 4, 5, .., 9, 10 >
            // < 1, [2], 3, 4, 5, .., 9, 10 >
            // < 1, 2, [3], 4, 5, .., 9, 10 >
            // < 1, 2, 3, [4], 5, .., 9, 10 >
            // < 1, 2, 3, 4, [5], .., 9, 10 >
            // < 1, 2, .., [6], 7, 8, 9, 10 >
            // < 1, 2, .., 6, [7], 8, 9, 10 >
            // < 1, 2, .., 6, 7, [8], 9, 10 >
            // < 1, 2, .., 6, 7, 8, [9], 10 >
            // < 1, 2, .., 6, 7, 8, 9, [10] >
            //  ---------------------------------------
            // < 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 >
            // < [1], 2, 3, 4, 5, 6, .., 10, 11 >
            // < 1, [2], 3, 4, 5, 6, .., 10, 11 >
            // < 1, 2, [3], 4, 5, 6, .., 10, 11 >
            // < 1, 2, 3, [4], 5, 6, .., 10, 11 >
            // < 1, .., 4, [5], 6, 7, .., 10, 11 >
            // < 1, .., 5, [6], 7, 8, .., 10, 11 >
            // < 1, 2, .., 6, [7], 8, 9, 10, 11 >
            // < 1, 2, .., 6, 7, [8], 9, 10, 11 >
            // < 1, 2, .., 6, 7, 8, [9], 10, 11 >
            // < 1, 2, .., 6, 7, 8, 9, [10], 11 >
            // < 1, 2, .., 6, 7, 8, 9, 10, [11] >
            //  ---------------------------------------
            // < 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 >
            // < [1], 2, 3, 4, 5, .., 11, 12 >
            // < 1, [2], 3, 4, 5, .., 11, 12 >
            // < 1, 2, [3], 4, 5, .., 11, 12 >
            // < 1, 2, .., [4], 5, 6, 7, 8, .., 11, 12 >
            // < 1, 2, 3, 4, 5, 6, 7. 8, 9, 10, 11, 12 >
            //  ---------------------------------------
          }

          if (count > 7 && siblingCount === 0) {
            // jodi page number 4 er kom ba soman hoy
            // tahole show hobe sob 1, 2, 3, 4
            // then Dot ekta
            // then last 7, 8

            // jodi page numbe 4 er beshi hoy tahole
            // first e 1, 2
            // then Dot ekta
            // then 5, 6, 7, 8

            return (
              <PaginationItem key={index}>
                <PaginationLink
                  // isActive={isCurrentPage}
                  href={`?page=${index + 1}`}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            );
          }

          if (count > 8 && siblingCount === 0) {
            // first e item show hobe 4ta
            //
          } else {
          }

          // previous logic
          const pageNumber = Number(page) + index;
          const isFirstThree = index < 3;
          const isCurrentPage = Number(page) === pageNumber;
          const isMiddle = index === 3;
        })}

        <PaginationItem>
          <PaginationNext href={`${route}?page=${Number(page) + 1}`} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComp;
