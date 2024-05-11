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
import generatePagination from "@/utils/generatePagination";

const PaginationPage = ({
  route = "/albums",
  currentPage,
  totalPage,
  visiblePages = 7,
}) => {
  const pages = generatePagination(currentPage, totalPage, visiblePages);

  return (
    <Pagination className="mt-5">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`${route}?page=${currentPage - 1}`}
            className={
              currentPage <= 1
                ? "pointer-events-none opacity-50 select-none"
                : undefined
            }
          />
        </PaginationItem>

        {pages.map((page, index, array) => {
          // console.log(page, "page");
          // console.log(currentPage, "currentPage");
          // console.log(page === currentPage);

          if (page !== Number(page)) {
            return (
              <PaginationItem key={index}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={index}>
              <PaginationLink
                href={`?page=${page}`}
                isActive={Number(currentPage) === Number(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            href={`${route}?page=${Number(currentPage) + 1}`}
            className={
              currentPage >= totalPage
                ? "pointer-events-none opacity-50 select-none"
                : undefined
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationPage;
