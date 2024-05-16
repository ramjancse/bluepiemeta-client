// "use client";

// import Client from "@/components/test/Client";
// import Post from "@/components/test/Post";
// import { usePathname, useRouter } from "next/navigation";

// { searchParams: { keyword }}
const Playground = async () => {
  const posts = await getPosts();

  return (
    <div>
      Playground
      <br />
      <br />
      {/* <Client /> */}
      <br />
      {/* <Post keyword={keyword} /> */}
    </div>
  );
};

export async function getPosts() {
  // Fetch all albums from your API
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=3"
  );

  return res.json();
}

export default Playground;
