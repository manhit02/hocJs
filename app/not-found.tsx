import { renderUrlImage } from "@/utils/log-helper";
import Link from "next/link";

export default function NotFound() {
  return (
    <body
      className="error"
      style={{
        background: `${renderUrlImage(
          "/assets/images/bg-404.jpg"
        )} 0/100% no-repeat`,
      }}
    >
      <div className="wrapper-error">
        <div className="error-text">
          <span
            className="text"
            style={{
              background: `${renderUrlImage(
                "/assets/images/text-404.png"
              )} 0/100% no-repeat`,
            }}
          ></span>
          <Link href="/" className="btn-back">
            Trang chủ
          </Link>
        </div>
        <span
          className="error-img"
          style={{
            background: `${renderUrlImage(
              "/assets/images/img-404.png"
            )} 0/100% no-repeat`,
          }}
        ></span>
      </div>
    </body>
  );
}
