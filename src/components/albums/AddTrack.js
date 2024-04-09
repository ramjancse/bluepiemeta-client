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
    titleOfTrack: yup.string().trim().required("Track title is required"),
    metadataLanguage: yup
      .string()
      .trim()
      .required("Track title language is required")
      .min(2, "Track title language must be at least 2 character")
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
    primaryArtist: yup.array().of(
      yup.object({
        name: yup
          .string()
          .trim()
          .required("Primary Artist name is required")
          .min(3, "Primary Artist name must be at least 3 characters"),
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
    trackType: yup
      .string()
      .trim()
      .required("Track type is required")
      .oneOf(
        ["lyrical", "instrumental"],
        "Track type must be select lyrical or instrumental"
      ),
    lyricist: yup.array().when("trackType", {
      is: "lyrical",
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
    producer: yup.array().when("trackType", {
      is: "lyrical",
      then: () =>
        yup.array().of(
          yup.object({
            name: yup.string().trim(),
          })
        ),
      otherwise: () =>
        yup.array().of(
          yup.object({
            name: yup.string().trim(),
          })
        ),
    }),
    mixer: yup.array().of(
      yup.object({
        name: yup
          .string()
          .trim()
          .required("Mixer name is required")
          .min(3, "Mixer name must be at least 3 characters"),
      })
    ),
    audioLanguage: yup
      .string()
      .trim()
      .required("Audio language is required")
      .min(2, "Audio language must be at least 2 character")
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
    trackMood: yup.array().of(
      yup.object({
        name: yup
          .string()
          .trim()
          .oneOf(
            ["Sad", "Angry", "Emotional", "Peaceful", "Romantic"],
            "Mood must be select between fields"
          ),
        status: yup
          .boolean()
          .oneOf([true, false], "Status can only true or false"),
      })
    ),
    mix: yup.array().of(
      yup.object({
        name: yup
          .string()
          .trim()
          .required("Mix is required")
          .min(2, "Mix must be at least 2 character"),
      })
    ),
    minute: yup.string().trim().required("Minute is required"),
    second: yup.string().trim().required("Second is required"),
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
    trackSubgenre: yup
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
              "Album subgenre must be select between fields"
            ),
          status: yup
            .boolean()
            .oneOf([true, false], "Status can only true or false"),
        })
      )
      .test(
        "at-least-one-true",
        "At least one sub genre must be selected",
        (array) => array.some((obj) => obj.status)
      ),
    tags: yup.array().of(
      yup.object({
        name: yup.string().trim().required("Tags is required"),
      })
    ),
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

    version: yup.string().trim(),
    isrc: yup
      .string()
      .trim()
      .required("ISRC is required")
      .min(3, "ISRC must be at least 3 character"),
    lyrics: yup.string().trim().required("Lyrics is required"),
    complianceRight: yup
      .boolean()
      .oneOf([true, false], "Compilation Rights can only true or false"),
    videoRights: yup
      .boolean()
      .oneOf([true, false], "Video Rights can only true or false"),
    audioRights: yup
      .boolean()
      .oneOf([true, false], "Audio Rights can only true or false"),
    promoRights: yup
      .boolean()
      .oneOf([true, false], "Promo Rights can only true or false"),
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

const links = [
  { id: 1, label: "Website", name: "website" },
  { id: 2, label: "iTunes", name: "iTunes" },
  { id: 3, label: "Facebook", name: "facebook" },
  { id: 4, label: "Vimeo", name: "vimeo" },
  { id: 5, label: "Youtube", name: "youtube" },
  { id: 6, label: "Deezer", name: "deezer" },
  { id: 7, label: "Instagram", name: "instagram" },
  { id: 8, label: "Spotify", name: "spotify" },
  { id: 9, label: "Twitter", name: "twitter" },
  { id: 10, label: "Daily Motion", name: "dailyMotion" },
  { id: 11, label: "Tiktok", name: "tikTok" },
  { id: 12, label: "Video Rating", name: "videoRating" },
];

const AddTrack = ({ onSubmitTrack, setShow }) => {
  const [primaryArtists, setPrimaryArtists] = useState([]);
  const router = useRouter();
  const session = useSession();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      audioFile: "",
      arranger: [{ name: "" }],
      featuringArtist: [{ name: "" }],
      trackLinks: [{ name: "", link: "" }],
      rating: 5,
      contract: "",
      explicit: "Not explicit",
      complianceRight: true,
      videoRights: true,
      audioRights: true,
      promoRights: true,
      catalogNumber: "ABC-123-456",

      titleOfTrack: "",
      metadataLanguage: "",
      primaryArtist: [{ name: "" }],
      composer: [{ name: "" }],
      trackType: "",
      lyricist: [{ name: "" }],
      producer: [{ name: "" }],
      mixer: [{ name: "" }],
      audioLanguage: "",
      trackMood: [
        { name: "Sad", status: true },
        { name: "Angry", status: false },
        { name: "Emotional", status: false },
        { name: "Peaceful", status: false },
        { name: "Romantic", status: false },
      ],
      mix: [
        {
          name: "",
        },
      ],
      minute: "",
      second: "",
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
      trackSubgenre: [
        { name: "Indie", status: false },
        { name: "Singer", status: false },
        { name: "Artist", status: false },
        { name: "Lyricist", status: false },
        { name: "Composer", status: false },
        { name: "Producer", status: false },
        { name: "Band", status: false },
        { name: "Group", status: false },
      ],
      tags: [{ name: "" }],
      version: "",
      isrc: "",
      lyrics: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "primaryArtist",
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

  const {
    fields: moodFields,
    append: moodAppend,
    remove: moodRemove,
  } = useFieldArray({
    name: "trackMood",
    control,
  });

  const {
    fields: genreFields,
    append: genreAppend,
    remove: genreRemove,
  } = useFieldArray({
    name: "trackGenre",
    control,
  });

  const { fields: subgenreFields } = useFieldArray({
    name: "trackSubgenre",
    control,
  });

  const {
    fields: mixerFields,
    append: mixerAppend,
    remove: mixerRemove,
  } = useFieldArray({
    name: "mixer",
    control,
  });

  const {
    fields: tagsFields,
    append: tagsAppend,
    remove: tagsRemove,
  } = useFieldArray({
    name: "tags",
    control,
  });

  const {
    fields: mixFields,
    append: mixAppend,
    remove: mixRemove,
  } = useFieldArray({
    name: "mix",
    control,
  });

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
    setPrimaryArtists(data);
  };

  // legal e just contract hobe upload ar baki gulo hobe checkbox

  return (
    <>
      <Header name="Add Track" />
      <main className="px-4 py-2 border-l border-b">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="asset mt-4">
            <h2 className="text-2xl">Asset</h2>

            <div className="input-area mt-2 border-2 px-4 py-3">
              {/* <div className="input flex flex-col">
                <label htmlFor="music" className="cursor-pointer">
                  File Upload
                </label>

                <div className="my-1 bg-gray-200 outline-none px-2 py-2 border-l-8 border-blue-700">
                  <label
                    className="bg-white py-[6px] items-center rounded-full cursor-pointer flex justify-center sm:m-auto sm:w-[250px] lg:w-1/2"
                    htmlFor="music"
                  >
                    <FaUpload className="text-blue-700" />
                    <span className="ml-3 text-sm ">Click to upload</span>
                  </label>
                </div>

                <input type="file" name="music" id="music" className="hidden" />
                <p className="text-xs">
                  <span className="text-red-600 font-bold">***</span>Please
                  upload audio file in WAV format.
                </p>
              </div> */}

              <div className="input">
                <div className="flex flex-col sm:flex-row">
                  <div className="w-full sm:w-1/2 sm:mr-3">
                    <label
                      htmlFor="title"
                      className="cursor-pointer select-none"
                    >
                      Track Title
                    </label>

                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm w-full"
                      placeholder="Track title"
                      {...register("titleOfTrack")}
                    />

                    <p
                      className={`${
                        errors.titleOfTrack?.message ? "block" : "hidden"
                      } text-sm text-red-500 font-semibold mt-1`}
                    >
                      {errors.titleOfTrack?.message}
                    </p>
                  </div>

                  <div className="w-full sm:w-1/2">
                    <label
                      htmlFor="metadataLanguage"
                      className="cursor-pointer select-none"
                    >
                      Track Language
                    </label>

                    <select
                      name="metadataLanguage"
                      id="metadataLanguage"
                      className="my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm w-full"
                      {...register("metadataLanguage")}
                    >
                      <option value="">Title language</option>
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
                        errors.metadataLanguage?.message ? "block" : "hidden"
                      } text-sm text-red-500 font-semibold mt-1`}
                    >
                      {errors.metadataLanguage?.message}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-12 grid-rows-1 gap-3 mt-3">
                <div className="input col-start-1 col-end-13 sm:col-end-7">
                  <label
                    className="cursor-pointer block select-none"
                    htmlFor="primaryArtist"
                  >
                    Primary Artist
                  </label>

                  {fields.map((filed, index) => (
                    <div key={filed.id}>
                      <div className="flex items-center">
                        {index < 1 && (
                          <select
                            name={`primaryArtist[${index}].name`}
                            id={`primaryArtist[${index}].name`}
                            className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                            {...register(`primaryArtist.${index}.name`)}
                          >
                            <option value="">Select artist</option>
                            {primaryArtists.map((artist) => {
                              const { id, artistName, fullName } = artist;
                              return (
                                <option key={id} value={artistName}>
                                  {artistName}
                                </option>
                              );
                            })}
                          </select>
                        )}

                        {index > 0 && (
                          <input
                            type="text"
                            name={`primaryArtist[${index}].name`}
                            id={`primaryArtist[${index}].name`}
                            className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                            {...register(`primaryArtist.${index}.name`)}
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
                          errors.primaryArtist &&
                          errors.primaryArtist[index]?.name
                            ? "block"
                            : "hidden"
                        } text-sm text-red-500 font-semibold mt-1 ml-5 mb-3`}
                      >
                        {errors.primaryArtist &&
                          errors.primaryArtist[index]?.name?.message}
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
                          placeholder="Type composer name"
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
                        id="lyrical"
                        className="mr-1"
                        value="lyrical"
                        {...register("trackType")}
                        defaultChecked
                      />
                      <label
                        htmlFor="lyrical"
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
                      id="instrumental"
                      className="ml-5 mr-1"
                      value="instrumental"
                      {...register("trackType")}
                    />
                    <label
                      htmlFor="instrumental"
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
                <label htmlFor="mix" className="select-none">
                  Remixer
                </label>

                <div className="">
                  {mixerFields.map((field, index) => (
                    <div key={field.id}>
                      <div className="flex items-center">
                        <input
                          type="text"
                          name={`mixer[${index}].name`}
                          id={`mixer[${index}].name`}
                          className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                          {...register(`mixer.${index}.name`)}
                          placeholder="Type mixer name"
                        />

                        {index < 1 && (
                          <FaCirclePlus
                            onClick={() => mixerAppend({ name: "" })}
                            className="ml-2 text-blue-700 text-xl cursor-pointer"
                          />
                        )}

                        {index > 0 && (
                          <IoIosCloseCircle
                            onClick={() => mixerRemove(index)}
                            className="ml-1 text-red-500 text-2xl cursor-pointer"
                          />
                        )}
                      </div>

                      <p
                        className={`${
                          errors.mixer && errors.mixer[index]?.name
                            ? "block"
                            : "hidden"
                        } text-sm text-red-500 font-semibold mt-1 ml-5 mb-3`}
                      >
                        {errors.mixer && errors.mixer[index]?.name?.message}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="technical mt-5">
            <h2 className="text-2xl">Technical</h2>

            <div className="input-area border-2 mt-1 px-4 py-3">
              <div className="flex flex-col lg:flex-row">
                <div className="left lg:w-1/2">
                  <div className="input">
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

                  <div className="input">
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
                  </div>

                  <div className="input">
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

                          <label
                            htmlFor="minute"
                            className="cursor-pointer ml-1"
                          >
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

                          <label
                            htmlFor="second"
                            className="cursor-pointer ml-1"
                          >
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

                  <div className="input">
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
                  </div>
                </div>

                <div className="right lg:w-1/2 ml-5">
                  <div className="moods">
                    <h4>Moods</h4>
                    <div className="inputs border border-gray-200 px-2 py-2 flex flex-wrap">
                      {/* Here is all mod set */}

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
                  </div>

                  <div className="genre mt-5">
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
                  </div>

                  <div className="subGenre mt-5">
                    <h4>Track Sub Genre</h4>

                    <div className="inputs border border-gray-200 py-2 flex flex-wrap">
                      {subgenreFields.map((field, index) => (
                        <div className="input pl-3 py-1 w-1/4" key={field.id}>
                          <input
                            type="checkbox"
                            name={`trackSubgenre[${index}].name`}
                            id={`trackSubgenre[${index}].name`}
                            {...register(`trackSubgenre.${index}.status`)}
                            className="cursor-pointer"
                          />

                          <label
                            htmlFor={`trackSubgenre[${index}].name`}
                            className="ml-1 cursor-pointer select-none text-sm"
                          >
                            {field.name}
                          </label>
                        </div>
                      ))}
                    </div>

                    <p
                      className={`${
                        errors.trackSubgenre &&
                        errors.trackSubgenre?.root?.message
                          ? "block"
                          : "hidden"
                      } text-sm text-red-500 font-semibold mt-1 ml-5 mb-3`}
                    >
                      {errors.trackSubgenre &&
                        errors.trackSubgenre?.root?.message}
                    </p>
                  </div>
                </div>

                {/* <div className="input col-start-1 col-end-13 sm:col-start-7 sm:col-end-13">
                <label htmlFor="genre" className="select-none">
                  Genre
                </label>

                <div className="">
                  <select
                    name="genre"
                    id="genre"
                    className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                    {...register("genre")}
                  >
                    <option value="">Select Genre</option>
                    <option value="Indie">Indie</option>
                    <option value="Singer">Singer</option>
                    <option value="Artist">Artist</option>
                    <option value="Lyricist">Lyricist</option>
                    <option value="Composer">Composer</option>
                    <option value="Producer">Producer</option>
                    <option value="Band">Band</option>
                    <option value="Group">Group</option>
                  </select>

                  <p
                    className={`${
                      errors.genre?.message ? "block" : "hidden"
                    } text-sm text-red-500 font-semibold mt-1 ml-5`}
                  >
                    {errors.genre?.message}
                  </p>
                </div>
              </div>

              <div className="input col-start-1 col-end-13 sm:col-end-7">
                <label htmlFor="mood" className="select-none">
                  Mood
                </label>

                <div className="">
                  <select
                    name="mood"
                    id="mood"
                    className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                    {...register("mood")}
                  >
                    <option value="">Select Mood</option>
                    <option value="Sad">Sad</option>
                    <option value="Angry">Angry</option>
                    <option value="Emotional">Emotional</option>
                    <option value="Peaceful">Peaceful</option>
                    <option value="Romantic">Romantic</option>
                  </select>

                  <p
                    className={`${
                      errors.mood?.message ? "block" : "hidden"
                    } text-sm text-red-500 font-semibold mt-1 ml-5`}
                  >
                    {errors.mood?.message}
                  </p>
                </div>
              </div>

              <div className="input col-start-1 col-end-13 sm:col-end-7">
                <label htmlFor="instruments" className="select-none">
                  Instruments
                </label>

                <div className="">
                  <select
                    name="instruments"
                    id="instruments"
                    className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                    {...register("instruments")}
                  >
                    <option value="">Select instruments</option>
                    <option value="Sad">Sad</option>
                    <option value="Angry">Angry</option>
                    <option value="Emotional">Emotional</option>
                    <option value="Peaceful">Peaceful</option>
                    <option value="Romantic">Romantic</option>
                  </select>

                  <p
                    className={`${
                      errors.instruments?.message ? "block" : "hidden"
                    } text-sm text-red-500 font-semibold mt-1 ml-5`}
                  >
                    {errors.instruments?.message}
                  </p>
                </div>
              </div>

              <div className="input col-start-1 col-end-13 sm:col-end-7">
                <label htmlFor="bpm" className="select-none">
                  BPM
                </label>

                <div className="">
                  <select
                    name="bpm"
                    id="bpm"
                    className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                    {...register("bpm")}
                  >
                    <option value="">Select BPM</option>
                    <option value="bangla">Bangla</option>
                    <option value="english">English</option>
                    <option value="hindi">Hindi</option>
                  </select>

                  <p
                    className={`${
                      errors.bpm?.message ? "block" : "hidden"
                    } text-sm text-red-500 font-semibold mt-1 ml-5`}
                  >
                    {errors.bpm?.message}
                  </p>
                </div>
              </div> */}
              </div>
            </div>
          </div>

          <div className="metadata mt-5">
            <h2 className="text-2xl">Metadata</h2>

            <div className="input-area border-2 mt-1 grid grid-cols-12 grid-rows-1 gap-3 px-4 py-3">
              {/* <div className="input col-start-1 col-end-13 sm:col-end-7">
                <label
                  htmlFor="releaseDate"
                  className="cursor-pointer select-none inline-block mb-1"
                >
                  Release date
                </label>

                <Controller
                  control={control}
                  name="releaseDate"
                  render={({ field }) => (
                    <DatePicker
                      selected={field.value}
                      onChange={(date) => {
                        field.onChange(date);
                      }}
                      showIcon
                      toggleCalendarOnIconClick
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      dateFormat="dd-MMMM-yyyy"
                      className="w-full bg-gray-200 outline-none px-2 py-5 border-l-8 border-blue-700 text-sm"
                    />
                  )}
                />

                <p
                  className={`${
                    errors.releaseDate?.message ? "block" : "hidden"
                  } text-sm text-red-500 font-semibold mt-1 ml-5`}
                >
                  {errors.releaseDate?.message}
                </p>
              </div>

              <div className="input col-start-1 col-end-13 sm:col-start-7 sm:col-end-13">
                <label htmlFor="label" className="cursor-pointer select-none">
                  Label
                </label>

                <select
                  name="label"
                  id="label"
                  className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                  {...register("label")}
                >
                  <option value="">Select label</option>
                  <option value="Blue Pie Records">Blue Pie Records</option>
                  <option value="Planet Blue Pictures">
                    Planet Blue Pictures
                  </option>
                  <option value="Latin Central Records">
                    Latin Central Records
                  </option>
                  <option value="Dj Central Records">Dj Central Records</option>
                  <option value="Sweet peach Records">
                    Sweet peach Records
                  </option>
                  <option value="Indig Music">Indig Music</option>
                  <option value="The Music Factory">The Music Factory</option>
                  <option value="Jisland Records">Jisland Records</option>
                  <option value="The Great File Archives">
                    The Great File Archives
                  </option>
                </select>

                <p
                  className={`${
                    errors.label?.message ? "block" : "hidden"
                  } text-sm text-red-500 font-semibold mt-1 ml-5`}
                >
                  {errors.label?.message}
                </p>
              </div>

              <div className="input col-start-1 col-end-13 sm:col-end-7">
                <label htmlFor="cLine" className="cursor-pointer select-none">
                  C Line
                </label>

                <input
                  type="text"
                  name="cLine"
                  id="cLine"
                  className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                  {...register("cLine")}
                  placeholder="C line"
                />

                <p
                  className={`${
                    errors.cLine?.message ? "block" : "hidden"
                  } text-sm text-red-500 font-semibold mt-1 ml-5`}
                >
                  {errors.cLine?.message}
                </p>
              </div>

              <div className="input col-start-1 col-end-13 sm:col-start-7 sm:col-end-13">
                <label
                  htmlFor="cLineYear"
                  className="cursor-pointer select-none"
                >
                  C Line Year
                </label>

                <Controller
                  control={control}
                  name="cLineYear"
                  render={({ field }) => (
                    <DatePicker
                      selected={field.value}
                      onChange={(date) => {
                        field.onChange(date);
                      }}
                      showYearPicker
                      dropdownMode="select"
                      dateFormat="yyyy"
                      yearItemNumber={16}
                      className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                    />
                  )}
                />

                <p
                  className={`${
                    errors.cLineYear?.message ? "block" : "hidden"
                  } text-sm text-red-500 font-semibold mt-1 ml-5`}
                >
                  {errors.cLineYear?.message}
                </p>
              </div>

              <div className="input col-start-1 col-end-13 sm:col-end-7">
                <label htmlFor="pLine" className="cursor-pointer select-none">
                  P Line
                </label>

                <input
                  type="text"
                  name="pLine"
                  id="pLine"
                  className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                  {...register("pLine")}
                  placeholder="P line"
                />

                <p
                  className={`${
                    errors.pLine?.message ? "block" : "hidden"
                  } text-sm text-red-500 font-semibold mt-1 ml-5`}
                >
                  {errors.pLine?.message}
                </p>
              </div>

              <div className="input col-start-1 col-end-13 sm:col-start-7 sm:col-end-13">
                <label
                  htmlFor="pLineYear"
                  className="cursor-pointer select-none"
                >
                  P Line Year
                </label>

                <Controller
                  control={control}
                  name="pLineYear"
                  render={({ field }) => (
                    <DatePicker
                      selected={field.value}
                      onChange={(date) => {
                        field.onChange(date);
                      }}
                      showYearPicker
                      dropdownMode="select"
                      dateFormat="yyyy"
                      yearItemNumber={16}
                      className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                    />
                  )}
                />

                <p
                  className={`${
                    errors.pLineYear?.message ? "block" : "hidden"
                  } text-sm text-red-500 font-semibold mt-1 ml-5`}
                >
                  {errors.pLineYear?.message}
                </p>
              </div> */}

              {/* <div className="input col-start-1 col-end-13 sm:col-end-7">
              <label htmlFor="upc" className="cursor-pointer select-none">
                UPC
              </label>

              <input
                type="text"
                name="upc"
                id="upc"
                className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                {...register("upc")}
              />

              <p
                className={`${
                  errors.upc?.message ? "block" : "hidden"
                } text-sm text-red-500 font-semibold mt-1 ml-5`}
              >
                {errors.upc?.message}
              </p>
            </div> */}

              <div className="input col-start-1 col-end-13 sm:col-end-7">
                <label htmlFor="isrc" className="cursor-pointer select-none">
                  Track Version
                </label>

                <input
                  type="text"
                  name="version"
                  id="version"
                  className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                  {...register("version")}
                  placeholder="Track version"
                />

                <p
                  className={`${
                    errors.version?.message ? "block" : "hidden"
                  } text-sm text-red-500 font-semibold mt-1 ml-5`}
                >
                  {errors.version?.message}
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
                  htmlFor="releaseType"
                  className="cursor-pointer select-none"
                >
                  Release Explicit
                </label>

                <div className="flex mt-1">
                  <div className="left">
                    <input
                      type="radio"
                      name="releaseExplicit"
                      id="yes"
                      className="mr-1"
                      value="yes"
                      {...register("releaseExplicit")}
                      defaultChecked
                    />
                    <label htmlFor="yes" className="cursor-pointer select-none">
                      Yes
                    </label>
                  </div>

                  <div className="right flex items-center">
                    <input
                      type="radio"
                      name="releaseExplicit"
                      id="no"
                      className="ml-5 mr-1"
                      value="no"
                      {...register("releaseExplicit")}
                    />
                    <label htmlFor="no" className="cursor-pointer select-none">
                      No
                    </label>
                  </div>
                </div>

                <p
                  className={`${
                    errors.releaseExplicit?.message ? "block" : "hidden"
                  } text-sm text-red-500 font-semibold mt-1 ml-5`}
                >
                  {errors.releaseExplicit?.message}
                </p>
              </div>
            </div>
          </div>

          {/* <div className="links mt-5">
          <h2 className="text-2xl">Links</h2>

          <div className="border-2 px-3 py-2 xs:px-5 xs:py-3 md:px-10 md:py-5 lg:px-14 lg:py-7">
            <div className="flex flex-wrap gap-y-3">
              {links.map((link, index) => (
                <div
                  className={`input w-full md:w-1/2 ${
                    index % 2 !== 0 ? "md:pl-5" : "md:pr-5"
                  }`}
                  key={link.id}
                >
                  <div className="flex">
                    <label
                      className="border-2 py-2 cursor-pointer w-[200px] text-center text-sm"
                      htmlFor={link.name}
                    >
                      {link.label}
                    </label>

                    <input
                      type="text"
                      name={link.name}
                      id={link.name}
                      className="bg-gray-200 pl-2 pr-2 focus:outline-none w-full text-sm"
                      placeholder="https://example.com"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div> */}

          <div className="bottom mt-10 sm:flex">
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
          </div>

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
