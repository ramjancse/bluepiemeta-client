import { FaMagnifyingGlass } from "react-icons/fa6";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useGetArtistsQuery } from "@/features/artists/artistAPI";

const schema = yup
  .object({
    search: yup.string().trim(),
    artist: yup.string().trim(),
    label: yup.string().trim(),
    sortBy: yup.string().trim(),
  })
  .required();

const Sidebar = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      search: "",
      artist: "all",
      label: "all",
      sortBy: "aToZ",
    },
  });

  const {
    data: { data: artists = [] } = {},
    isLoading: artistsIsLoading,
    isSuccess: artistsIsSUccess,
    isError: artistsIsError,
    error: artistsError,
  } = useGetArtistsQuery();

  const onSubmit = async (data) => {
    // console.log(data, "search data");

    const url = `/albums?search=${data.search}&artists=${data.artist}&label=${data.label}&sort=${data.sort}`;

    try {
      const encoded = encodeURI(data.keyword);
      const {
        data: { data: albumData },
      } = await axiosPrivateInstance(session?.data?.jwt).get(url);

      setAlbums(albumData);
    } catch (error) {
      console.log(error, "error in add album page");

      // show error message
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-1/5 bg-gray-200 min-h-screen">
      <div className="px-5 py-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input">
            <label className="cursor-pointer font-medium" htmlFor="search">
              Search
            </label>

            <div className="relative">
              <span className="absolute right-3 top-4">
                <FaMagnifyingGlass className="z-20 text-primary" />
              </span>

              <input
                className="z-10 w-full my-1 bg-white outline-none px-2 py-2 border-gray-300 text-sm border-2 rounded"
                type="text"
                name="search"
                id="search"
                placeholder="Search Song"
                autoComplete="off"
                {...register("search")}
              />
            </div>
          </div>

          <div className="input mt-2">
            <label className="cursor-pointer font-medium" htmlFor="artist">
              Artist
            </label>

            <select
              name="artist"
              id="artist"
              {...register("artist")}
              className="w-full my-1 bg-white outline-none px-2 py-2 border-gray-300 text-sm border-2 rounded"
            >
              {artists.map((artist) => (
                <option key={artist.id} value={artist.name}>
                  {artist.name}
                </option>
              ))}
            </select>
          </div>

          <div className="input mt-2">
            <label className="cursor-pointer font-medium" htmlFor="label">
              Label
            </label>

            <select
              name="label"
              id="label"
              {...register("label")}
              className="w-full my-1 bg-white outline-none px-2 py-2 border-gray-300 text-sm border-2 rounded"
            >
              <option value="all">All</option>
              <option value="single">Single</option>
              <option value="album">Album</option>
            </select>
          </div>

          <div className="input mt-2">
            <label className="cursor-pointer font-medium" htmlFor="sortBy">
              Sort By
            </label>

            <select
              name="sortBy"
              id="sortBy"
              {...register("sortBy")}
              className="w-full my-1 bg-white outline-none px-2 py-2 border-gray-300 text-sm border-2 rounded"
            >
              <option value="aToZ">Artist (A-Z)</option>
              <option value="zToA">Artist (Z-A)</option>
              <option value="single">Single</option>
              <option value="album">Album</option>
            </select>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Sidebar;
