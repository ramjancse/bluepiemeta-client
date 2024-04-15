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
import AlbumForm from "@/components/albums/AlbumForm";

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

const AlbumMain = ({ albumData }) => {
  const [show, setShow] = useState(false);
  const [tracks, setTracks] = useState([]);

  const onSubmitTrack = (data) => {
    console.log(data, "track submitted data in album main");

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

      // setValue("tracks", updatedTracks);
      return updatedTracks;
    });
  };

  const onSubmit = async (data) => {
    console.log(data, "album submitted data");
    try {
      // const {
      //   data: {
      //     links: { self },
      //   },
      // } = await axiosPrivateInstance(session?.data?.jwt).post("/albums", data);

      // show success message
      toast.success("Album added successfully");

      // remove local storage saved tracks data
      // localStorage.removeItem("tracks");

      // redirect to another route
      // console.log(self, "self");
      // router.push(self);
    } catch (error) {
      console.log(error, "error in add album page");

      // show error message
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      {albumData ? (
        <>
          <Header name="Edit Album" />
          <AlbumForm />
        </>
      ) : show ? (
        <AddTrack onSubmitTrack={onSubmitTrack} setShow={setShow} />
      ) : (
        <>
          <Header name="Add Album" />
          <AlbumForm
            albumData={albumData}
            setShow={setShow}
            onSubmit={onSubmit}
          />
        </>
      )}
    </>
  );
};

export default AlbumMain;
