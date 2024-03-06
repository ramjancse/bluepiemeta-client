
"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useFieldArray, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const schema = yup
  .object({
    minute: yup.string().trim().required("Minute is required"),
    second: yup.string().trim().required("Second is required"),
    players: yup.array(),
    mood: yup.array(),
  })
  .required();

const AddTrack = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      mood: [
        { name: "Sad", status: false },
        { name: "Angry", status: false },
        { name: "Emotional", status: true },
        { name: "Peaceful", status: false },
        { name: "Romantic", status: false },
      ],
    },
  });

  const {
    fields: moodFields,
    append: moodAppend,
    remove: moodRemove,
  } = useFieldArray({
    name: "mood",
    control,
  });

  const onSubmit = async (data) => {
    setValue("moods", []);
    setValue("duration", `${data.minute}:${data.second}`);
    console.log(data, "data");
  };

  const defaultValues = {
    trackTitle: "This track title one",
    titleLanguage: "bangla",
    primaryArtists: [{ name: "" }],
    composers: [{ name: "Ramjan Ali" }],
    lyricists: [{ name: "Abid Hasan" }],
    producers: [{ name: "Iqbal Hasan" }],
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="technical mt-5">
          <h2 className="text-2xl">Technical</h2>

          <div className="input-area border-2 mt-1 px-3 py-2 xs:px-5 xs:py-3 md:px-10 md:py-5 lg:px-14 lg:py-7">
            <div className="grid grid-cols-12 grid-rows-1 gap-x-6 gap-y-3">
              <div className="input col-start-1 col-end-13 sm:col-end-7">
                <label htmlFor="duration" className="select-none">
                  Duration
                </label>

                <div className="flex">
                  {moodFields.map((filed, index) => (
                    <div className="input flex px-3 py-1" key={filed.id}>
                      <input
                        type="checkbox"
                        name={`mood[${index}].name`}
                        id={`mood[${index}].name`}
                        {...register(`mood.${index}.status`)}
                      />
                      <label
                        htmlFor={`mood[${index}].name`}
                        className="ml-1 cursor-pointer select-none"
                      >
                        {filed.name}
                      </label>
                    </div>
                  ))}
                </div>

                <div className="flex">
                  <div className="w-1/2">
                    <input
                      type="checkbox"
                      name="players"
                      id="players"
                      className="my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm w-full"
                      {...register("players.0.name")}
                    />

                    <p
                      className={`${
                        errors.players?.message ? "block" : "hidden"
                      } text-sm text-red-500 font-semibold mt-1 ml-5`}
                    >
                      {errors.players?.message}
                    </p>
                  </div>

                  <div className="w-1/2">
                    <input
                      type="text"
                      name="minute"
                      id="duration"
                      className="my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm w-full"
                      {...register("minute")}
                      placeholder="Minute"
                    />

                    <p
                      className={`${
                        errors.minute?.message ? "block" : "hidden"
                      } text-sm text-red-500 font-semibold mt-1 ml-5`}
                    >
                      {errors.minute?.message}
                    </p>
                  </div>

                  <div className="w-1/2">
                    <input
                      type="text"
                      name="second"
                      id="second"
                      className="my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm w-full ml-3"
                      {...register("second")}
                      placeholder="Second"
                    />

                    <p
                      className={`${
                        errors.second?.message ? "block" : "hidden"
                      } text-sm text-red-500 font-semibold mt-1 ml-5`}
                    >
                      {errors.second?.message}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="submit mt-7">
          <input
            type="submit"
            value="Submit"
            className="px-10 py-2 round bg-blue-500 uppercase cursor-pointer"
          />
        </div>
      </form>
    </>
  );
};

export default AddTrack;

