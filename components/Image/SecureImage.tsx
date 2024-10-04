'use client';
import { ImageProps } from 'next/image';
import React from 'react';
import Image from 'next/image';
import moment from 'moment-timezone';
import { imageSignHelper } from '@/security/sign-helper';
interface ImagePropsCustom extends ImageProps {
  startTime: number;
  endTime: number;
}
const SecureImage = (props: ImagePropsCustom) => {
  const time = moment().tz('Asia/Bangkok').unix();
  const makerCode = process.env.NEXT_PUBLIC_MAKER_CODE ?? '';
  return (
    <Image
      {...props}
      alt={props.alt}
      loader={({ src, width: w, quality }) => {
        const q = quality || 75;
        return `${process.env.NEXT_PUBLIC_BASE_PATH}/api/secure-image?url=${src}&startTime=${
          props.startTime
        }&endTime=${props.endTime}&time=${time}&sign=${imageSignHelper({
          time,
          makerCode,
          startTime: props.startTime,
          endTime: props.endTime,
        })}&w=${w}&q=${q}`;
      }}
    />
  );
};
export default SecureImage;
