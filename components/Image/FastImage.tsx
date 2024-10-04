"use client";
import { ImageProps } from "next/image";
import React from "react";
import Image from "next/image";
interface ImagePropsCustom extends ImageProps {}
const FastImage = (props: ImagePropsCustom) => {
  return (
    <Image
      {...props}
      alt={props.alt}
      loader={({ src, width: w, quality }) => {
        const q = quality || 75;
        return `${process.env.NEXT_PUBLIC_BASE_PATH}/api/fast-image?url=${src}&w=${w}&q=${q}`;
      }}
    />
  );
};
export default FastImage;
