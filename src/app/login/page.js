import Image from "next/image";

const page = () => {
  return (
    <div class="flex h-screen items-center justify-center bg-gradient-to-r from-cyan-100 to-blue-500">
      <div
        style={{ boxShadow: "5px 5px 12px 2px rgb(68, 68, 68)" }}
        class="login w-[80%] bg-white p-10 sm:w-[55%] md:w-[50%] lg:px-20 lg:py-14 xl:px-40 xl:py-20 2xl:w-[40%]"
      >
        <div class="flex items-center justify-center">
          <a href="/" class="flex items-center">
            <Image
              class="w-32"
              src="/images/Logo -Login page.png"
              alt="Logo Image"
              width={128}
              height={80}
            />
          </a>
        </div>

        <div class="input-area mt-12">
          <form>
            <p class="mb-2 text-sm font-medium">
              <label for="username" class="block cursor-pointer">
                Log in to your account
              </label>
            </p>

            <div class="input">
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                class="w-full rounded-t-xl border-l-8 border-blue-700 bg-gray-200 px-4 py-2 focus:outline-none"
              />
            </div>

            <div class="input mt-1">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                class="w-full rounded-b-xl border-l-8 border-blue-700 bg-gray-200 px-4 py-2 focus:outline-none"
              />
            </div>

            <div class="input mb-3 mt-2 flex">
              <input
                class="bg-pink-700"
                type="checkbox"
                name="check"
                id="check"
              />
              <label
                for="check"
                class="ml-1 cursor-pointer text-xs font-medium"
              >
                Keep me signed in
              </label>
            </div>

            <div class="submit mt-10 text-center">
              <input
                class="cursor-pointer rounded bg-gray-800 px-10 py-2 font-semibold uppercase tracking-wider text-white"
                type="submit"
                value="Log In"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
