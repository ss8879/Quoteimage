"use client";
import { useEffect, useRef } from "react";
export default function Imagep(tag) {
  const canvasref = useRef(null);
  const imageref = useRef(null);
  const getAverageColor = (imageData) => {
    let r = 0,
      g = 0,
      b = 0;
    for (let i = 0; i < imageData.data.length; i += 4) {
      r += imageData.data[i];
      g += imageData.data[i + 1];
      b += imageData.data[i + 2];
    }
    const totalPixels = imageData.width * imageData.height;
    return {
      r: r / totalPixels,
      g: g / totalPixels,
      b: b / totalPixels,
    };
  };

  // Function to determine if a color is light or dark
  const isLightColor = ({ r, g, b }) => {
    // Calculate the perceived brightness using the luminance formula
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    if (brightness > 128) {
      console.log("brightness is:", brightness);
      return true;
    } else {
      console.log("brightness is:", brightness);
      return false;
    }
  };
  useEffect(() => {
    const pixelRatio = window.devicePixelRatio || 1;
    var image = imageref.current;
    var canvas = canvasref.current;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth * pixelRatio;
    canvas.height = canvas.offsetHeight * pixelRatio;
    canvas.style.width = "900" + "px";
    canvas.style.height = "600" + "px";
    ctx.scale(pixelRatio, pixelRatio);
    image.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, 0, 0, image.width, image.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const averageColor = getAverageColor(imageData);
      var istrue = isLightColor(averageColor);
      // Set text color based on the average color
      ctx.fillStyle = istrue ? "black" : "white";
      ctx.font = "40px serif";
      ctx.textAlign = "center"; // Align text at the center horizontally
      var data = tag.quotedata[0]?.quote;
      var arr = data?.split(" ");
      var str = "";
      var farr = [];
      for (var i = 0; i < arr?.length; i++) {
        if (str?.length < 30) {
          str += arr[i];
          str += " ";
        } else {
          farr.push(str);
          str = arr[i];
          str += " ";
        }
      }
      farr.push(str);
      console.log("modified array is:", farr);
      let x = canvas.width / 2 - 200; // Center horizontally
      let y = canvas.height / 2 - 220;
      for (let i = 0; i < farr.length; i++) {
        ctx.fillText(farr[i], x, y);
        y += 50;
      }
    };
    if (image.complete) image.onload();
  }, [tag]);

  function download() {
    var canvas = document.getElementById("canvas");
    var url = canvas.toDataURL("image/png");
    var link = document.createElement("a");
    link.download = "filename.png";
    link.href = url;
    link.click();
  }
  return { download, canvasref, imageref };
}
