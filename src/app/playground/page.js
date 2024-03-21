import Link from "next/link";
import React from "react";

const PlayGround = () => {
  return (
    <div>
      <h1>Playground</h1>

      <Link href="/playground/player">Player</Link>
    </div>
  );
};

export default PlayGround;
