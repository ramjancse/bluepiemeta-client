"use client";

import { FaMagnifyingGlass } from "react-icons/fa6";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const schema = yup
  .object({
    keyword: yup.string().trim(),
  })
  .required();

const Search = ({ route }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const router = useRouter();

  const onSubmit = async (data) => {
    const encoded = encodeURI(data.keyword);
    router.push(`${route}?keyword=${encoded}`);
  };

  return (
    <div className="top flex items-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative">
          <span className="absolute left-3 top-4">
            <FaMagnifyingGlass className="z-20 text-primary" />
          </span>

          <input
            className="z-10 w-full my-1 bg-white outline-none pl-8 pr-3 py-2 border-gray-300 text-sm border-2 rounded-full"
            type="text"
            name="keyword"
            id="keyword"
            placeholder="Search album"
            autoComplete="off"
            {...register("keyword")}
          />
        </div>
      </form>
    </div>
  );
};

export default Search;
