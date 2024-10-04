import { useMyReducer } from "@/store/Provider";
import { renderImage, renderUrlImage } from "@/utils/log-helper";
import Link from "next/link";
import { Mulish } from "next/font/google";
import appSlice from "@/app/appSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
interface P {
  message: string;
}
const mulish = Mulish({
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});
const schema = yup.object({
  firstName: yup.string().required(),
  phone: yup.number().required(),
  numberid: yup.number(),
});

// 1 popup demo
const MessageTemplate = (props: P) => {
  const { message } = props;
  // khai báo các thành phần để điều khiển popup
  const dispatch = useAppDispatch();
  const { updateModalState } = useMyReducer();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = (data: any) => console.log(data);
  return (
    // w-63-ctp h-97-ctp
    <div className="bg-black bg-opacity-50 fixed inset-0 z-20 w-full h-full flex items-center justify-center">
      <div
        className={`relative lg:p-10 p-4 bg-background-demo bg-contain w-[640px] bg-no-repeat bg-center lg:h-[410px]`}
        // bấm vào popup ko tự tắt
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button
          className="absolute right-0 lg:-top-20 -top-14"
          //action khi tắt popup
          onClick={() => {
            updateModalState(<></>);
          }}
        >
          <Image
            src={"/assets/images/btn_clos_demo.png"}
            style={{ cursor: "pointer" }}
            width={78}
            height={65}
            alt=""
          />
        </button>
        <h4 className="uppercase text-[#610000] pt-4 pb-4 text-center block lg:text-3xl text-xl">
          thông báo
        </h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h4 className="uppercase text-[#610000] pt-4 pb-4 text-center block lg:text-3xl text-xl">
            xác thực thông tin nhận quà
          </h4>
          <div className="flex flex-col lg:flex-row md:flex-row items-center mb-3 justify-start lg:justify-center md:justify-center">
            <span className="w-full max-w-full md:max-w-[140px] lg:max-w-[140px] text-lg text-[#863200] mr-0 md:mr-3 lg:mr-4 text-left">
              Họ và tên:
            </span>
            <div className="w-full max-w-full md:max-w-[290px] lg:max-w-[390px]">
              <input
                className={`${mulish.className} w-full px-4 rounded-md h-8 box-border outline-none placeholder:italic placeholder:text-slate-400 text-[#863200]`}
                type="text"
                placeholder="Nhập họ tên đầy đủ"
                {...register("firstName")}
              />
              <p>{errors.firstName?.message}</p>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row md:flex-row items-center mb-3 justify-start lg:justify-center md:justify-center">
            <span className="w-full max-w-full md:max-w-[140px] lg:max-w-[140px] text-lg text-[#863200] mr-0 md:mr-3 lg:mr-4 text-left">
              Số điện thoại:
            </span>
            <div className="w-full max-w-full md:max-w-[290px] lg:max-w-[390px]">
              <input
                className={`${mulish.className} w-full px-4 rounded-md h-8 box-border outline-none placeholder:italic placeholder:text-slate-400 text-[#863200]`}
                type="text"
                placeholder="Nhập số điện thoại"
                {...register("phone")}
              />
              <p>{errors.phone?.message}</p>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row md:flex-row items-center mb-3 justify-start lg:justify-center md:justify-center">
            <span className="w-full max-w-full md:max-w-[140px] lg:max-w-[140px] text-lg text-[#863200] mr-0 md:mr-3 lg:mr-4 text-left">
              Số CMT/CCCD:
            </span>
            <div className="w-full max-w-full md:max-w-[290px] lg:max-w-[390px]">
              <input
                className={`${mulish.className} w-full px-4 rounded-md h-8 box-border outline-none placeholder:italic placeholder:text-slate-400 text-[#863200]`}
                type="text"
                placeholder="Nhập số CMT/CCCD"
                {...register("numberid")}
              />
            </div>
          </div>
          <input type="submit" />
        </form>
        <p className="p-5 text-center lg:text-lg text-base w-[80%] m-auto md:w-1/2 xl:w-full">
          {message}
        </p>
      </div>
    </div>
  );
};

export default MessageTemplate;
