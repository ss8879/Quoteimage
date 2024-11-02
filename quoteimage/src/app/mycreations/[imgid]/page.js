"use client";
import Image from "next/image";
import styles from "./imgid.module.css";
import { IoIosLink } from "react-icons/io";
import { BsTwitterX } from "react-icons/bs";
import { useEffect, useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import User from "@/app/services/operations/user";
import { useSelector } from "react-redux";
export default function Page({ params }) {
  const [img, setimg] = useState();
  const [verificationurl, setverificationurl] = useState(
    "click on the above x icon first"
  );
  const [finalstep, setfinalstep] = useState("Complete Step 1 to unlock the link");
  const { token, email } = useSelector((state) => state.User);
  const { getcreationbyid_op, uploadfiletotwittercloud_op, tweet } = User();
  async function callapi() {
    console.log("params are:",params)
    const res = await getcreationbyid_op(token, params.imgid);
    console.log("response object is:", res);
    setimg(res.data.image);
  }
  useEffect(() => {
    callapi();
  }, []);
  async function tweetc() {
    console.log("email is", email);
    const res = await tweet(email);
    setfinalstep(res.data.clickonme);
    console.log("tweet resonse is:", res);
  }
  async function handleclick(url) {
    const imageblob = await fetch(url)
      .then((res) => res.arrayBuffer())
      .then((buffer) => new Blob([buffer], { type: "image/jpeg" }));
    const res = await uploadfiletotwittercloud_op(imageblob, email);
    console.log("response data:", res);
    setverificationurl(res.data.url.url);
  }
  console.log("params:", params);
  return (
    <div className={styles.container}>
      <div className={styles.heading}>Tweet On X?</div>
      {img ? <Image src={img.url} width={500} height={500} /> : null}
      <div className={styles.xcontainer} onClick={() => handleclick(img.url)}>
        {/* <BsTwitterX style={{ width: "40px", height: "40px" }} /> */}
        <MdOutlineFileUpload style={{
          width:"30px",
          height:"30px"
        }}/>
        <div>upload files to twitter server</div>
      </div>
      <div className={styles.pblock}>
        <div className={styles.heading}>Step 1:</div>
        <div className={styles.linkstyle}>
          <div>
            <IoIosLink />
          </div>
          <a href={verificationurl} target="_blank">
            {verificationurl}
          </a>
        </div>
        <div 
          className={styles.tcontainer}
          onClick={() => {
            tweetc();
          }}
        >
          <Image src="/tweetlogo.png" width={30} height={30} />
          <div>tweet on x</div>
        </div>
        <div className={styles.heading}>Step 2:</div>
        <div className={styles.linkstyle} >
          <div>
            <IoIosLink />
          </div>
          <a href={finalstep} target="_blank">
            {finalstep}
          </a>
        </div>
      </div>
    </div>
  );
}
