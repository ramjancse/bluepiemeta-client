"use client";

import React, { useEffect, useRef, useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";
import { MdCloudUpload } from "react-icons/md";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { axiosPrivateInstance } from "@/config/axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AddTrack from "@/components/albums/AddTrack";
import ReactDatePicker from "react-datepicker";
import { getAllArtists } from "@/lib/artist";
import { getAllLabel } from "@/lib/albums";
import Layout from "@/components/dashboard/Layout";
import Header from "@/components/dashboard/Header";
import { revalidatePath } from "next/cache";

const schema = yup
  .object({
    albumType: yup.string().trim().required("Album type is required"),
    albumName: yup
      .string()
      .trim()
      .required("Album name is required")
      .min(3, "Album name must be at least 3 character"),
    metadataLanguage: yup
      .string()
      .trim()
      .required("Metadata language is required")
      .min(2, "Metadata language must be at least 2 character")
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
    albumCover: yup.string().required("Album cover picture link is required"),
    primaryArtist: yup.array().of(
      yup.object({
        name: yup
          .string()
          .trim()
          .required("Primary Artist name is required")
          .min(3, "Primary Artist name must be at least 3 characters"),
      })
    ),
    featuringArtist: yup.array().of(
      yup.object({
        name: yup
          .string()
          .trim()
          .required("Featuring Artist name is required")
          .min(3, "Featuring Artist name must be at least 3 characters"),
      })
    ),
    trackType: yup
      .string()
      .trim()
      .required("Track type is required")
      .oneOf(
        ["lyrical", "instrumental"],
        "Track type must select lyrical or instrumental"
      ),
    audioLanguage: yup
      .string()
      .trim()
      .required("Audio language is required")
      .min(2, "Audio language must be at least 2 character"),
    albumGenre: yup.array().of(
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
    ),
    originalReleaseDate: yup
      .string()
      .trim()
      .required("Release date is required")
      .min(3, "Release date must be at least 3 character"),
    recordLabel: yup
      .string()
      .trim()
      .required("Label is required")
      .min(3, "Label must be at least 3 character"),
    cLine: yup
      .string()
      .trim()
      .required("C Line is required")
      .min(3, "C Line must be at least 3 character"),
    cLineYear: yup
      .string()
      .trim()
      .required("C Line Year is required")
      .min(3, "C Line Year must be at least 3 character"),
    pLine: yup
      .string()
      .trim()
      .required("P Line is required")
      .min(3, "P Line must be at least 3 character"),
    pLineYear: yup
      .string()
      .trim()
      .required("P Line Year is required")
      .min(3, "P Line Year must be at least 3 character"),
    upcean: yup
      .string()
      .trim()
      .required("UPC is required")
      .min(3, "UPC must be at least 3 character"),
    tracks: yup.array().required("Tracks is required"),
  })
  .required();

const links = [
  { id: 1, label: "Website", name: "website" },
  { id: 2, label: "iTunes", name: "iTunes" },
  { id: 3, label: "Facebook", name: "facebook" },
  { id: 4, label: "Vimeo", name: "vimeo" },
  { id: 4, label: "Youtube", name: "youtube" },
  { id: 4, label: "Deezer", name: "deezer" },
  { id: 4, label: "Instagram", name: "instagram" },
  { id: 4, label: "Spotify", name: "spotify" },
  { id: 4, label: "Twitter", name: "twitter" },
  { id: 4, label: "Daily Motion", name: "dailyMotion" },
  { id: 4, label: "Tiktok", name: "tikTok" },
  { id: 4, label: "Video Rating", name: "videoRating" },
];

const AddAlbumPage = () => {
  const session = useSession();
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [primaryArtists, setPrimaryArtists] = useState([]);
  const [labels, setLabels] = useState([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      status: "Draft",
      artistId: "",
      userId: session?.data?.user?.id,
      albumType: "",
      albumName: "",
      metadataLanguage: "",
      albumCover: "",
      primaryArtist: [{ name: "" }],
      featuringArtist: [{ name: "" }],
      trackType: "",
      albumGenre: [
        { name: "Indie", status: true },
        { name: "Singer", status: false },
        { name: "Artist", status: false },
        { name: "Lyricist", status: false },
        { name: "Composer", status: false },
        { name: "Producer", status: false },
        { name: "Band", status: false },
        { name: "Group", status: false },
      ],
      audioLanguage: "",
      originalReleaseDate: new Date(),
      recordLabel: "",
      upcean: "",
      cLine: "",
      cLineYear: new Date(),
      pLine: "",
      pLineYear: new Date(),
      tracks: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "primaryArtist",
    control,
  });

  const {
    fields: featuringFields,
    append: featuringAppend,
    remove: featuringRemove,
  } = useFieldArray({
    name: "featuringArtist",
    control,
  });

  const {
    fields: genreFields,
    append: genreAppend,
    remove: genreRemove,
  } = useFieldArray({
    name: "albumGenre",
    control,
  });

  const handleAddTrack = () => {
    setShow((prevShow) => !prevShow);

    // scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const onSubmitTrack = (data) => {
    // get local storage data
    const savedTracks = JSON.parse(localStorage.getItem("tracks"));

    if (savedTracks) {
      // update data
      localStorage.setItem(
        "tracks",
        JSON.stringify([
          { id: savedTracks.length + 1, ...data },
          ...savedTracks,
        ])
      );
    } else {
      // first time save data
      localStorage.setItem("tracks", JSON.stringify([{ id: 1, ...data }]));
    }

    // update state data
    setTracks((prevTracks) => {
      const updatedTracks = [
        ...prevTracks,
        { id: prevTracks.length + 1, ...data },
      ];

      setValue("tracks", updatedTracks);
      return updatedTracks;
    });
  };

  const onSubmit = async (data) => {
    console.log(data, "album submitted data");

    try {
      await axiosPrivateInstance(session?.data?.jwt).post("/albums", data);

      // show success message
      toast.success("Album added successfully");

      // remove local storage saved tracks data
      localStorage.removeItem("tracks");

      // redirect to another route
      router.push("/albums");
    } catch (error) {
      console.log(error, "error in add album page");

      // show error message
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const { data } = await getAllArtists();
    const { data: allLabels } = await getAllLabel();

    // get local storage data
    const savedTracks = JSON.parse(localStorage.getItem("tracks"));

    // update state with track data
    if (savedTracks) {
      setTracks(savedTracks);
    }

    setPrimaryArtists(data);
    setLabels(allLabels);
  };

  const handleDelete = (trackId) => {
    // remove from local storage
    const savedTracks = JSON.parse(localStorage.getItem("tracks"));
    const filteredTracks = savedTracks.filter((track) => track.id !== trackId);

    if (savedTracks) {
      // update data
      localStorage.setItem("tracks", JSON.stringify(filteredTracks));
    }

    // update state data
    setTracks((prevTracks) => {
      setValue("tracks", filteredTracks);
      return filteredTracks;
    });
  };

  return (
    <Layout>
      {show ? (
        <AddTrack onSubmitTrack={onSubmitTrack} setShow={setShow} />
      ) : (
        <>
          <Header name="Add Album" />
          <main className="px-4 py-3 border-l border-b">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="album">
                <div className="asset">
                  <h2 className="text-2xl">Album</h2>

                  {/* <div className="input-area mt-2 border-2 flex flex-col lg:flex-row lg:justify-between lg:items-center px-4 py-3">
                    <div className="left lg:w-1/2">
                      <h3>Type</h3>
                      <hr />

                      <div className="top mt-2 mb-4">
                        <div className="flex">
                          <div className="left">
                            <input
                              type="radio"
                              name="albumType"
                              id="albumEpisode"
                              className="mr-1"
                              value="Album"
                              {...register("albumType")}
                              defaultChecked
                            />
                            <label
                              htmlFor="albumEpisode"
                              className="cursor-pointer select-none"
                            >
                              Album/Episode
                            </label>
                          </div>

                          <div className="right flex items-center">
                            <input
                              type="radio"
                              name="albumType"
                              id="single"
                              className="ml-5 mr-1"
                              value="Single"
                              {...register("albumType")}
                            />
                            <label
                              htmlFor="single"
                              className="cursor-pointer select-none"
                            >
                              Single
                            </label>
                          </div>
                        </div>

                        <p
                          className={`${
                            errors.type?.message ? "block" : "hidden"
                          } text-sm text-red-500 font-semibold mt-1 ml-5`}
                        >
                          {errors.type?.message}
                        </p>
                      </div>

                      <div className="input">
                        <label
                          htmlFor="albumName"
                          className="cursor-pointer select-none"
                        >
                          Album Name
                        </label>

                        <input
                          type="text"
                          name="albumName"
                          id="albumName"
                          placeholder="Album name"
                          className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                          {...register("albumName")}
                        />

                        <p
                          className={`${
                            errors.albumName?.message ? "block" : "hidden"
                          } text-sm text-red-500 font-semibold mt-1 ml-5`}
                        >
                          {errors.albumName?.message}
                        </p>
                      </div>

                      <div className="input mt-3">
                        <label
                          htmlFor="metadataLanguage"
                          className="cursor-pointer select-none"
                        >
                          Title Language
                        </label>

                        <select
                          name="metadataLanguage"
                          id="metadataLanguage"
                          className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                          {...register("metadataLanguage")}
                        >
                          <option value="">Select Title Language</option>
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
                            errors.metadataLanguage?.message
                              ? "block"
                              : "hidden"
                          } text-sm text-red-500 font-semibold mt-1 ml-5`}
                        >
                          {errors.metadataLanguage?.message}
                        </p>
                      </div>
                    </div>

                    <div className="right lg:w-1/2 text-center mt-5 lg:mt-0">
                      <div className="lg:flex lg:justify-end">
                        <div className="bg-gray-200 lg:w-[220px] h-[220px] flex items-center justify-center rounded">
                          <label htmlFor="upload">
                            <MdCloudUpload className="text-[40px] cursor-pointer" />
                          </label>

                          <input
                            className="hidden"
                            type="file"
                            name="upload"
                            id="upload"
                          />
                        </div>
                      </div>

                      <p
                        className={`${
                          errors.albumCover?.message ? "block" : "hidden"
                        } text-sm text-red-500 font-semibold mt-1 ml-5 text-end`}
                      >
                        {errors.albumCover?.message}
                      </p>
                    </div>
                  </div> */}

                  <div className="input-section mt-2 border-2 px-4 py-3">
                    <div className="top">
                      <h3>Type</h3>
                      <hr />

                      <div className="top mt-2 mb-4">
                        <div className="flex">
                          <div className="left">
                            <input
                              type="radio"
                              name="albumType"
                              id="albumEpisode"
                              className="mr-1"
                              value="Album"
                              {...register("albumType")}
                              defaultChecked
                            />
                            <label
                              htmlFor="albumEpisode"
                              className="cursor-pointer select-none"
                            >
                              Album/Episode
                            </label>
                          </div>

                          <div className="right flex items-center">
                            <input
                              type="radio"
                              name="albumType"
                              id="single"
                              className="ml-5 mr-1"
                              value="Single"
                              {...register("albumType")}
                            />
                            <label
                              htmlFor="single"
                              className="cursor-pointer select-none"
                            >
                              Single
                            </label>
                          </div>
                        </div>

                        <p
                          className={`${
                            errors.type?.message ? "block" : "hidden"
                          } text-sm text-red-500 font-semibold mt-1 ml-5`}
                        >
                          {errors.type?.message}
                        </p>
                      </div>
                    </div>

                    <div className="input-area flex flex-wrap">
                      <div className="input w-1/2 pr-2">
                        <label
                          htmlFor="albumName"
                          className="cursor-pointer select-none"
                        >
                          Album Name
                        </label>

                        <input
                          type="text"
                          name="albumName"
                          id="albumName"
                          placeholder="Album name"
                          className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                          {...register("albumName")}
                        />

                        <p
                          className={`${
                            errors.albumName?.message ? "block" : "hidden"
                          } text-sm text-red-500 font-semibold mt-1 ml-5`}
                        >
                          {errors.albumName?.message}
                        </p>
                      </div>

                      <div className="input w-1/2 pl-2">
                        <label
                          htmlFor="metadataLanguage"
                          className="cursor-pointer select-none"
                        >
                          Metadata Language
                        </label>

                        <select
                          name="metadataLanguage"
                          id="metadataLanguage"
                          className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                          {...register("metadataLanguage")}
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
                            errors.metadataLanguage?.message
                              ? "block"
                              : "hidden"
                          } text-sm text-red-500 font-semibold mt-1 ml-5`}
                        >
                          {errors.metadataLanguage?.message}
                        </p>
                      </div>

                      <div className="input w-1/2 pr-2 mt-3">
                        <label
                          htmlFor="albumCover"
                          className="cursor-pointer select-none"
                        >
                          Cover image link
                        </label>

                        <input
                          type="text"
                          name="albumCover"
                          id="albumCover"
                          placeholder="Album cover image link"
                          className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                          {...register("albumCover")}
                        />

                        <p
                          className={`${
                            errors.albumCover?.message ? "block" : "hidden"
                          } text-sm text-red-500 font-semibold mt-1 ml-5`}
                        >
                          {errors.albumCover?.message}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="albumArtists mt-8">
                  <h2 className="text-2xl">Album Artists</h2>

                  <div className="input-area border-2 mt-2 grid grid-cols-12 grid-rows-1 gap-3 px-4 py-3">
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
                        htmlFor="featuringArtist"
                      >
                        Featuring Artist
                      </label>

                      {featuringFields.map((filed, index) => (
                        <div key={filed.id}>
                          <div className="flex items-center">
                            {index < 1 && (
                              <select
                                name={`featuringArtist[${index}].name`}
                                id={`featuringArtist[${index}].name`}
                                className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                                {...register(`featuringArtist.${index}.name`)}
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
                                name={`featuringArtist[${index}].name`}
                                id={`featuringArtist[${index}].name`}
                                className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                                {...register(`featuringArtist.${index}.name`)}
                                placeholder="Type artist name"
                              />
                            )}

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
                              errors.featuringArtist &&
                              errors.featuringArtist[index]?.name
                                ? "block"
                                : "hidden"
                            } text-sm text-red-500 font-semibold mt-1 ml-5 mb-3`}
                          >
                            {errors.featuringArtist &&
                              errors.featuringArtist[index]?.name?.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="metadata mt-5">
                  <h2 className="text-2xl">Metadata</h2>

                  <div className="input-area border-2 mt-1 px-4 py-3">
                    <div className="top mb-4">
                      <div className="flex">
                        <div className="left">
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

                    <div className="grid grid-cols-12 grid-rows-1 gap-3">
                      <div className="input col-start-1 col-end-13">
                        <label htmlFor="audioLanguage" className="select-none">
                          Genre
                        </label>

                        <div className="genre mt-2">
                          <div className="inputs border border-gray-200 px-2 py-4 flex flex-wrap">
                            {genreFields.map((field, index) => (
                              <div className="input px-3 py-1" key={field.id}>
                                <input
                                  type="checkbox"
                                  name={`albumGenre[${index}].name`}
                                  id={`albumGenre[${index}].name`}
                                  {...register(`albumGenre.${index}.status`)}
                                />
                                <label
                                  htmlFor={`albumGenre[${index}].name`}
                                  className="ml-1 cursor-pointer select-none"
                                >
                                  {field.name}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="input col-start-1 col-end-13 sm:col-end-7">
                        <label htmlFor="audioLanguage" className="select-none">
                          Audio Language
                        </label>

                        <select
                          name="audioLanguage"
                          id="audioLanguage"
                          className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                          {...register("audioLanguage")}
                        >
                          <option value="">Select Audio Language</option>
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

                      <div className="input col-start-1 col-end-13 sm:col-start-7 sm:col-end-13">
                        <label
                          htmlFor="releaseDate"
                          className="cursor-pointer select-none"
                        >
                          Release date
                        </label>

                        <Controller
                          control={control}
                          name="originalReleaseDate"
                          render={({ field }) => (
                            <ReactDatePicker
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
                              className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                            />
                          )}
                        />

                        <p
                          className={`${
                            errors.originalReleaseDate?.message
                              ? "block"
                              : "hidden"
                          } text-sm text-red-500 font-semibold mt-1 ml-5`}
                        >
                          {errors.originalReleaseDate?.message}
                        </p>
                      </div>

                      <div className="input col-start-1 col-end-13 sm:col-end-7">
                        <label
                          htmlFor="recordLabel"
                          className="cursor-pointer select-none"
                        >
                          Label
                        </label>

                        <select
                          name="recordLabel"
                          id="recordLabel"
                          className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                          {...register("recordLabel")}
                        >
                          <option value="">Select label</option>
                          {labels.map((label) => (
                            <option value={label.labelName} key={label.id}>
                              {label.labelName}
                            </option>
                          ))}
                        </select>

                        <p
                          className={`${
                            errors.recordLabel?.message ? "block" : "hidden"
                          } text-sm text-red-500 font-semibold mt-1 ml-5`}
                        >
                          {errors.recordLabel?.message}
                        </p>
                      </div>

                      <div className="input col-start-1 col-end-13 sm:col-start-7 sm:col-end-13">
                        <label
                          htmlFor="upcean"
                          className="cursor-pointer select-none"
                        >
                          UPC
                        </label>

                        <input
                          type="text"
                          name="upcean"
                          id="upcean"
                          className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                          {...register("upcean")}
                        />

                        <p
                          className={`${
                            errors.upcean?.message ? "block" : "hidden"
                          } text-sm text-red-500 font-semibold mt-1 ml-5`}
                        >
                          {errors.upcean?.message}
                        </p>
                      </div>

                      <div className="input col-start-1 col-end-13 sm:col-end-7">
                        <label
                          htmlFor="cLine"
                          className="cursor-pointer select-none"
                        >
                          C Line
                        </label>

                        <input
                          type="text"
                          name="cLine"
                          id="cLine"
                          className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                          {...register("cLine")}
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
                            <ReactDatePicker
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
                        <label
                          htmlFor="pLine"
                          className="cursor-pointer select-none"
                        >
                          P Line
                        </label>

                        <input
                          type="text"
                          name="pLine"
                          id="pLine"
                          className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                          {...register("pLine")}
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
                            <ReactDatePicker
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
                      </div>
                    </div>
                  </div>
                </div>

                <div className="tracks mt-5">
                  <h2 className="text-2xl">Tracks</h2>

                  <div className="input-area mt-1 px-4 py-3 border-2">
                    {tracks.length ? (
                      <>
                        <table className="w-full mt-2 border-collapse">
                          <thead className="bg-gray-700 text-white">
                            <tr>
                              <th className="border p-2 text-left">SL</th>
                              <th className="border p-2 text-left">
                                Track Title
                              </th>
                              <th className="border p-2 text-left">Artist</th>
                              <th className="border p-2 text-left">ISRC</th>
                              <th className="border p-2 text-left">Duration</th>
                              <th className="border p-2 text-left">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {tracks.map((track, index) => {
                              const {
                                id,
                                titleOfTrack,
                                primaryArtist,
                                isrc,
                                duration,
                              } = track;

                              return (
                                <tr className="even:bg-gray-100" key={index}>
                                  <td className="border p-2">{index + 1}</td>
                                  <td className="border p-2">{titleOfTrack}</td>
                                  <td className="border p-2">
                                    {primaryArtist[0]?.name}
                                  </td>
                                  <td className="border p-2">{isrc}</td>
                                  <td className="border p-2">{duration}</td>
                                  <td className="border p-2">
                                    <button
                                      type="button"
                                      className="bg-red-400 px-3 py-1 rounded text-white"
                                      onClick={() => handleDelete(id)}
                                    >
                                      Delete
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </>
                    ) : (
                      <>
                        <h2 className="text-center text-xl">
                          No tracks has been added
                        </h2>
                      </>
                    )}

                    <div className="add flex mt-16">
                      <button
                        className="px-10 py-2 rounded bg-blue-500 uppercase text-white"
                        onClick={handleAddTrack}
                      >
                        + Add Track
                      </button>
                    </div>
                  </div>
                </div>

                <div className="submit mt-10 flex justify-end">
                  <input
                    type="submit"
                    value="Submit"
                    className="text-center bg-green-600 px-14 py-2 font-semibold rounded-full text-white cursor-pointer"
                  />
                </div>
              </div>
            </form>
          </main>
        </>
      )}
    </Layout>
  );
};

export default AddAlbumPage;
