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
import UploadImage from "@/assets/images/main_banner.jpg";
import Image from "next/image";

const schema = yup
  .object({
    releaseType: yup
      .string()
      .trim()
      .required("Release type is required")
      .oneOf(["Audio", "Video"], "Release type must be select audio or video"),
    releaseTitle: yup
      .string()
      .trim()
      .required("Release title is required")
      .min(3, "Release title must be at least 3 character"),
    releaseCover: yup
      .string()
      .required("Release cover picture link is required"),
    releasePrimaryArtist: yup.array().of(
      yup.object({
        name: yup
          .string()
          .trim()
          .required("Release Primary Artist name is required")
          .min(3, "Primary Artist name must be at least 3 characters"),
      })
    ),
    releaseSecondaryArtist: yup.array().of(
      yup.object({
        name: yup.string().trim(),
      })
    ),
    releaseLanguage: yup.string().trim(),
    releaseGenre: yup
      .array()
      .of(
        yup.object({
          name: yup
            .string()
            .trim()
            .required("Release genre must be select")
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
              "Release genre must be select between fields"
            ),
          status: yup
            .boolean()
            .oneOf([true, false], "Status can only true or false"),
        })
      )
      .test(
        "at-least-one-true",
        "At least one release genre must be select", // Custom error message
        (array) => array.some((obj) => obj.status)
      ),
    releaseSubGenre: yup
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
        "At least one sub genre must be selected", // Custom error message
        (array) => array.some((obj) => obj.status)
      ),
    originalReleaseDate: yup
      .string()
      .trim()
      .required("Release date is required"),
    recordLabel: yup.string().trim().required("Label is required"),
    cLineCompany: yup.string().trim().required("C-Line Company is required"),
    cLineYear: yup.string().trim().required("C-Line Year is required"),
    pLineCompany: yup.string().trim().required("P-Line company is required"),
    pLineYear: yup.string().trim().required("P-Line Year is required"),
    upcean: yup.string().trim().required("UPC is required"),
    tracks: yup.array().required("Tracks is required"),
    formatType: yup.string().when("releaseType", {
      is: "Audio",
      then: () =>
        yup
          .string()
          .trim()
          .required("Format type is required")
          .oneOf(
            ["Single", "Album", "Compilation"],
            "Format type must be select between fields"
          ),
      otherwise: () =>
        yup
          .string()
          .trim()
          .required("Format type is required")
          .oneOf(["Music Video"], "Format type must be select between fields"),
    }),
    releaseVersion: yup.string().trim(),
    catalogNumber: yup.string().trim(),
    releaseExplicit: yup.boolean().required("Release explicit is required"),
    platforms: yup.array().of(
      yup.object({
        name: yup
          .string()
          .trim()
          .oneOf(
            [
              "FUGA",
              "Believe",
              "Ordior",
              "Kanjian",
              "Too Lost",
              "Horus",
              "DITTO",
              "DashGo",
              "Ingrooves",
            ],
            "Platforms name must be select between fields"
          ),
        status: yup
          .boolean()
          .oneOf([true, false], "Status can only true or false"),
      })
    ),
  })
  .required();

