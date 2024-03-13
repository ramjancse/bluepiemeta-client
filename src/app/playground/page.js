"use client";

import { useState } from "react";
import "./play.css";

const PlayGround = () => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <div className="submit mt-10 mb-5">
        <input
          type="submit"
          value="Toggle"
          className="px-10 py-2 rounded bg-green-600 uppercase cursor-pointer text-white"
          onClick={() => setShow(!show)} // Toggle show state on button click
        />
      </div>

      <div className={`box bg-cyan-200 ${show ? "show" : "hide"}`}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore veniam
          optio inventore, quasi ipsam eveniet in perferendis expedita magni
          totam aperiam voluptas beatae quas cum ut ab numquam, aut repellendus?
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et, eveniet?
          Est maxime ex quis tempora exercitationem! Dolore, consequuntur!
          Excepturi, pariatur.
        </p>
      </div>
    </div>
  );
};

export default PlayGround;
