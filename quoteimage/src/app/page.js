"use client";
import { tags } from "./constants/selectarray";
import NeubrutalismButton from "./components/button/button";
import Mainapi from "./components/apicomponent/mainapi";
import { domToPng } from "modern-screenshot";
import { useRef } from "react";
import Radiocomp from "./components/radiocomp";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
import style from "./page.module.css";
import download from "downloadjs";
import ShineButton from "./components/button/button.js";
import User from "@/app/services/operations/user";
export default function Home() {
  const divRef = useRef(null);
  const { uploadtocloud } = User();
  const { email } = useSelector((state) => state.User);
  const router = useRouter();
  const [init, setinit] = useState(0);
  const { token } = useSelector((state) => state.User);
  const { tag, settag, handleonclick } = Mainapi();
  const [imagename, setimagename] = useState("");

  async function handleDownloadImage() {
    if (divRef.current === null) {
      return;
    }
    console.log("state value:", divRef.current);
    toPng(divRef.current);
    domToPng(divRef.current)
      .then((dataUrl) => {
        download(dataUrl, "div-image.png");
      })
      .catch((err) => {
        console.error("Failed to convert div to image:", err);
      });
  }
  const dataURLToBlob = (dataURL) => {
    const [header, base64] = dataURL.split(",");
    const byteString = atob(base64);
    const mimeString = header.split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
  };

  async function handleonsubmit(e) {
    e.preventDefault();
    domToPng(divRef.current)
      .then((dataUrl) => {
        let imageBlob = dataURLToBlob(dataUrl);
        uploadtocloud(imageBlob, imagename, email);
      })
      .catch((err) => {
        console.error("Failed to convert div to image:", err);
      });
  }
  function onchange(e) {
    settag((p) => ({ ...p, [e.target.name]: e.target.value }));
  }
  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token]);
  console.log("tag value:", tag);
  return (
    <>
      <div className="maincontainer">
        <div className="container">
          <div>
            <div className="heading">Quote Type</div>
            <div>
              <select name="quote" onChange={onchange} className="inputs">
                {tags.map((val) => {
                  return (
                    <option key={Math.random()} value={val}>
                      {val}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div>
            <div className="heading">Image Tag</div>
            <div>
              <input
                type="text"
                name="image"
                value={tag.image}
                onChange={onchange}
                style={{ textAlign: "left" }}
                className="inputs"
              />
            </div>
          </div>
        </div>
        <Radiocomp tag={tag} settag={settag} />
        <div>
          {/* <button onClick={handleonclick} className="btn">
            Get
          </button> */}
          <div onClick={handleonclick}>
            <NeubrutalismButton value="Get" />
          </div>
        </div>
        {tag.imageurl ? (
          <div className={style.imagecontainer} ref={divRef}>
            <Image
              src={tag.imageurl}
              layout="fill"
              objectFit="contain"
              alt="please click on get to start"
            />
            <div className={style.imageinnercontainer}>
              <div className="montserrat">{tag?.quotedata[0]?.quote}</div>
            </div>
          </div>
        ) : (
          <div style={{ color: "white" }}>click on get to start</div>
        )}
        <button
          onClick={() => handleDownloadImage()}
          style={{ backgroundColor: "white" }}
        >
          Download as Image
        </button>
        {/* <Imagecomponent tag={tag} init={init} setinit={setinit} /> */}
        <form
          onSubmit={handleonsubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ color: "white" }}>Upload To My Creations</div>
          <input
            type="text"
            onChange={(e) => setimagename(e.target.value)}
            value={imagename}
          />
          <ShineButton value="Upload" />
        </form>
      </div>
    </>
  );
}
