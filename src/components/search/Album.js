import Image from "next/image";
import Link from "next/link";
import React from "react";

const Album = ({ album }) => {
  const { releaseTitle, releasePrimaryArtist, releaseCover } = album;
  
  return (
    <div className="w-1/3">
      <div className="album mx-5 my-5 ">
        <div className="image border-green-500 border-b-4">
          <Link href="/">
            <Image
              src={releaseCover ?? process.env.NEXT_PUBLIC_SEARCHED_ALBUM_IMAGE}
              width={200}
              height={250}
              alt="Album Image"
              className="w-full h-[250px] object-cover"
            />
          </Link>
        </div>

        <div className="content mt-2">
          <h4 className="font-medium">{releaseTitle}</h4>
          <h6 className="text-sm text-gray-500">
            {releasePrimaryArtist[0]?.name}
          </h6>
          <h6 className="text-sm">
            <Link className="text-blue-300 font-medium" href="/">
              ABC-001
            </Link>
          </h6>
        </div>
      </div>
    </div>
  );
};

export default Album;
