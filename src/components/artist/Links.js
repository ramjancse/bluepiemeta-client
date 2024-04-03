"use client";

import { useState } from "react";
import Modal from "./Modal";

const Links = ({ artistLinks, socialMedia, artistId, artistInfo }) => {
  const [show, setShow] = useState(false);
  const [link, setLink] = useState({});

  const handleClick = (data) => {
    // toggle modal
    setShow((prev) => !prev);

    // set data
    setLink(data);
  };

  return (
    <>
      {show && (
        <Modal
          artistInfo={artistInfo}
          link={link}
          sectionName={link.artistLinks ? "Artist Links" : "Social Media Links"}
          setShow={setShow}
        />
      )}

      <div className="link mt-10">
        <h2 className="text-xl">Artist Links</h2>
        <hr />

        <div className="overflow-x-auto">
          <table className="w-full mt-2 border-collapse">
            <thead className="bg-gray-700 text-white">
              <tr>
                <th className="border p-2 text-left">Platform name</th>
                <th className="border p-2 text-left">Link</th>
                <th className="border p-2 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {artistLinks.length ? (
                artistLinks.map((artistLink) => {
                  const { _id, name, link } = artistLink;
                  return (
                    <tr className="even:bg-gray-100" key={_id}>
                      <td className="border p-2">{name}</td>
                      <td className="border p-2">
                        <a
                          className="text-sm text-blue-700"
                          href={`${link}`}
                          target="_blank"
                        >
                          {link ? link : "-"}
                        </a>
                      </td>
                      <td className="border p-2 text-center">
                        <button
                          type="button"
                          className="px-3 py-[5px] rounded text-white ml-2 bg-yellow-300"
                          onClick={() =>
                            handleClick({
                              artistId,
                              linkData: artistLink,
                              artistLinks: true,
                            })
                          }
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr className="even:bg-gray-100">
                  <td className="border p-2 text-center" colSpan="3">
                    Artist links are not available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="link mt-10">
        <h2 className="text-xl">Social Media Links</h2>
        <hr />

        <div className="overflow-x-auto">
          <table className="w-full mt-2 border-collapse">
            <thead className="bg-gray-700 text-white">
              <tr>
                <th className="border p-2 text-left">Platform name</th>
                <th className="border p-2 text-left">Link</th>
                <th className="border p-2 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {socialMedia.length ? (
                socialMedia.map((artistLink) => {
                  const { _id, name, link } = artistLink;
                  return (
                    <tr className="even:bg-gray-100" key={_id}>
                      <td className="border p-2">{name}</td>
                      <td className="border p-2">
                        <a
                          className="text-sm text-blue-700"
                          href={`${link}`}
                          target="_blank"
                        >
                          {link ? link : "-"}
                        </a>
                      </td>
                      <td className="border p-2 text-center">
                        <button
                          type="button"
                          className="px-3 py-[5px] rounded text-white ml-2 bg-yellow-300"
                          onClick={() =>
                            handleClick({
                              artistId,
                              linkData: artistLink,
                              artistLinks: false,
                            })
                          }
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr className="even:bg-gray-100">
                  <td className="border p-2 text-center" colSpan="3">
                    Social media links are not available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Links;
