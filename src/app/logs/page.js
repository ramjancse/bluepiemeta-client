"use client";

import Header from "@/components/dashboard/Header";
import Layout from "@/components/dashboard/Layout";
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

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

const Logs = () => {
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

  // const start = paramsPage ? paramsPage : 0;
  // const end = totalPage > 8 ? 8 : totalPage;
  // const hasPrev = false;

  // const isFirstThree = page <= 3;
  // const isLastThree = pageNumber > totalPage - 3;
  // const isCurrentPage = page === pageNumber;
  // const isMiddle = pageNumber === 4;

  // console.log(pageNumber, "pageNumber");
  // console.log(isFirstThree, "isFirstThree");
  // console.log(isLastThree, "isLastThree");
  // console.log(isMiddle, "isMiddle");

  // stay in page 1 // slice will be page 1 to end(7)
  // if stay in page 3 then slice will be page 3 to end(7)
  // if i stay in page last page 84 then slice will be page 1 to end(7)

  let start = 0;
  let end = 7;

  if (page == 1) {
    start = 0;
  } else if (Number(paramsPage)) {
    start = Number(paramsPage);
  }

  console.log(start, "start");

  return (
    <Layout>
      <Header name="Activity Logs" />

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
                      <td className="border p-2">
                        {success ? "true" : "false"}
                      </td>
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

        {/* <div className="pagination mt-5 text-center">
          {[...Array(totalPage)].slice(start, end).map((p, index) => (
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
        </div> */}

        {/* <Pagination className="mt-5">
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

            {[...Array(totalPage)].slice(start).map((p, index) => {
              const pageNumber = index + 1;

              const isFirstThree = pageNumber <= 3;
              const isLastThree = pageNumber > totalPage - 3;
              const isCurrentPage = page === pageNumber;
              const isMiddle = pageNumber === 4;

              // 0 1 2   3   4   5   6
              // pageNumber = 5
              // need print 82, 83, 84
              // console.log(pageNumber, "pageNumber");
              // console.log(isLastThree, "isLastThree");

              if (isFirstThree || isLastThree) {
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
              }

              if (pageNumber === 4 && page > 4) {
                return (
                  <PaginationItem key="dots-before">
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              } else if (pageNumber === totalPage - 3 && page < totalPage - 3) {
                return (
                  <PaginationItem key="dots-after">
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }

              return null;
            })}

            <PaginationItem>
              <PaginationNext href={`/logs?page=${Number(page) + 1}`} />
            </PaginationItem>
          </PaginationContent>
        </Pagination> */}

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

            {[...Array(totalPage)].slice(start, end).map((p, index) => {
              const pageNumber = index + 1;

              const isFirstThree = pageNumber <= 3;
              const isLastThree = pageNumber > totalPage - 3;
              const isCurrentPage = page === pageNumber;
              const isMiddle = pageNumber === 4;

              if (isFirstThree) {
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
              } else if (isMiddle) {
                return (
                  <PaginationItem key="dots-middle">
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              } else {
                <PaginationItem key={pageNumber}>
                  <PaginationLink href={`?page=${pageNumber}`}>
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>;
              }
            })}

            <PaginationItem>
              <PaginationNext href={`/logs?page=${Number(page) + 1}`} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </section>
    </Layout>
  );
};

export default Logs;
