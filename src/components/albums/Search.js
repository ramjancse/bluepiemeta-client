import { FaMagnifyingGlass } from "react-icons/fa6";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { searched } from "@/features/albums/albumSlice";

const schema = yup
  .object({
    keyword: yup.string().trim(),
  })
  .required();

const Search = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    dispatch(searched(data));
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
