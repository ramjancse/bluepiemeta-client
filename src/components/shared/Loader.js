import { BeatLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <BeatLoader color="#2e6afa" size={25} />
    </div>
  );
};

export default Loader;
