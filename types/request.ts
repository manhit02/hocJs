import moment from "moment";
import crypto from "crypto";

export class RequestBackend {
  time: number;
  sign: string;
  makerCode: string;
  func: string;
  fromIP: string;
  data: Object;

  constructor(
    { time, fromIP, sign, makerCode, func, data } = {
      time: 0,
      fromIP: "",
      sign: "",
      makerCode: "",
      func: "",
      data: {},
    }
  ) {
    this.time = time;
    this.fromIP = fromIP;
    this.sign = crypto
      .createHash("sha256")
      .update(
        `${time}${makerCode}${func}${
          process.env.NEXT_PUBLIC_BACKEND_KEYSIGN || ""
        }`
      )
      .digest("hex");
    this.makerCode = makerCode;
    this.func = func;
    this.data = data;
  }
}
export class ServerRequestBackend {
  time: number;
  sign: string;
  makerCode: string;
  func: string;
  data: Object;
  fromIP: string;

  constructor(
    { time, fromIP, sign, makerCode, func, data } = {
      time: 0,
      fromIP: "",
      sign: "",
      makerCode: "",
      func: "",
      data: {},
    }
  ) {
    this.time = time;
    this.fromIP = fromIP;
    this.sign = sign;
    this.makerCode = makerCode;
    this.func = func;
    this.data = data;
  }
}

export interface ServerPropsParamRequest {
  url: string;
  func: string;
  data: any;
  fromIP?: string;
}
