import React from "react";

const page = () => {
  const links = [
    { id: 1, label: "Website", name: "website" },
    { id: 2, label: "iTunes", name: "iTunes" },
    { id: 3, label: "Facebook", name: "facebook" },
    { id: 4, label: "Vimeo", name: "vimeo" },
    { id: 5, label: "Youtube", name: "youtube" },
  ];
  return (
    <div>
      <h2>Welcome to Playground</h2>
      <br />

      <div className="flex flex-wrap">
        {/* <div className="one border border-blue-400 w-1/4">One</div>
        <div className="two border border-blue-400 w-1/4">Two</div>
        <div className="three border border-blue-400 w-1/4">Three</div>
        <div className="four border border-blue-400 w-1/4">Four</div>
        <div className="five border border-blue-500 w-1/4">Five</div> */}

        {links.map((link) => (
          <div className="input w-1/2" key={link.id}>
            <div className="flex">
              <label
                className="border-2 px-10 py-1 cursor-pointer"
                htmlFor={link.name}
              >
                {link.label}
              </label>

              <input
                type="text"
                name={link.name}
                id={link.name}
                className="bg-gray-200 pl-10 pr-2 focus:outline-none w-full"
                placeholder="https://example.com"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
