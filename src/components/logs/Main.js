"use client";

import { getAllLogs } from "@/lib/logs";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Suspense, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

const Main = () => {
  const session = useSession();
  const [logs, setLogs] = useState([]);

  const searchParams = useSearchParams();
  const paramsPage = searchParams.get("page");

  const [page, setPage] = useState(paramsPage ? paramsPage : 1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    if (session?.data?.jwt) {
      loadData(session?.data?.jwt, page);
    }
  }, [session, page]);

  const loadData = async (token, page) => {
    const {
      data,
      pagination: {
        totalItems: { totalItems, limit, page: currentPage },
      },
    } = await getAllLogs({
      token,
      page,
    });

    setLogs(data);
    setTotalPage(Math.ceil(totalItems / limit));
  };

  const handlePage = (pageNumber) => {
    setPage(pageNumber);
  };

  const handlePageClick = (pageNumber) => (event) => {
    event.preventDefault();
    setPage(pageNumber);
  };

  // stay in page 1 // slice will be page 1 to end(7)
  // if stay in page 3 then slice will be page 3 to end(7)
  // if i stay in page last page 84 then slice will be page 1 to end(7)

  let start = 0;
  let end = 7;

  if (Number(paramsPage)) {
    start = Number(paramsPage) - 1;
    end = start + end;

    // if (end > totalPage) {
    //   start = totalPage - 5;
    // }
  }

  // console.log(start, "start");
  // console.log(end, "end");

  // console.log(totalPage, "totalPage");
  // console.log([...Array(totalPage)].slice(start, end), "sliced");

  return (
    <section className="px-4 py-3 border-l border-b">
      <h1 className="mb-3 text-xl">All Logs</h1>

      <div className="overflow-x-auto mt-5">
        <table className="w-full border-collapse">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="border p-2 text-left">SL</th>
              <th className="border p-2 text-left">Email</th>
              <th className="border p-2 text-left">Activity Type</th>
              <th className="border p-2 text-left">IP</th>
              <th className="border p-2 text-left">Details</th>
              <th className="border p-2 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {logs.length ? (
              logs.map((log, index) => {
                const {
                  _id,
                  email,
                  activityType,
                  ipAddress,
                  actionDetails,
                  success,
                } = log;
                return (
                  <tr className="even:bg-gray-100" key={_id}>
                    <td className="border p-2">{index + 1}</td>
                    <td className="border p-2">{email}</td>
                    <td className="border p-2">{activityType}</td>
                    <td className="border p-2">{ipAddress}</td>
                    <td className="border p-2">{actionDetails}</td>
                    <td className="border p-2">{success ? "true" : "false"}</td>
                  </tr>
                );
              })
            ) : (
              <tr className="even:bg-gray-100">
                <td className="border p-2 text-center" colSpan={6}>
                  Logs not found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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
    </section>
  );
};

export default Main;
