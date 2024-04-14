"use client";

import React, { useEffect, useState } from "react";
import { FaCirclePlus, FaUpload } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "./AddTrack.css";
import { getAllArtists } from "@/lib/artist";
import Header from "../dashboard/Header";
import { useSession } from "next-auth/react";

const schema = yup
  .object({
    trackType: yup
      .string()
      .trim()
      .required("Track type is required")
      .oneOf(
        ["Lyrical", "Instrumental"],
        "Track type must be select lyrical or instrumental"
      ),
    trackTitle: yup.string().trim().required("Track title is required"),
    trackVersion: yup.string().trim(),
    trackArtist: yup.array().of(
      yup.object({
        name: yup.string().trim().required("Track Artist name is required"),
      })
    ),
    trackArtistAdditional: yup.array().of(
      yup.object({
        name: yup.string().trim(),
      })
    ),
    trackArtistFeaturing: yup.array().of(
      yup.object({
        name: yup.string().trim(),
      })
    ),
    producer: yup.array().of(
      yup.object({
        name: yup.string().trim(),
      })
    ),
    composer: yup.array().of(
      yup.object().shape({
        name: yup
          .string()
          .trim()
          .test(
            "isRequiredOrMinLength",
            "Composer name validation error",
            function (value) {
              const { index } = this.options || {};

              if (index === 0 && !value) {
                return this.createError({
                  message: "Composer name is required",
                });
              }

              if (value && value.length < 3) {
                return this.createError({
                  message: "Composer name must be at least 3 characters",
                });
              }

              return true; // If no conditions are met, the field is valid
            }
          ),
      })
    ),
    remixer: yup.array().of(
      yup.object({
        name: yup.string().trim(),
      })
    ),
    lyricist: yup.array().when("trackType", {
      is: "Lyrical",
      then: () =>
        yup.array().of(
          yup.object({
            name: yup
              .string()
              .trim()
              .test(
                "isRequiredOrMinLength",
                "Lyricist name validation error",
                function (value) {
                  const { index } = this.options || {};

                  if (index === 0 && !value) {
                    return this.createError({
                      message: "Lyricist name is required",
                    });
                  }

                  if (value && value.length < 3) {
                    return this.createError({
                      message: "Lyricist name must be at least 3 characters",
                    });
                  }

                  return true;
                }
              ),
          })
        ),
      otherwise: () =>
        yup.array().of(
          yup.object({
            name: yup.string().trim(),
          })
        ),
    }),
    trackGenre: yup
      .array()
      .of(
        yup.object({
          name: yup
            .string()
            .trim()
            .oneOf(
              [
                "Indie",
                "Singer",
                "Artist",
                "Lyricist",
                "Composer",
                "Producer",
                "Band",
                "Group",
              ],
              "Genre must be select between fields"
            ),
          status: yup
            .boolean()
            .oneOf([true, false], "Status can only true or false"),
        })
      )
      .test(
        "at-least-one-true",
        "At least one genre must be selected",
        (array) => array.some((obj) => obj.status)
      ),
    trackSubGenre: yup.array().of(
      yup.object({
        name: yup
          .string()
          .trim()
          .oneOf(
            [
              "Indie",
              "Singer",
              "Artist",
              "Lyricist",
              "Composer",
              "Producer",
              "Band",
              "Group",
            ],
            "Album subgenre must be select between fields"
          ),
        status: yup
          .boolean()
          .oneOf([true, false], "Status can only true or false"),
      })
    ),
    trackLanguage: yup
      .string()
      .trim()
      .required("Track language is required")
      .oneOf(
        [
          "English",
          "Spanish",
          "French",
          "German",
          "Chinese",
          "Japanese",
          "Other",
        ],
        "Language must be select between fields"
      ),
    audioLanguage: yup
      .string()
      .trim()
      .required("Audio language is required")
      .oneOf(
        [
          "English",
          "Spanish",
          "French",
          "German",
          "Chinese",
          "Japanese",
          "Other",
        ],
        "Language must be select between fields"
      ),
    isrc: yup.string().trim().required("ISRC is required"),
    minute: yup.string().trim().required("Minute is required"),
    second: yup.string().trim().required("Second is required"),
    explicit: yup.boolean(),
    // audioFile: yup.string().trim(),

    // trackMood: yup.array().of(
    //   yup.object({
    //     name: yup
    //       .string()
    //       .trim()
    //       .oneOf(
    //         ["Sad", "Angry", "Emotional", "Peaceful", "Romantic"],
    //         "Mood must be select between fields"
    //       ),
    //     status: yup
    //       .boolean()
    //       .oneOf([true, false], "Status can only true or false"),
    //   })
    // ),
    // mix: yup.array().of(
    //   yup.object({
    //     name: yup
    //       .string()
    //       .trim()
    //       .required("Mix is required")
    //       .min(2, "Mix must be at least 2 character"),
    //   })
    // ),

    // tags: yup.array().of(
    //   yup.object({
    //     name: yup.string().trim().required("Tags is required"),
    //   })
    // ),
    // instruments: yup
    //   .string()
    //   .trim()
    //   .required("Instruments is required")
    //   .oneOf(
    //     ["Sad", "Angry", "Emotional", "Peaceful", "Romantic"],
    //     "Instruments must be select between fields"
    //   ),
    // bpm: yup.string().trim().required("BPM is required"),
    // upc: yup
    // .string()
    // .trim()
    // .required("UPC is required")
    // .min(3, "UPC must be at least 3 character"),

    // releaseDate: yup
    //   .string()
    //   .trim()
    //   .required("Release date is required")
    //   .min(3, "Release date must be at least 3 character"),
    // label: yup
    //   .string()
    //   .trim()
    //   .required("Label is required")
    //   .min(3, "Label must be at least 3 character"),
    // cLine: yup
    //   .string()
    //   .trim()
    //   .required("C Line is required")
    //   .min(3, "C Line must be at least 3 character"),
    // cLineYear: yup
    //   .string()
    //   .trim()
    //   .required("C Line Year is required")
    //   .min(3, "C Line Year must be at least 3 character"),
    // pLine: yup
    //   .string()
    //   .trim()
    //   .required("P Line is required")
    //   .min(3, "P Line must be at least 3 character"),
    // pLineYear: yup
    //   .string()
    //   .trim()
    //   .required("P Line Year is required")
    //   .min(3, "P Line Year must be at least 3 character"),

    // lyrics: yup.string().trim().required("Lyrics is required"),
    // complianceRight: yup
    //   .boolean()
    //   .oneOf([true, false], "Compilation Rights can only true or false"),
    // videoRights: yup
    //   .boolean()
    //   .oneOf([true, false], "Video Rights can only true or false"),
    // audioRights: yup
    //   .boolean()
    //   .oneOf([true, false], "Audio Rights can only true or false"),
    // promoRights: yup
    //   .boolean()
    //   .oneOf([true, false], "Promo Rights can only true or false"),
  })
  .transform((originalValue, originalObject) => {
    const { minute, second } = originalObject;

    if (minute && second) {
      return {
        ...originalObject,
        duration: minute + ":" + second,
      };
    }

    return originalObject;
  })
  .required();

