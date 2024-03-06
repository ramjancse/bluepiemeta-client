"use client";

import React, { useState } from "react";
import { FaCirclePlus, FaUpload } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "./AddTrack.css";

const schema = yup
  .object({
    trackTitle: yup.string().trim().required("Track title is required"),
    metadataLanguage: yup
      .string()
      .trim()
      .required("Track title language is required")
      .min(2, "Track title language must be at least 2 character"),
    primaryArtists: yup.array().of(
      yup.object({
        name: yup
          .string()
          .trim()
          .required("Primary Artist name is required")
          .min(3, "Primary Artist name must be at least 3 characters"),
      })
    ),
    composers: yup.array().of(
      yup.object({
        name: yup
          .string()
          .trim()
          .required("Composer name is required")
          .min(3, "Composer name must be at least 3 characters"),
      })
    ),
    lyricists: yup.array().of(
      yup.object({
        name: yup
          .string()
          .trim()
          .required("Lyricist name is required")
          .min(3, "Lyricist name must be at least 3 characters"),
      })
    ),
    producers: yup.array().of(
      yup.object({
        name: yup
          .string()
          .trim()
          .required("Producer name is required")
          .min(3, "Producer name must be at least 3 characters"),
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
    audioLanguage: yup
      .string()
      .trim()
      .required("Audio language is required")
      .min(2, "Audio language must be at least 2 character"),
    mood: yup.array().of(
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
    genre: yup.array().of(
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
    mix: yup
      .string()
      .trim()
      .required("Mix is required")
      .min(2, "Mix must be at least 2 character"),
    minute: yup.string().trim().required("Minute is required"),
    second: yup.string().trim().required("Second is required"),
    tags: yup.string().trim().required("Tags is required"),
    releaseDate: yup
      .string()
      .trim()
      .required("Release date is required")
      .min(3, "Release date must be at least 3 character"),
    label: yup
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
    isrc: yup
      .string()
      .trim()
      .required("ISRC is required")
      .min(3, "ISRC must be at least 3 character"),
    lyrics: yup.string().trim().required("Lyrics is required"),
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
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      trackTitle: "This is track title",
      metadataLanguage: "english",
      primaryArtists: [{ name: "Kawsar Ahmed" }],
      composers: [{ name: "Ramjan Ali" }],
      lyricists: [{ name: "Abid Hasan" }],
      producers: [{ name: "Iqbal Hasan" }],
      trackType: "lyrical",
      audioLanguage: "bangla",
      mood: [
        { name: "Sad", status: true },
        { name: "Angry", status: false },
        { name: "Emotional", status: false },
        { name: "Peaceful", status: false },
        { name: "Romantic", status: true },
      ],
      genre: [
        { name: "Indie", status: true },
        { name: "Singer", status: false },
        { name: "Artist", status: false },
        { name: "Lyricist", status: false },
        { name: "Composer", status: false },
        { name: "Producer", status: false },
        { name: "Band", status: false },
        { name: "Group", status: true },
      ],
      mix: "topHitMix",
      minute: "10",
      second: "50",
      tags: "JS, React, Node.js",
      releaseDate: new Date(),
      label: "Blue Pie Records",
      cLine: "cLineText",
      cLineYear: new Date(),
      pLine: "pLineText",
      pLineYear: new Date(),
      isrc: "this is isrc text",
      lyrics: "Lorem Ipsum text",
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "primaryArtists",
    control,
  });

  const {
    fields: composerFields,
    append: composerAppend,
    remove: composerRemove,
  } = useFieldArray({
    name: "composers",
    control,
  });

  const {
    fields: lyricistFields,
    append: lyricistAppend,
    remove: lyricistRemove,
  } = useFieldArray({
    name: "lyricists",
    control,
  });

  const {
    fields: producerFields,
    append: producerAppend,
    remove: producerRemove,
  } = useFieldArray({
    name: "producers",
    control,
  });

  const {
    fields: moodFields,
    append: moodAppend,
    remove: moodRemove,
  } = useFieldArray({
    name: "mood",
    control,
  });

  const {
    fields: genreFields,
    append: genreAppend,
    remove: genreRemove,
  } = useFieldArray({
    name: "genre",
    control,
  });

  const router = useRouter();

  const onSubmit = async (data) => {
    // console.log(data, "track data");

    // submitted data to parent
    onSubmitTrack(data);

    // show album form
    setShow((prevShow) => !prevShow);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="asset">
          <h2 className="text-2xl">Asset</h2>

          <div className="input-area mt-2 px-3 py-2 xs:px-5 xs:py-3 md:px-10 md:py-5 lg:px-14 lg:py-7 xl:py-10 border-2">
            <div className="input flex flex-col">
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
                <span className="text-red-600 font-bold">***</span>Please upload
                audio file in WAV format.
              </p>
            </div>

            <div className="input mt-4">
              <label htmlFor="title" className="cursor-pointer">
                Title
              </label>

              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-3/5 lg:w-4/6 sm:mr-3">
                  <input
                    type="text"
                    name="title"
                    id="title"
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

                <div className="sm:w-2/5 lg:w-2/6">
                  <select
                    name="metadataLanguage"
                    id="metadataLanguage"
                    className="my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm w-full"
                    {...register("metadataLanguage")}
                  >
                    <option value="">Title Language</option>
                    <option value="bangla">Bangla</option>
                    <option value="english">English</option>
                    <option value="hindi">Hindi</option>
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
          </div>
        </div>

        <div className="contributors mt-8">
          <h2 className="text-2xl">Contributors</h2>

          <div className="input-area border-2 mt-2 px-3 py-2 xs:px-5 xs:py-3 md:px-10 md:py-5 lg:px-14 lg:py-7 grid grid-cols-12 grid-rows-1 gap-3">
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
                    <input
                      type="text"
                      name={`primaryArtists[${index}].name`}
                      id={`primaryArtists[${index}].name`}
                      className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                      placeholder="Primary Artist"
                      {...register(`primaryArtists.${index}.name`)}
                    />

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
                      errors.primaryArtists &&
                      errors.primaryArtists[index]?.name
                        ? "block"
                        : "hidden"
                    } text-sm text-red-500 font-semibold mt-1 ml-5 mb-3`}
                  >
                    {errors.primaryArtists &&
                      errors.primaryArtists[index]?.name?.message}
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
                      name={`composers[${index}].name`}
                      id={`composers[${index}].name`}
                      className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                      placeholder="Composer"
                      {...register(`composers.${index}.name`)}
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
                      errors.composers && errors.composers[index]?.name
                        ? "block"
                        : "hidden"
                    } text-sm text-red-500 font-semibold mt-1 ml-5 mb-3`}
                  >
                    {errors.composers && errors.composers[index]?.name?.message}
                  </p>
                </div>
              ))}
            </div>

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
                      name={`lyricists[${index}].name`}
                      id={`lyricists[${index}].name`}
                      className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                      placeholder="Lyricist"
                      {...register(`lyricists.${index}.name`)}
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
                      errors.lyricists && errors.lyricists[index]?.name
                        ? "block"
                        : "hidden"
                    } text-sm text-red-500 font-semibold mt-1 ml-5 mb-3`}
                  >
                    {errors.lyricists && errors.lyricists[index]?.name?.message}
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
                      name={`producers[${index}].name`}
                      id={`producers[${index}].name`}
                      className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                      placeholder="Producer"
                      {...register(`producers.${index}.name`)}
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
                      errors.producers && errors.producers[index]?.name
                        ? "block"
                        : "hidden"
                    } text-sm text-red-500 font-semibold mt-1 ml-5 mb-3`}
                  >
                    {errors.producers && errors.producers[index]?.name?.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="technical mt-5">
          <h2 className="text-2xl">Technical</h2>

          <div className="input-area border-2 mt-1 px-3 py-2 xs:px-5 xs:py-3 md:px-10 md:py-5 lg:px-14 lg:py-7">
            <div className="top mb-4">
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
                      <option value="bangla">Bangla</option>
                      <option value="english">English</option>
                      <option value="hindi">Hindi</option>
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
                    <select
                      name="mix"
                      id="mix"
                      className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                      {...register("mix")}
                    >
                      <option value="">Select Mix</option>
                      <option value="indieRockMix">Indie Rock Mix</option>
                      <option value="topHitMix">Top Hits Mix</option>
                      <option value="chillMix">Chill Mix</option>
                    </select>

                    <p
                      className={`${
                        errors.mix?.message ? "block" : "hidden"
                      } text-sm text-red-500 font-semibold mt-1 ml-5`}
                    >
                      {errors.mix?.message}
                    </p>
                  </div>
                </div>

                <div className="input">
                  <label htmlFor="duration" className="select-none">
                    Duration
                  </label>

                  <div className="flex">
                    <div className="w-1/2">
                      <select
                        name="minute"
                        id="minute"
                        className="my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm w-full"
                        {...register("minute")}
                      >
                        <option value="">Select minute</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                      </select>

                      <p
                        className={`${
                          errors.minute?.message ? "block" : "hidden"
                        } text-sm text-red-500 font-semibold mt-1 ml-5`}
                      >
                        {errors.minute?.message}
                      </p>
                    </div>

                    <div className="w-1/2">
                      <select
                        name="second"
                        id="second"
                        className="my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm w-full ml-3"
                        {...register("second")}
                      >
                        <option value="">Select second</option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                        <option value="23">23</option>
                        <option value="24">24</option>
                        <option value="25">25</option>
                        <option value="26">26</option>
                        <option value="27">27</option>
                        <option value="28">28</option>
                        <option value="29">29</option>
                        <option value="30">30</option>
                        <option value="31">31</option>
                        <option value="32">32</option>
                        <option value="33">33</option>
                        <option value="34">34</option>
                        <option value="35">35</option>
                        <option value="36">36</option>
                        <option value="37">37</option>
                        <option value="38">38</option>
                        <option value="39">39</option>
                        <option value="40">40</option>
                        <option value="41">41</option>
                        <option value="42">42</option>
                        <option value="43">43</option>
                        <option value="44">44</option>
                        <option value="45">45</option>
                        <option value="46">46</option>
                        <option value="47">47</option>
                        <option value="48">48</option>
                        <option value="49">49</option>
                        <option value="50">50</option>
                        <option value="51">51</option>
                        <option value="52">52</option>
                        <option value="53">53</option>
                        <option value="54">54</option>
                        <option value="55">55</option>
                        <option value="56">56</option>
                        <option value="57">57</option>
                        <option value="58">58</option>
                        <option value="59">59</option>
                      </select>

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

                  <div className="">
                    <input
                      type="text"
                      name="tags"
                      id="tags"
                      className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                      {...register("tags")}
                    />

                    <p
                      className={`${
                        errors.tags?.message ? "block" : "hidden"
                      } text-sm text-red-500 font-semibold mt-1 ml-5`}
                    >
                      {errors.tags?.message}
                    </p>
                  </div>
                </div>
              </div>

              <div className="right lg:w-1/2 ml-5">
                <div className="moods">
                  <h4>Moods</h4>
                  <div className="inputs border border-gray-200 px-2 py-2 flex flex-wrap">
                    {/* Here is all mod set */}

                    {moodFields.map((field, index) => (
                      <div className="input px-3 py-1" key={field.id}>
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
                          {field.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="genre mt-5">
                  <h4>Genre</h4>
                  <div className="inputs border border-gray-200 px-2 py-2 flex flex-wrap">
                    {genreFields.map((field, index) => (
                      <div className="input px-3 py-1" key={field.id}>
                        <input
                          type="checkbox"
                          name={`genre[${index}].name`}
                          id={`genre[${index}].name`}
                          {...register(`genre.${index}.status`)}
                        />
                        <label
                          htmlFor={`genre[${index}].name`}
                          className="ml-1 cursor-pointer select-none"
                        >
                          {field.name}
                        </label>
                      </div>
                    ))}
                  </div>
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

          <div className="input-area border-2 mt-1 grid grid-cols-12 grid-rows-2 gap-3 px-3 py-2 xs:px-5 xs:py-3 md:px-10 md:py-5 lg:px-14">
            <div className="input col-start-1 col-end-13 sm:col-end-7">
              <label
                htmlFor="releaseDate"
                className="cursor-pointer select-none"
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
                <option value="Sweet peach Records">Sweet peach Records</option>
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
              <label htmlFor="cLineYear" className="cursor-pointer select-none">
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
              <label htmlFor="pLineYear" className="cursor-pointer select-none">
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
            </div>

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
                ISRC
              </label>

              <input
                type="text"
                name="isrc"
                id="isrc"
                className="w-full my-1 bg-gray-200 outline-none px-2 py-3 border-l-8 border-blue-700 text-sm"
                {...register("isrc")}
              />

              <p
                className={`${
                  errors.isrc?.message ? "block" : "hidden"
                } text-sm text-red-500 font-semibold mt-1 ml-5`}
              >
                {errors.isrc?.message}
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

            <div className="input-area border mt-1 px-3 py-2 xs:px-5 xs:py-3 md:px-10 md:py-5 lg:px-14 lg:py-7">
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

              <div className="compilationRights flex flex-col mt-5 lg:flex-row">
                <button className="border-2 py-1 text-center text-sm my-2 lg:w-[200px]">
                  Compilation Rights
                </button>

                <label
                  className="bg-gray-200 py-[6px] items-center rounded-full cursor-pointer flex justify-center lg:m-auto lg:w-[250px]"
                  htmlFor="compilationRights"
                >
                  <FaUpload className="text-blue-700" />
                  <span className="ml-3 text-sm ">Click to upload</span>
                </label>

                <input
                  className="hidden"
                  type="file"
                  name="compilationRights"
                  id="compilationRights"
                />
              </div>

              <div className="videoRights flex flex-col mt-5 lg:flex-row">
                <button className="border-2 py-1 text-center text-sm my-2 lg:w-[200px]">
                  Video Rights
                </button>

                <label
                  className="bg-gray-200 py-[6px] items-center rounded-full cursor-pointer flex justify-center lg:m-auto lg:w-[250px]"
                  htmlFor="videoRights"
                >
                  <FaUpload className="text-blue-700" />
                  <span className="ml-3 text-sm ">Click to upload</span>
                </label>

                <input
                  className="hidden"
                  type="file"
                  name="videoRights"
                  id="videoRights"
                />
              </div>

              <div className="audioRights flex flex-col mt-5 lg:flex-row">
                <button className="border-2 py-1 text-center text-sm my-2 lg:w-[200px]">
                  Audio Rights
                </button>

                <label
                  className="bg-gray-200 py-[6px] items-center rounded-full cursor-pointer flex justify-center lg:m-auto lg:w-[250px]"
                  htmlFor="audioRights"
                >
                  <FaUpload className="text-blue-700" />
                  <span className="ml-3 text-sm ">Click to upload</span>
                </label>

                <input
                  className="hidden"
                  type="file"
                  name="audioRights"
                  id="audioRights"
                />
              </div>

              <div className="promoRights flex flex-col mt-5 lg:flex-row">
                <button className="border-2 py-1 text-center text-sm my-2 lg:w-[200px]">
                  Promo Rights
                </button>

                <label
                  className="bg-gray-200 py-[6px] items-center rounded-full cursor-pointer flex justify-center lg:m-auto lg:w-[250px]"
                  htmlFor="promoRights"
                >
                  <FaUpload className="text-blue-700" />
                  <span className="ml-3 text-sm ">Click to upload</span>
                </label>

                <input
                  className="hidden"
                  type="file"
                  name="promoRights"
                  id="promoRights"
                />
              </div>
            </div>
          </div>

          <div className="lyrics sm:w-1/2 mt-5 sm:mt-0 sm:ml-5">
            <h2 className="text-2xl">Lyrics</h2>

            <div className="input-area border mt-1 px-3 py-2 xs:px-5 xs:py-3 md:px-10 md:py-5 lg:px-14 lg:py-7 flex flex-col xl:flex-row xl:items-center xl:justify-between">
              <div className="xl:w-2/3">
                <div className="text">
                  <textarea
                    name="lyrics"
                    id="lyrics"
                    cols="30"
                    rows="10"
                    {...register("lyrics")}
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

        <div className="submit mt-7">
          <input
            type="submit"
            value="Add Track"
            className="px-10 py-2 rounded bg-gray-200 uppercase cursor-pointer"
          />
        </div>
      </form>
    </>
  );
};

export default AddTrack;
