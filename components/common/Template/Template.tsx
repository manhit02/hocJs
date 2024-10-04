import appSlice from "@/app/appSlice";
import { useAppDispatch } from "@/redux/hooks";
import MessageTemplate from "./MessageTemplate";
import "./style.module.css";
import Image from "next/image";
import { renderImage } from "@/utils/log-helper";
import { useMyReducer } from "@/store/Provider";

const Template = () => {
  // copy phần khai báo này
  const dispatch = useAppDispatch();
  const { updateModalState } = useMyReducer();
  return (
    <>
      <a
        className="custom-poiter text-[#ffeeb7] bg-[#610000] py-2 px-5 rounded"
        onClick={() => {
          // mở popup
          updateModalState(<MessageTemplate message="Demo mở popup" />);
        }}
      >
        Mở popup
      </a>
      <Image
        src={renderImage("/assets/images/btn_clos_demo.png")}
        style={{ cursor: "pointer" }}
        width={78}
        height={65}
        alt=""
      ></Image>
      <div></div>
    </>
  );
};
export default Template;