const AddTrack = ({ onSubmitTrack, setShow }) => {
  const [releaseArtists, setReleaseArtists] = useState([]);
  const router = useRouter();
  const session = useSession();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      trackType: "Lyrical",
      trackTitle: "",
      trackVersion: "",
      trackArtist: [{ name: "" }],
      trackArtistAdditional: [{ name: "" }],
      trackArtistFeaturing: [{ name: "" }],
      producer: [{ name: "" }],
      composer: [{ name: "" }],
      remixer: [{ name: "" }],
      lyricist: [{ name: "" }],
      trackGenre: [
        { name: "Indie", status: true },
        { name: "Singer", status: false },
        { name: "Artist", status: false },
        { name: "Lyricist", status: false },
        { name: "Composer", status: false },
        { name: "Producer", status: false },
        { name: "Band", status: false },
        { name: "Group", status: false },
      ],
      trackSubGenre: [
        { name: "Indie", status: false },
        { name: "Singer", status: false },
        { name: "Artist", status: false },
        { name: "Lyricist", status: false },
        { name: "Composer", status: false },
        { name: "Producer", status: false },
        { name: "Band", status: false },
        { name: "Group", status: false },
      ],
      trackLanguage: "",
      audioLanguage: "",
      isrc: "",
      minute: "", // minute and second modify to duration
      second: "",
      explicit: true,

      // audioFile: "",
      // arranger: [{ name: "" }],
      // featuringArtist: [{ name: "" }],
      // trackLinks: [{ name: "", link: "" }],
      // rating: 5,
      // contract: "",

      // complianceRight: true,
      // videoRights: true,
      // audioRights: true,
      // promoRights: true,
      // catalogNumber: "ABC-123-456",

      // trackType: "",
      // trackMood: [
      //   { name: "Sad", status: true },
      //   { name: "Angry", status: false },
      //   { name: "Emotional", status: false },
      //   { name: "Peaceful", status: false },
      //   { name: "Romantic", status: false },
      // ],
      // mix: [
      //   {
      //     name: "",
      //   },
      // ],
      // tags: [{ name: "" }],
      // // lyrics: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "trackArtist",
    control,
  });

  const {
    fields: additionalFields,
    append: additionalAppend,
    remove: additionalRemove,
  } = useFieldArray({
    name: "trackArtistAdditional",
    control,
  });

  const {
    fields: featuringFields,
    append: featuringAppend,
    remove: featuringRemove,
  } = useFieldArray({
    name: "trackArtistFeaturing",
    control,
  });

  const {
    fields: composerFields,
    append: composerAppend,
    remove: composerRemove,
  } = useFieldArray({
    name: "composer",
    control,
  });

  const {
    fields: lyricistFields,
    append: lyricistAppend,
    remove: lyricistRemove,
  } = useFieldArray({
    name: "lyricist",
    control,
  });

  const {
    fields: producerFields,
    append: producerAppend,
    remove: producerRemove,
  } = useFieldArray({
    name: "producer",
    control,
  });

  const { fields: genreFields } = useFieldArray({
    name: "trackGenre",
    control,
  });

  const { fields: subgenreFields } = useFieldArray({
    name: "trackSubGenre",
    control,
  });

  const {
    fields: remixerFields,
    append: remixerAppend,
    remove: remixerRemove,
  } = useFieldArray({
    name: "remixer",
    control,
  });

  // const {
  //   fields: moodFields,
  //   append: moodAppend,
  //   remove: moodRemove,
  // } = useFieldArray({
  //   name: "trackMood",
  //   control,
  // });

  // const {
  //   fields: tagsFields,
  //   append: tagsAppend,
  //   remove: tagsRemove,
  // } = useFieldArray({
  //   name: "tags",
  //   control,
  // });

  // const {
  //   fields: mixFields,
  //   append: mixAppend,
  //   remove: mixRemove,
  // } = useFieldArray({
  //   name: "mix",
  //   control,
  // });

  const onSubmit = async (data) => {
    // submitted data to parent
    onSubmitTrack(data);

    // show album form
    setShow((prevShow) => !prevShow);
  };

  useEffect(() => {
    if (session?.data?.jwt) {
      loadArtistsData();
    }
  }, [session]);

  const loadArtistsData = async () => {
    const { data } = await getAllArtists(session?.data?.jwt);
    const isFound = localStorage.getItem("releasePrimaryArtist");

    let releasePrimaryArtist = null;

    if (isFound) {
      releasePrimaryArtist = JSON.parse(isFound);
    }

    if (releasePrimaryArtist && releasePrimaryArtist[0]?.name?.length) {
      // populate filed by array
      reset({ trackArtist: releasePrimaryArtist });
    }

    // update local state by all data
    setReleaseArtists(data);
  };

  return (
    <>
      <Header name="Add Track" />
      <main className="px-4 py-2 border-l border-b">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="asset mt-4">
            <h2 className="text-2xl">Asset</h2>

            <div className="input-area mt-2 border-2 px-4 py-3">
              <div className="input">
                <div className="flex flex-col sm:flex-row">
                  <div className="w-full sm:w-1/2 sm:mr-3">
                    <label
                      htmlFor="trackTitle"
                      className="cursor-pointer select-none"
                    >
                      Track Title
                    </label>

                    <input
                      type="text"
                      name="trackTitle"
                      id="trackTitle"
                      className="my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm w-full"
                      placeholder="Track title"
                      {...register("trackTitle")}
                    />

                    <p
                      className={`${
                        errors.trackTitle?.message ? "block" : "hidden"
                      } text-sm text-red-500 font-semibold mt-1`}
                    >
                      {errors.trackTitle?.message}
                    </p>
                  </div>

                  <div className="w-full sm:w-1/2">
                    <label
                      htmlFor="trackLanguage"
                      className="cursor-pointer select-none"
                    >
                      Track Language
                    </label>

                    <select
                      name="trackLanguage"
                      id="trackLanguage"
                      className="my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm w-full"
                      {...register("trackLanguage")}
                    >
                      <option value="">Select language</option>
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                      <option value="Chinese">Chinese</option>
                      <option value="Japanese">Japanese</option>
                      <option value="Other">Other</option>
                    </select>

                    <p
                      className={`${
                        errors.trackLanguage?.message ? "block" : "hidden"
                      } text-sm text-red-500 font-semibold mt-1`}
                    >
                      {errors.trackLanguage?.message}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-12 grid-rows-1 gap-3 mt-3">
                <div className="input col-start-1 col-end-13 sm:col-end-7">
                  <label
                    className="cursor-pointer block select-none"
                    htmlFor="trackArtist"
                  >
                    Track Artist
                  </label>

                  {fields.map((filed, index) => (
                    <div key={filed.id}>
                      <div className="flex items-center">
                        {index < 1 && (
                          <select
                            name={`trackArtist[${index}].name`}
                            id={`trackArtist[${index}].name`}
                            className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                            {...register(`trackArtist.${index}.name`)}
                          >
                            <option value="">Select artist</option>
                            {releaseArtists.map((artist, index) => {
                              const { id, artistName, fullName, name } = artist;
                              return (
                                <option
                                  key={id ? id : index}
                                  value={artistName ? artistName : name}
                                >
                                  {artistName ? artistName : name}
                                </option>
                              );
                            })}
                          </select>
                        )}

                        {index > 0 && (
                          <input
                            type="text"
                            name={`trackArtist[${index}].name`}
                            id={`trackArtist[${index}].name`}
                            className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                            {...register(`trackArtist.${index}.name`)}
                            placeholder="Type artist name"
                          />
                        )}

                        {!index > 0 && (
                          <FaCirclePlus
                            onClick={() => append({ name: "" })}
                            className="ml-2 text-blue-700 text-xl cursor-pointer"
                          />
                        )}

                        {index > 0 && (
                          <IoIosCloseCircle
                            onClick={() => remove(index)}
                            className="ml-1 text-red-500 text-2xl cursor-pointer"
                          />
                        )}
                      </div>

                      <p
                        className={`${
                          errors.trackArtist && errors.trackArtist[index]?.name
                            ? "block"
                            : "hidden"
                        } text-sm text-red-500 font-semibold mt-1 ml-5 mb-3`}
                      >
                        {errors.trackArtist &&
                          errors.trackArtist[index]?.name?.message}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="input col-start-1 col-end-13 sm:col-start-7 sm:col-end-13">
                  <label
                    className="cursor-pointer block select-none"
                    htmlFor="trackArtistAdditional"
                  >
                    Track Artist Additional
                  </label>

                  {additionalFields.map((filed, index) => (
                    <div key={filed.id}>
                      <div className="flex items-center">
                        <input
                          type="text"
                          name={`trackArtistAdditional[${index}].name`}
                          id={`trackArtistAdditional[${index}].name`}
                          className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                          placeholder="Type name"
                          {...register(`trackArtistAdditional.${index}.name`, {
                            context: { index },
                          })}
                        />

                        {!index > 0 && (
                          <FaCirclePlus
                            onClick={() => additionalAppend({ name: "" })}
                            className="ml-2 text-blue-700 text-xl cursor-pointer"
                          />
                        )}

                        {index > 0 && (
                          <IoIosCloseCircle
                            onClick={() => additionalRemove(index)}
                            className="ml-1 text-red-500 text-2xl cursor-pointer"
                          />
                        )}
                      </div>

                      <p
                        className={`${
                          errors.trackArtistAdditional &&
                          errors.trackArtistAdditional[index]?.name
                            ? "block"
                            : "hidden"
                        } text-sm text-red-500 font-semibold mt-1 ml-5 mb-3`}
                      >
                        {errors.trackArtistAdditional &&
                          errors.trackArtistAdditional[index]?.name?.message}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="input col-start-1 col-end-13 sm:col-end-7">
                  <label
                    className="cursor-pointer block select-none"
                    htmlFor="trackArtistFeaturing"
                  >
                    Track Artist Featuring
                  </label>

                  {featuringFields.map((filed, index) => (
                    <div key={filed.id}>
                      <div className="flex items-center">
                        <input
                          type="text"
                          name={`trackArtistFeaturing[${index}].name`}
                          id={`trackArtistFeaturing[${index}].name`}
                          className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                          placeholder="Type name"
                          {...register(`trackArtistFeaturing.${index}.name`, {
                            context: { index },
                          })}
                        />

                        {!index > 0 && (
                          <FaCirclePlus
                            onClick={() => featuringAppend({ name: "" })}
                            className="ml-2 text-blue-700 text-xl cursor-pointer"
                          />
                        )}

                        {index > 0 && (
                          <IoIosCloseCircle
                            onClick={() => featuringRemove(index)}
                            className="ml-1 text-red-500 text-2xl cursor-pointer"
                          />
                        )}
                      </div>

                      <p
                        className={`${
                          errors.trackArtistFeaturing &&
                          errors.trackArtistFeaturing[index]?.name
                            ? "block"
                            : "hidden"
                        } text-sm text-red-500 font-semibold mt-1 ml-5 mb-3`}
                      >
                        {errors.trackArtistFeaturing &&
                          errors.trackArtistFeaturing[index]?.name?.message}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="input col-start-1 col-end-13 sm:col-start-7 sm:col-end-13">
                  <label
                    className="cursor-pointer block select-none"
                    htmlFor="composer"
                  >
                    Composer
                  </label>

                  {composerFields.map((filed, index) => (
                    <div key={filed.id}>
                      <div className="flex items-center">
                        <input
                          type="text"
                          name={`composer[${index}].name`}
                          id={`composer[${index}].name`}
                          className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                          placeholder="Type name"
                          {...register(`composer.${index}.name`, {
                            context: { index },
                          })}
                        />

                        {!index > 0 && (
                          <FaCirclePlus
                            onClick={() => composerAppend({ name: "" })}
                            className="ml-2 text-blue-700 text-xl cursor-pointer"
                          />
                        )}

                        {index > 0 && (
                          <IoIosCloseCircle
                            onClick={() => composerRemove(index)}
                            className="ml-1 text-red-500 text-2xl cursor-pointer"
                          />
                        )}
                      </div>

                      <p
                        className={`${
                          errors.composer && errors.composer[index]?.name
                            ? "block"
                            : "hidden"
                        } text-sm text-red-500 font-semibold mt-1 ml-5 mb-3`}
                      >
                        {errors.composer &&
                          errors.composer[index]?.name?.message}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bottom mt-2">
                <div className="flex">
                  <div className="left">
                    <div className="">
                      <input
                        type="radio"
                        name="trackType"
                        id="Lyrical"
                        className="mr-1"
                        value="Lyrical"
                        {...register("trackType")}
                        defaultChecked={getValues("trackType") === "Lyrical"}
                      />
                      <label
                        htmlFor="Lyrical"
                        className="cursor-pointer select-none"
                      >
                        Lyrical
                      </label>
                    </div>
                  </div>

                  <div className="right">
                    <input
                      type="radio"
                      name="trackType"
                      id="Instrumental"
                      className="ml-5 mr-1"
                      value="Instrumental"
                      {...register("trackType")}
                      defaultChecked={getValues("trackType") === "Instrumental"}
                    />
                    <label
                      htmlFor="Instrumental"
                      className="cursor-pointer select-none"
                    >
                      Instrumental
                    </label>
                  </div>
                </div>

                <p
                  className={`${
                    errors.trackType?.message ? "block" : "hidden"
                  } text-sm text-red-500 font-semibold mt-1 ml-5`}
                >
                  {errors.trackType?.message}
                </p>
              </div>
            </div>
          </div>

          <div className="contributors mt-8">
            <h2 className="text-2xl">Contributors</h2>

            <div className="input-area border-2 mt-2 grid grid-cols-12 grid-rows-1 gap-3 px-4 py-3">
              <div className="input col-start-1 col-end-13 sm:col-end-7">
                <label
                  className="cursor-pointer block select-none"
                  htmlFor="lyricist"
                >
                  Lyricist
                </label>

                {lyricistFields.map((filed, index) => (
                  <div key={filed.id}>
                    <div className="flex items-center">
                      <input
                        type="text"
                        name={`lyricist[${index}].name`}
                        id={`lyricist[${index}].name`}
                        className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                        placeholder="Type lyricist name"
                        {...register(`lyricist.${index}.name`)}
                      />

                      {!index > 0 && (
                        <FaCirclePlus
                          onClick={() => lyricistAppend({ name: "" })}
                          className="ml-2 text-blue-700 text-xl cursor-pointer"
                        />
                      )}

                      {index > 0 && (
                        <IoIosCloseCircle
                          onClick={() => lyricistRemove(index)}
                          className="ml-1 text-red-500 text-2xl cursor-pointer"
                        />
                      )}
                    </div>

                    <p
                      className={`${
                        errors.lyricist && errors.lyricist[index]?.name
                          ? "block"
                          : "hidden"
                      } text-sm text-red-500 font-semibold mt-1 ml-5 mb-3`}
                    >
                      {errors.lyricist && errors.lyricist[index]?.name?.message}
                    </p>
                  </div>
                ))}
              </div>

              <div className="input col-start-1 col-end-13 sm:col-start-7 sm:col-end-13">
                <label className="cursor-pointer block" htmlFor="producer">
                  Producer
                </label>

                {producerFields.map((filed, index) => (
                  <div key={filed.id}>
                    <div className="flex items-center">
                      <input
                        type="text"
                        name={`producer[${index}].name`}
                        id={`producer[${index}].name`}
                        className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                        placeholder="Type producer name"
                        {...register(`producer.${index}.name`)}
                      />

                      {!index > 0 && (
                        <FaCirclePlus
                          onClick={() => producerAppend({ name: "" })}
                          className="ml-2 text-blue-700 text-xl cursor-pointer"
                        />
                      )}

                      {index > 0 && (
                        <IoIosCloseCircle
                          onClick={() => producerRemove(index)}
                          className="ml-1 text-red-500 text-2xl cursor-pointer"
                        />
                      )}
                    </div>

                    <p
                      className={`${
                        errors.producer && errors.producer[index]?.name
                          ? "block"
                          : "hidden"
                      } text-sm text-red-500 font-semibold mt-1 ml-5 mb-3`}
                    >
                      {errors.producer && errors.producer[index]?.name?.message}
                    </p>
                  </div>
                ))}
              </div>

              <div className="input input col-start-1 col-end-13 sm:col-end-7">
                <label htmlFor="remixer" className="select-none">
                  Remixer
                </label>

                <div className="">
                  {remixerFields.map((field, index) => (
                    <div key={field.id}>
                      <div className="flex items-center">
                        <input
                          type="text"
                          name={`remixer[${index}].name`}
                          id={`remixer[${index}].name`}
                          className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                          {...register(`remixer.${index}.name`)}
                          placeholder="Type remixer name"
                        />

                        {index < 1 && (
                          <FaCirclePlus
                            onClick={() => remixerAppend({ name: "" })}
                            className="ml-2 text-blue-700 text-xl cursor-pointer"
                          />
                        )}

                        {index > 0 && (
                          <IoIosCloseCircle
                            onClick={() => remixerRemove(index)}
                            className="ml-1 text-red-500 text-2xl cursor-pointer"
                          />
                        )}
                      </div>

                      <p
                        className={`${
                          errors.remixer && errors.remixer[index]?.name
                            ? "block"
                            : "hidden"
                        } text-sm text-red-500 font-semibold mt-1 ml-5 mb-3`}
                      >
                        {errors.remixer && errors.remixer[index]?.name?.message}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="technical mt-5">
            <h2 className="text-2xl">Technical</h2>

            <div className="input-area border-2 mt-2 grid grid-cols-12 grid-rows-1 gap-3 px-4 py-3">
              <div className="input col-start-1 col-end-13 sm:col-end-7">
                <label htmlFor="audioLanguage" className="select-none">
                  Audio Language
                </label>

                <div className="">
                  <select
                    name="audioLanguage"
                    id="audioLanguage"
                    className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                    {...register("audioLanguage")}
                  >
                    <option value="">Select Language</option>
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Japanese">Japanese</option>
                    <option value="Other">Other</option>
                  </select>

                  <p
                    className={`${
                      errors.audioLanguage?.message ? "block" : "hidden"
                    } text-sm text-red-500 font-semibold mt-1 ml-5`}
                  >
                    {errors.audioLanguage?.message}
                  </p>
                </div>
              </div>

              {/* <div className="input col-start-1 col-end-13 sm:col-start-7 sm:col-end-13">
                <label htmlFor="mix" className="select-none">
                  Mix
                </label>

                <div className="">
                  {mixFields.map((field, index) => (
                    <div key={field.id}>
                      <div className="flex items-center">
                        <input
                          type="text"
                          name={`mix[${index}].name`}
                          id={`mix[${index}].name`}
                          className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                          {...register(`mix.${index}.name`)}
                          placeholder="Type here"
                        />

                        {index < 1 && (
                          <FaCirclePlus
                            onClick={() => mixAppend({ name: "" })}
                            className="ml-2 text-blue-700 text-xl cursor-pointer"
                          />
                        )}

                        {index > 0 && (
                          <IoIosCloseCircle
                            onClick={() => mixRemove(index)}
                            className="ml-1 text-red-500 text-2xl cursor-pointer"
                          />
                        )}
                      </div>

                      <p
                        className={`${
                          errors.mix && errors.mix[index]?.name
                            ? "block"
                            : "hidden"
                        } text-sm text-red-500 font-semibold mt-1 ml-5 mb-3`}
                      >
                        {errors.mix && errors.mix[index]?.name?.message}
                      </p>
                    </div>
                  ))}
                </div>
              </div> */}

              <div className="input col-start-1 col-end-13 sm:col-start-7 sm:col-end-13">
                <label htmlFor="duration" className="select-none">
                  Duration
                </label>

                <div className="flex">
                  <div className="w-1/2">
                    <div className="flex items-center">
                      <input
                        name="minute"
                        id="minute"
                        type="number"
                        className="my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm w-full select-none"
                        placeholder="Minute"
                        min="0"
                        max="15"
                        {...register("minute")}
                      />

                      <label htmlFor="minute" className="cursor-pointer ml-1">
                        Min
                      </label>
                    </div>

                    <p
                      className={`${
                        errors.minute?.message ? "block" : "hidden"
                      } text-sm text-red-500 font-semibold mt-1 ml-5`}
                    >
                      {errors.minute?.message}
                    </p>
                  </div>

                  <div className="w-1/2 overflow-hidden">
                    <div className="flex items-center">
                      <input
                        type="number"
                        name="second"
                        id="second"
                        placeholder="Sec"
                        min="0"
                        max="60"
                        className="my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm w-full ml-3"
                        {...register("second")}
                      />

                      <label htmlFor="second" className="cursor-pointer ml-1">
                        Sec
                      </label>
                    </div>

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

              {/* <div className="input col-start-1 col-end-13 sm:col-start-7 sm:col-end-13">
                <label htmlFor="tags" className="select-none">
                  Tags
                </label>

                {tagsFields.map((field, index) => (
                  <div key={field.id}>
                    <div className="flex items-center">
                      <input
                        type="text"
                        name={`tags[${index}].name`}
                        id={`tags[${index}].name`}
                        className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                        {...register(`tags.${index}.name`)}
                        placeholder="Type tag"
                      />

                      {index < 1 && (
                        <FaCirclePlus
                          onClick={() => tagsAppend({ name: "" })}
                          className="ml-2 text-blue-700 text-xl cursor-pointer"
                        />
                      )}

                      {index > 0 && (
                        <IoIosCloseCircle
                          onClick={() => tagsRemove(index)}
                          className="ml-1 text-red-500 text-2xl cursor-pointer"
                        />
                      )}
                    </div>

                    <p
                      className={`${
                        errors.tags && errors.tags[index]?.name
                          ? "block"
                          : "hidden"
                      } text-sm text-red-500 font-semibold mt-1 ml-5 mb-3`}
                    >
                      {errors.tags && errors.tags[index]?.name?.message}
                    </p>
                  </div>
                ))}
              </div> */}

              {/* <div className="input col-start-1 col-end-13">
                <h4>Moods</h4>
                <div className="inputs border border-gray-200 px-2 py-2 flex flex-wrap">
                  {moodFields.map((field, index) => (
                    <div className="pl-3 py-1 w-1/4" key={field.id}>
                      <input
                        type="checkbox"
                        name={`trackMood[${index}].name`}
                        id={`trackMood[${index}].name`}
                        {...register(`trackMood.${index}.status`)}
                        className="cursor-pointer"
                      />

                      <label
                        htmlFor={`trackMood[${index}].name`}
                        className="ml-1 cursor-pointer select-none text-sm"
                      >
                        {field.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div> */}

              <div className="input col-start-1 col-end-13">
                <h4>Track Genre</h4>

                <div className="inputs border border-gray-200 py-2 flex flex-wrap">
                  {genreFields.map((field, index) => (
                    <div className="input pl-3 py-1 w-1/4" key={field.id}>
                      <input
                        type="checkbox"
                        name={`trackGenre[${index}].name`}
                        id={`trackGenre[${index}].name`}
                        {...register(`trackGenre.${index}.status`)}
                        className="cursor-pointer"
                      />

                      <label
                        htmlFor={`trackGenre[${index}].name`}
                        className="ml-1 cursor-pointer select-none text-sm"
                      >
                        {field.name}
                      </label>
                    </div>
                  ))}
                </div>

                <p
                  className={`${
                    errors.trackGenre && errors.trackGenre?.root?.message
                      ? "block"
                      : "hidden"
                  } text-sm text-red-500 font-semibold mt-1 mb-3 ml-1`}
                >
                  {errors.trackGenre && errors.trackGenre?.root?.message}
                </p>
              </div>

              <div className="input col-start-1 col-end-13">
                <h4>Track Sub Genre</h4>

                <div className="inputs border border-gray-200 py-2 flex flex-wrap">
                  {subgenreFields.map((field, index) => (
                    <div className="input pl-3 py-1 w-1/4" key={field.id}>
                      <input
                        type="checkbox"
                        name={`trackSubGenre[${index}].name`}
                        id={`trackSubGenre[${index}].name`}
                        {...register(`trackSubGenre.${index}.status`)}
                        className="cursor-pointer"
                      />

                      <label
                        htmlFor={`trackSubGenre[${index}].name`}
                        className="ml-1 cursor-pointer select-none text-sm"
                      >
                        {field.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="metadata mt-5">
            <h2 className="text-2xl">Metadata</h2>

            <div className="input-area border-2 mt-1 grid grid-cols-12 grid-rows-1 gap-3 px-4 py-3">
              <div className="input col-start-1 col-end-13 sm:col-end-7">
                <label
                  htmlFor="trackVersion"
                  className="cursor-pointer select-none"
                >
                  Track Version
                </label>

                <input
                  type="text"
                  name="trackVersion"
                  id="trackVersion"
                  className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                  {...register("trackVersion")}
                  placeholder="Track version"
                />

                <p
                  className={`${
                    errors.trackVersion?.message ? "block" : "hidden"
                  } text-sm text-red-500 font-semibold mt-1 ml-5`}
                >
                  {errors.trackVersion?.message}
                </p>
              </div>

              <div className="input col-start-1 col-end-13 sm:col-start-7 sm:col-end-13">
                <label htmlFor="isrc" className="cursor-pointer select-none">
                  ISRC
                </label>

                <input
                  type="text"
                  name="isrc"
                  id="isrc"
                  className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                  {...register("isrc")}
                  placeholder="ISRC"
                />

                <p
                  className={`${
                    errors.isrc?.message ? "block" : "hidden"
                  } text-sm text-red-500 font-semibold mt-1 ml-5`}
                >
                  {errors.isrc?.message}
                </p>
              </div>

              <div className="input col-start-1 col-end-13">
                <label
                  htmlFor="explicit"
                  className="cursor-pointer select-none"
                >
                  Explicit
                </label>

                <div className="flex mt-1">
                  <div className="left">
                    <input
                      type="radio"
                      name="explicit"
                      id="yes"
                      className="mr-1"
                      value="true"
                      {...register("explicit")}
                      defaultChecked={getValues("explicit") === true}
                    />
                    <label htmlFor="yes" className="cursor-pointer select-none">
                      Yes
                    </label>
                  </div>

                  <div className="right flex items-center">
                    <input
                      type="radio"
                      name="explicit"
                      id="no"
                      className="ml-5 mr-1"
                      value="false"
                      {...register("explicit")}
                      defaultChecked={getValues("explicit") === false}
                    />
                    <label htmlFor="no" className="cursor-pointer select-none">
                      No
                    </label>
                  </div>
                </div>

                <p
                  className={`${
                    errors.explicit?.message ? "block" : "hidden"
                  } text-sm text-red-500 font-semibold mt-1 ml-5`}
                >
                  {errors.explicit?.message}
                </p>
              </div>
            </div>
          </div>

          {/* <div className="bottom mt-10 sm:flex">
            <div className="legal sm:w-1/2 mr-5">
              <h2 className="text-2xl">Legal</h2>

              <div className="input-area border mt-1 px-4 py-3">
                <div className="contract flex flex-col lg:flex-row">
                  <button className="border-2 py-1 text-center text-sm my-2 lg:w-[200px]">
                    Contract
                  </button>

                  <label
                    className="bg-gray-200 py-[6px] items-center rounded-full cursor-pointer flex justify-center lg:m-auto lg:w-[250px]"
                    htmlFor="contract"
                  >
                    <FaUpload className="text-blue-700" />
                    <span className="ml-3 text-sm ">Click to upload</span>
                  </label>

                  <input
                    className="hidden"
                    type="file"
                    name="contract"
                    id="contract"
                  />
                </div>

                <div className="legals mt-5">
                  <div className="inputs border border-gray-200 px-2 py-2 flex flex-wrap items-center">
                    <div className="pl-3 py-1 w-1/2">
                      <input
                        type="checkbox"
                        name="complianceRight"
                        id="complianceRight"
                        {...register(`complianceRight`)}
                        className="cursor-pointer"
                        defaultChecked
                      />

                      <label
                        htmlFor="complianceRight"
                        className="ml-1 cursor-pointer select-none text-sm"
                      >
                        Compilation Rights
                      </label>
                    </div>

                    <div className="pl-3 py-1 w-1/2">
                      <input
                        type="checkbox"
                        name="videoRights"
                        id="videoRights"
                        {...register(`videoRights`)}
                        className="cursor-pointer"
                        defaultChecked
                      />

                      <label
                        htmlFor="videoRights"
                        className="ml-1 cursor-pointer select-none text-sm"
                      >
                        Video Rights
                      </label>
                    </div>

                    <div className="pl-3 py-1 w-1/2">
                      <input
                        type="checkbox"
                        name="audioRights"
                        id="audioRights"
                        {...register(`audioRights`)}
                        className="cursor-pointer"
                        defaultChecked
                      />

                      <label
                        htmlFor="audioRights"
                        className="ml-1 cursor-pointer select-none text-sm"
                      >
                        Audio Rights
                      </label>
                    </div>

                    <div className="pl-3 py-1 w-1/2">
                      <input
                        type="checkbox"
                        name="promoRights"
                        id="promoRights"
                        {...register(`promoRights`)}
                        className="cursor-pointer"
                        defaultChecked
                      />

                      <label
                        htmlFor="promoRights"
                        className="ml-1 cursor-pointer select-none text-sm"
                      >
                        Promo Rights
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lyrics sm:w-1/2 mt-5 sm:mt-0 sm:ml-5">
              <h2 className="text-2xl">Lyrics</h2>

              <div className="input-area border mt-1 px-4 py-3 flex flex-col xl:flex-row xl:items-center xl:justify-between">
                <div className="xl:w-2/3">
                  <div className="text">
                    <textarea
                      name="lyrics"
                      id="lyrics"
                      cols="30"
                      rows="10"
                      {...register("lyrics")}
                      className="focus:outline-none border-2 px-2 py-1"
                      placeholder="Type here"
                    ></textarea>

                    <p
                      className={`${
                        errors.lyrics?.message ? "block" : "hidden"
                      } text-sm text-red-500 font-semibold mt-1 ml-5`}
                    >
                      {errors.lyrics?.message}
                    </p>
                  </div>
                </div>

                <div className="button xl:w-1/3 text-center xl:text-right mt-5 xl:mt-0">
                  <button className="bg-gray-200 rounded-full px-5 py-1">
                    View Full
                  </button>
                </div>
              </div>
            </div>
          </div> */}

          <div className="submit mt-10">
            <input
              type="submit"
              value="Add Track"
              className="px-10 py-2 rounded bg-green-600 uppercase cursor-pointer text-white"
            />
          </div>
        </form>
      </main>
    </>
  );
};

export default AddTrack;
