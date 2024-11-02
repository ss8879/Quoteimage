"use client";
import { useState } from "react";
export default function Mainapi() {
  const [tag, settag] = useState({
    quote: "",
    image: "",
    imageurl: "",
    quotedata: "",
    cquote: true,
    cimage: true,
    first: true,
  });
  async function handleonclick() {
    console.log("clicked on get", tag);
    const unsplashurl = `https://api.unsplash.com/photos/random?query=${tag.image}&client_id=YJb468IsjXY8SX68UgsWQ1nforMXJJARP1g2_rIvlS8`;
    const quoteurl = `https://api.api-ninjas.com/v1/quotes?category=${tag.quote}`;
    if (tag.cimage && !tag.cquote) {
      var res = await fetch(unsplashurl);
      res = await res.json();

      settag((p) => ({ ...p, imageurl: res.urls.regular }));
    } else if (!tag.cimage && tag.cquote) {
      var res2 = await fetch(quoteurl, {
        headers: { "X-Api-Key": "OJmruAEAuoT2ZC3Oak0N8Q==Z2E21DEPyAaZzed8" },
      });
      res2 = await res2.json();

      settag((p) => ({ ...p, quotedata: res2 }));
    } else {
      var res = await fetch(unsplashurl);
      res = await res.json();
      var res2 = await fetch(quoteurl, {
        headers: { "X-Api-Key": "OJmruAEAuoT2ZC3Oak0N8Q==Z2E21DEPyAaZzed8" },
      });
      res2 = await res2.json();

      settag((p) => ({ ...p, imageurl: res.urls.regular, quotedata: res2 }));
    }
  }
  return { tag, settag, handleonclick };
}
