const cloudinaryImageLoader = ({ src, width, quality }: any) => {
  let res = "";
  if (
    !process.env.NEXT_PUBLIC_BASE_MEDIA ||
    process.env.NEXT_PUBLIC_BASE_MEDIA == undefined
  ) {
    res = `${src}`;
  } else if (
    src.includes("vtcgame") ||
    src.includes("vtc") ||
    src.includes("https://hotro-media.vtcgame.vn/aupc-couple/2024")
  ) {
    res = `${src}`;
  } else if (src.includes("media")) {
    res = `${
      process.env.NEXT_PUBLIC_BASE_PATH
    }/_next/image?url=${src}&w=${width}&q=${quality || 75}`;
  } else {
    res = `${process.env.NEXT_PUBLIC_BASE_PATH}/_next/image?url=${
      process.env.NEXT_PUBLIC_BASE_MEDIA
    }${src}&w=${width}&q=${quality || 75}`;
  }

  return res;
};

export default cloudinaryImageLoader;