const AddAlbum = () => {
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
    watch,
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      albumId: "",
      userId: session?.data?.user?.id,
      artistId: "",
      status: "Draft",
      releaseVersion: "",
      albumType: "Album", // ["Album", "EP", "Single", "Audio", "Video"];
      releaseType: "Audio",
      formatType: "",
      releaseTitle: "",
      releaseCover: "",
      releaseGenre: [
        { name: "Indie", status: true },
        { name: "Singer", status: false },
        { name: "Artist", status: false },
        { name: "Lyricist", status: false },
        { name: "Composer", status: false },
        { name: "Producer", status: false },
        { name: "Band", status: false },
        { name: "Group", status: false },
      ],
      releaseSubGenre: [
        { name: "Indie", status: true },
        { name: "Singer", status: false },
        { name: "Artist", status: false },
        { name: "Lyricist", status: false },
        { name: "Composer", status: false },
        { name: "Producer", status: false },
        { name: "Band", status: false },
        { name: "Group", status: false },
      ],
      platforms: [
        { name: "FUGA", status: true },
        { name: "Believe", status: false },
        { name: "Ordior", status: false },
        { name: "Kanjian", status: false },
        { name: "Too Lost", status: false },
        { name: "Horus", status: false },
        { name: "DITTO", status: false },
        { name: "DashGo", status: false },
        { name: "Ingrooves", status: false },
      ],
      releaseLanguage: "",
      releasePrimaryArtist: [{ name: "" }],
      releaseSecondaryArtist: [{ name: "" }],
      originalReleaseDate: new Date(),
      digitalReleaseDate: "",
      recordLabel: "",
      pLineCompany: "",
      pLineYear: new Date(),
      cLineCompany: "",
      cLineYear: new Date(),
      upcean: "",
      tracks: [],
      catalogNumber: "",
      releaseExplicit: true,
    },
  });

  const releaseType = watch("releaseType");
  const formatType = watch("formatType");
  const primaryArtist = watch("releasePrimaryArtist");

  const { fields, append, remove } = useFieldArray({
    name: "releasePrimaryArtist",
    control,
  });

  const {
    fields: featuringFields,
    append: featuringAppend,
    remove: featuringRemove,
  } = useFieldArray({
    name: "releaseSecondaryArtist",
    control,
  });

  const { fields: genreFields } = useFieldArray({
    name: "releaseGenre",
    control,
  });

  const { fields: subgenreFields } = useFieldArray({
    name: "releaseSubGenre",
    control,
  });

  const { fields: platformsFields } = useFieldArray({
    name: "platforms",
    control,
  });

  const handleAddTrack = () => {
    // save primary artist for add track

    if (formatType !== "compilation" && formatType.length) {
      localStorage.setItem(
        "releasePrimaryArtist",
        JSON.stringify(primaryArtist)
      );
    }

    setShow((prevShow) => !prevShow);

    // scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const onSubmitTrack = (data) => {
    console.log(data, "track data");

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
    console.log(data, "album data");

    try {
      const {
        data: {
          links: { self },
        },
      } = await axiosPrivateInstance(session?.data?.jwt).post("/albums", data);

      // show success message
      toast.success("Album added successfully");

      // remove local storage saved tracks data
      localStorage.removeItem("tracks");

      // redirect to another route
      router.push(self);
    } catch (error) {
      console.log(error, "error in add album page");

      // show error message
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (session?.data?.jwt) {
      loadData();
    }
  }, [session]);

  const loadData = async () => {
    const { data } = await getAllArtists(session?.data?.jwt);
    const { data: allLabels } = await getAllLabel({
      token: session?.data?.jwt,
      page: 1,
    });

    // get local storage data
    const savedTracks = JSON.parse(localStorage.getItem("tracks"));

    // update state with track data
    if (savedTracks) {
      setTracks(savedTracks);
      setValue("tracks", savedTracks);
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
        <>
          <Header name="Add Track" />
          <AddTrack onSubmitTrack={onSubmitTrack} setShow={setShow} />
        </>
      ) : (
        <>
          <Header name="Add Album" />
          <main className="px-4 py-3 border-l border-b">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="album">
                <div className="releaseInfo">
                  <h2 className="text-xl">Release Info</h2>

                  <div className="inputs  mt-2 border-2 px-4 py-3 grid grid-cols-12 grid-rows-4 gap-3">
                    <div className="input col-start-1 col-end-13 py-[12px]">
                      <label
                        htmlFor="releaseType"
                        className="cursor-pointer select-none"
                      >
                        Release Type
                      </label>

                      <div className="flex mt-1">
                        <div className="left">
                          <input
                            type="radio"
                            name="releaseType"
                            id="Audio"
                            className="mr-1"
                            value="Audio"
                            {...register("releaseType")}
                            defaultChecked={
                              getValues("releaseType") === "Audio"
                            }
                          />
                          <label
                            htmlFor="Audio"
                            className="cursor-pointer select-none"
                          >
                            Audio
                          </label>
                        </div>

                        <div className="right flex items-center">
                          <input
                            type="radio"
                            name="releaseType"
                            id="Video"
                            className="ml-5 mr-1"
                            value="Video"
                            {...register("releaseType")}
                            defaultChecked={
                              getValues("releaseType") === "Video"
                            }
                          />
                          <label
                            htmlFor="Video"
                            className="cursor-pointer select-none"
                          >
                            Video
                          </label>
                        </div>
                      </div>

                      <p
                        className={`${
                          errors.releaseType?.message ? "block" : "hidden"
                        } text-sm text-red-500 font-semibold mt-1 ml-5`}
                      >
                        {errors.releaseType?.message}
                      </p>
                    </div>

                    <div className="input col-start-1 col-end-13 sm:col-end-7">
                      <label
                        htmlFor="formatType"
                        className="cursor-pointer select-none"
                      >
                        Format Type
                      </label>

                      <select
                        name="formatType"
                        id="formatType"
                        className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                        {...register("formatType")}
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select format type
                        </option>
                        {releaseType === "Audio" && (
                          <>
                            <option value="Single">Single</option>
                            <option value="Album">Album</option>
                            <option value="Compilation">Compilation</option>
                          </>
                        )}

                        {releaseType === "Video" && (
                          <option value="Music Video">Music Video</option>
                        )}
                      </select>

                      {!releaseType && (
                        <p className="text-red-500 text-[12px]">
                          {" "}
                          *** At first select release type
                        </p>
                      )}

                      <p
                        className={`${
                          errors.formatType?.message ? "block" : "hidden"
                        } text-sm text-red-500 font-semibold mt-1 ml-5`}
                      >
                        {errors.formatType?.message}
                      </p>
                    </div>

                    <div className="input col-start-1 col-end-13 sm:col-start-7 sm:col-end-13">
                      <label
                        htmlFor="releaseDate"
                        className="cursor-pointer select-none"
                      >
                        Original Release Date
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
                            dateFormat="dd/MM/yyyy"
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
                        htmlFor="releaseTitle"
                        className="cursor-pointer select-none"
                      >
                        Release Title
                      </label>

                      <input
                        type="text"
                        name="releaseTitle"
                        id="releaseTitle"
                        placeholder="Enter release title"
                        className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                        {...register("releaseTitle")}
                      />

                      <p
                        className={`${
                          errors.releaseTitle?.message ? "block" : "hidden"
                        } text-sm text-red-500 font-semibold mt-1 ml-5`}
                      >
                        {errors.releaseTitle?.message}
                      </p>
                    </div>

                    <div className="input col-start-1 col-end-13 sm:col-start-7 sm:col-end-13">
                      <label
                        htmlFor="releaseVersion"
                        className="cursor-pointer select-none"
                      >
                        Release Version
                      </label>

                      <input
                        type="text"
                        name="releaseVersion"
                        id="releaseVersion"
                        className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                        {...register("releaseVersion")}
                        placeholder="Enter version"
                      />

                      <p
                        className={`${
                          errors.releaseVersion?.message ? "block" : "hidden"
                        } text-sm text-red-500 font-semibold mt-1 ml-5`}
                      >
                        {errors.releaseVersion?.message}
                      </p>
                    </div>

                    <div className="input col-start-1 col-end-13 sm:col-end-7">
                      <label
                        htmlFor="releaseCover"
                        className="cursor-pointer select-none"
                      >
                        Release Cover Image Link
                      </label>

                      <input
                        type="text"
                        name="releaseCover"
                        id="releaseCover"
                        placeholder="Album cover image link"
                        className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                        {...register("releaseCover")}
                      />

                      <p
                        className={`${
                          errors.releaseCover?.message ? "block" : "hidden"
                        } text-sm text-red-500 font-semibold mt-1 ml-5`}
                      >
                        {errors.releaseCover?.message}
                      </p>
                    </div>

                    {/* <div className="right w-1/3 ml-5 rounded">
                      <Image
                        className="float-right"
                        src={UploadImage}
                        alt="Main Image"
                        width={200}
                        height={200}
                      />
                    </div> */}
                  </div>
                </div>

                {/* <div className="extra">
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
                </div> */}

                <div className="releaseArtists mt-8">
                  <h2 className="text-2xl">Release Artists</h2>

                  <div className="input-area border-2 mt-2 grid grid-cols-12 grid-rows-1 gap-3 px-4 py-3">
                    <div className="input col-start-1 col-end-13 sm:col-end-7">
                      <label
                        className="cursor-pointer block select-none"
                        htmlFor="releasePrimaryArtist"
                      >
                        Release Artist (Primary)
                      </label>

                      {fields.map((filed, index) => (
                        <div key={filed.id}>
                          <div className="flex items-center">
                            {index < 1 && (
                              <select
                                name={`releasePrimaryArtist[${index}].name`}
                                id={`releasePrimaryArtist[${index}].name`}
                                className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                                {...register(
                                  `releasePrimaryArtist.${index}.name`
                                )}
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
                                name={`releasePrimaryArtist[${index}].name`}
                                id={`releasePrimaryArtist[${index}].name`}
                                className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                                {...register(
                                  `releasePrimaryArtist.${index}.name`
                                )}
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
                              errors.releasePrimaryArtist &&
                              errors.releasePrimaryArtist[index]?.name
                                ? "block"
                                : "hidden"
                            } text-sm text-red-500 font-semibold mt-1 ml-5 mb-3`}
                          >
                            {errors.releasePrimaryArtist &&
                              errors.releasePrimaryArtist[index]?.name?.message}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="input col-start-1 col-end-13 sm:col-start-7 sm:col-end-13">
                      <label
                        className="cursor-pointer block select-none"
                        htmlFor="releaseSecondaryArtist"
                      >
                        Release Artist (Secondary)
                      </label>

                      {featuringFields.map((filed, index) => (
                        <div key={filed.id}>
                          <div className="flex items-center">
                            {index < 1 && (
                              <select
                                name={`releaseSecondaryArtist[${index}].name`}
                                id={`releaseSecondaryArtist[${index}].name`}
                                className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                                {...register(
                                  `releaseSecondaryArtist.${index}.name`
                                )}
                              >
                                <option value="" disabled>
                                  Select artist
                                </option>
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
                                name={`releaseSecondaryArtist[${index}].name`}
                                id={`releaseSecondaryArtist[${index}].name`}
                                className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                                {...register(
                                  `releaseSecondaryArtist.${index}.name`
                                )}
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
                              errors.releaseSecondaryArtist &&
                              errors.releaseSecondaryArtist[index]?.name
                                ? "block"
                                : "hidden"
                            } text-sm text-red-500 font-semibold mt-1 ml-5 mb-3`}
                          >
                            {errors.releaseSecondaryArtist &&
                              errors.releaseSecondaryArtist[index]?.name
                                ?.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="metadata mt-5">
                  <h2 className="text-2xl">Metadata</h2>

                  <div className="input-area border-2 mt-1 px-4 py-3">
                    <div className="grid grid-cols-12 grid-rows-1 gap-3">
                      <div className="input col-start-1 col-end-13 sm:col-end-7">
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
                          placeholder="Enter album upc"
                        />

                        <p
                          className={`${
                            errors.upcean?.message ? "block" : "hidden"
                          } text-sm text-red-500 font-semibold mt-1 ml-5`}
                        >
                          {errors.upcean?.message}
                        </p>
                      </div>

                      <div className="input col-start-1 col-end-13 sm:col-start-7 sm:col-end-13">
                        <label
                          htmlFor="catalogNumber"
                          className="cursor-pointer select-none"
                        >
                          Catalog Number
                        </label>

                        <input
                          type="text"
                          name="catalogNumber"
                          id="catalogNumber"
                          className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                          {...register("catalogNumber")}
                          placeholder="Enter catalog number"
                        />

                        <p
                          className={`${
                            errors.catalogNumber?.message ? "block" : "hidden"
                          } text-sm text-red-500 font-semibold mt-1 ml-5`}
                        >
                          {errors.catalogNumber?.message}
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
                          defaultValue=""
                        >
                          <option value="" disabled>
                            Select label
                          </option>

                          {labels?.map((label) => (
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
                          htmlFor="releaseLanguage"
                          className="select-none"
                        >
                          Release Language
                        </label>

                        <select
                          name="releaseLanguage"
                          id="releaseLanguage"
                          className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                          {...register("releaseLanguage")}
                          defaultValue=""
                        >
                          <option value="" disabled>
                            Select language
                          </option>
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
                            errors.releaseLanguage?.message ? "block" : "hidden"
                          } text-sm text-red-500 font-semibold mt-1 ml-5`}
                        >
                          {errors.releaseLanguage?.message}
                        </p>
                      </div>

                      <div className="input col-start-1 col-end-13 sm:col-end-7">
                        <label
                          htmlFor="cLineCompany"
                          className="cursor-pointer select-none"
                        >
                          C-Line Company
                        </label>

                        <input
                          type="text"
                          name="cLineCompany"
                          id="cLineCompany"
                          className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                          {...register("cLineCompany")}
                        />

                        <p
                          className={`${
                            errors.cLineCompany?.message ? "block" : "hidden"
                          } text-sm text-red-500 font-semibold mt-1 ml-5`}
                        >
                          {errors.cLineCompany?.message}
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
                          htmlFor="pLineCompany"
                          className="cursor-pointer select-none"
                        >
                          P-Line Company
                        </label>

                        <input
                          type="text"
                          name="pLineCompany"
                          id="pLineCompany"
                          className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                          {...register("pLineCompany")}
                        />

                        <p
                          className={`${
                            errors.pLineCompany?.message ? "block" : "hidden"
                          } text-sm text-red-500 font-semibold mt-1 ml-5`}
                        >
                          {errors.pLineCompany?.message}
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

                      <div className="input col-start-1 col-end-13">
                        <label htmlFor="releaseGenre" className="select-none">
                          Release Genre
                        </label>

                        <div className="genre mt-2">
                          <div className="inputs border border-gray-200 px-2 py-4 flex flex-wrap">
                            {genreFields.map((field, index) => (
                              <div
                                className="input px-3 py-1 w-1/6"
                                key={field.id}
                              >
                                <input
                                  type="checkbox"
                                  name={`releaseGenre[${index}].name`}
                                  id={`releaseGenre[${index}].name`}
                                  {...register(`releaseGenre.${index}.status`)}
                                />
                                <label
                                  htmlFor={`releaseGenre[${index}].name`}
                                  className="ml-1 cursor-pointer select-none"
                                >
                                  {field.name}
                                </label>
                              </div>
                            ))}
                          </div>

                          <p
                            className={`${
                              errors.releaseGenre &&
                              errors.releaseGenre?.root?.message
                                ? "block"
                                : "hidden"
                            } text-sm text-red-500 font-semibold mt-1 ml-5 mb-3`}
                          >
                            {errors.releaseGenre &&
                              errors.releaseGenre?.root?.message}
                          </p>
                        </div>
                      </div>

                      <div className="input col-start-1 col-end-13">
                        <label htmlFor="subgenre" className="select-none">
                          Release Subgenre
                        </label>

                        <div className="genre mt-2">
                          <div className="inputs border border-gray-200 px-2 py-4 flex flex-wrap">
                            {subgenreFields.map((field, index) => (
                              <div
                                className="input px-3 py-1 w-1/6"
                                key={field.id}
                              >
                                <input
                                  type="checkbox"
                                  name={`releaseSubGenre[${index}].name`}
                                  id={`releaseSubGenre[${index}].name`}
                                  {...register(
                                    `releaseSubGenre.${index}.status`
                                  )}
                                />

                                <label
                                  htmlFor={`releaseSubGenre[${index}].name`}
                                  className="ml-1 cursor-pointer select-none"
                                >
                                  {field.name}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="input col-start-1 col-end-13">
                        <label htmlFor="platform" className="select-none">
                          Platform
                        </label>

                        <div className="platform mt-2">
                          <div className="inputs border border-gray-200 px-2 py-4 flex flex-wrap">
                            {platformsFields.map((field, index) => (
                              <div
                                className="input px-3 py-1 w-1/6"
                                key={field.id}
                              >
                                <input
                                  type="checkbox"
                                  name={`platforms[${index}].name`}
                                  id={`platforms[${index}].name`}
                                  {...register(`platforms.${index}.status`)}
                                />
                                <label
                                  htmlFor={`platforms[${index}].name`}
                                  className="ml-1 cursor-pointer select-none"
                                >
                                  {field.name}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="input col-start-1 col-end-13">
                        <label
                          htmlFor="releaseExplicit"
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
                              value={true}
                              {...register("releaseExplicit")}
                              defaultChecked={
                                getValues("releaseExplicit") === true
                              }
                            />
                            <label
                              htmlFor="yes"
                              className="cursor-pointer select-none"
                            >
                              Yes
                            </label>
                          </div>

                          <div className="right flex items-center">
                            <input
                              type="radio"
                              name="releaseExplicit"
                              id="no"
                              className="ml-5 mr-1"
                              value={false}
                              {...register("releaseExplicit")}
                              defaultChecked={
                                getValues("releaseExplicit") === false
                              }
                            />
                            <label
                              htmlFor="no"
                              className="cursor-pointer select-none"
                            >
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
                                trackTitle,
                                trackArtist,
                                isrc,
                                duration,
                              } = track;

                              return (
                                <tr className="even:bg-gray-100" key={index}>
                                  <td className="border p-2">{index + 1}</td>
                                  <td className="border p-2">{trackTitle}</td>
                                  <td className="border p-2">
                                    {trackArtist[0]?.name}
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

export default AddAlbum;
