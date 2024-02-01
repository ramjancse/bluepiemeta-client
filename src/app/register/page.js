import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <main class="flex h-screen items-center justify-center bg-gradient-to-r from-cyan-100 to-blue-500">
      <div
        style={{ boxShadow: "5px 5px 12px 2px rgb(68, 68, 68)" }}
        class="w-[80%] bg-white p-10 sm:w-[55%] md:w-[50%] lg:px-20 lg:py-14 xl:px-40 xl:py-20 2xl:w-[40%]"
      >
        <div class="logo flex items-center justify-center">
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

        <div class="input-area mt-10">
          <form>
            <p class="mb-2 text-sm font-medium">
              <label for="fullName" class="block cursor-pointer">
                Create your Blue Pie Account
              </label>
            </p>

            <div class="input">
              <input
                type="text"
                name="fullName"
                id="fullName"
                placeholder="Full Name"
                class="w-full rounded-t-xl border-l-8 border-blue-700 bg-gray-200 px-4 py-2 focus:outline-none"
              />
            </div>

            <div class="input mt-1">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                class="w-full border-l-8 border-blue-700 bg-gray-200 px-4 py-2 focus:outline-none"
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

            <div class="input mb-3 mt-2">
              <p class="text-center text-xs">
                By creating account, I agree to Blue Pie's <br />
                <Link href="/terms" class="font-semibold">
                  Terms
                </Link>{" "}
                &{" "}
                <Link href="/privacy" class="font-semibold">
                  Privacy Policy
                </Link>
              </p>
            </div>

            <div class="submit mt-10 text-center">
              <input
                class="cursor-pointer rounded bg-gray-800 px-10 py-2 font-semibold uppercase tracking-wider text-white"
                type="submit"
                value="Create"
              />
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default page;
