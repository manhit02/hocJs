import crypto from "crypto";
import moment from "moment";
export const imageSignHelper = ({
  time,
  makerCode,
  startTime,
  endTime,
}: {
  time: number;
  makerCode: string;
  startTime: number;
  endTime: number;
}) => {
  return crypto
    .createHash("sha256")
    .update(
      `${time}${makerCode}${startTime}${endTime}${
        process.env.NEXT_PUBLIC_BACKEND_KEYSIGN || ""
      }`
    )
    .digest("hex");
};
export const basicSignHelper = () => {
  return crypto
    .createHash("sha256")
    .update(`${moment().utc().unix}vtcintecom}`)
    .digest("hex");
};
