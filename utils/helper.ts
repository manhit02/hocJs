import axios from "axios";

export function toSlug(str: string) {
  // Chuyển hết sang chữ thường
  str = str.toLowerCase();

  // xóa dấu
  str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, "a");
  str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, "e");
  str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, "i");
  str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, "o");
  str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, "u");
  str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, "y");
  str = str.replace(/(đ)/g, "d");

  // Xóa ký tự đặc biệt
  str = str.replace(/([^0-9a-z-\s])/g, "");

  // Xóa khoảng trắng thay bằng ký tự -
  str = str.replace(/(\s+)/g, "-");

  // Xóa ký tự - liên tiếp
  str = str.replace(/-+/g, "-");

  // xóa phần dự - ở đầu
  str = str.replace(/^-+/g, "");

  // xóa phần dư - ở cuối
  str = str.replace(/-+$/g, "");

  // return
  return str;
}

export function onShareFB(url: string, caption: string, cb: () => any) {
  if (
    window.location.hostname.includes("localhost") ||
    window.location.hostname.includes("beta")
  ) {
    cb();
  } else {
    // @ts-ignore
    FB.ui(
      {
        method: "share_open_graph",
        action_type: "og.shares",
        action_properties: JSON.stringify({
          object: {
            "og:url": url,
            "og:title": caption,
            "og:description": caption,
          },
        }),
      },
      function (response: any) {
        if (response && !response.error_message) {
          // Share successful
          cb();
        } else {
          // Share canceled or an error occurred
        }
      }
    );
  }
}

export const upperCaseFirstLetter = (paragraph: string): string => {
  const result = paragraph.split(" ").map((e) => {
    return e.charAt(0).toUpperCase() + e.slice(1);
  });
  return result.join(" ");
};

export const handleDownloadImage = async (imageSrc: string) => {
  axios({
    url: `/api/download-image?url=${imageSrc}`,
    method: "GET",
  }).then((res) => {
    console.log({
      stream: res.data,
    });
    const link = document.createElement("a");
    link.href = `data:image/png;base64,${res.data}`;
    link.download = "image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
};
