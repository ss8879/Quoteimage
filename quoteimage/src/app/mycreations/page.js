"use client";
import { createElement, useEffect, useState } from "react";
import Link from "next/link";
import User from "../services/operations/user";
import { useSelector } from "react-redux";
import Image from "next/image";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";
import styles from "./mycreations.module.css";
export default function Mycreations() {
  const { email, token } = useSelector((state) => state.User);
  const { getcreations_op } = User();
  const [creations, setcreations] = useState([]);
  async function callapi() {
    const arr = await getcreations_op(email, token);
    console.log("array response", arr);
    setcreations(arr.data.images);
  }
  async function handleclick(url, name) {
    const imageblob = await fetch(url)
      .then((res) => res.arrayBuffer())
      .then((buffer) => new Blob([buffer], { type: "image/jpeg" }));
    const link = document.createElement("a");
    link.href = URL.createObjectURL(imageblob);
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  useEffect(() => {
    callapi();
  }, [email,token]);
  return (
    <div className={styles.cardcontainer}>
      {creations?.map((o) => {
        console.log("o value :", o.imageid);
        return (
          <div key={o._id} className={styles.container} >
            <div className={styles.card}>
              <Image src={o.url} fill />
            </div>
            <div className={styles.icardcontainer}>
            <Link href={`/mycreations/${o.imageid}`}><FaExternalLinkAlt /></Link>
            <button onClick={() => handleclick(o.url, o.imgname)}>
            <FaDownload />
            </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
