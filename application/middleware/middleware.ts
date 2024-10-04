import { NextRequest, NextResponse, userAgent } from "next/server";
import { logInfo } from "@/utils/log-helper";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const agent = userAgent(request);
  logInfo("Tai Game", { url, request }, { agent });
  const device = agent.os.name?.split(" ").join("-") || "";
  if (device) {
    if (device.includes("iOS")) {
      return NextResponse.rewrite(
        new URL(
          `https://apps.apple.com/vn/app/ufc-si%C3%AAu-sao-b%C3%B3ng-%C4%91%C3%A1/id1572417749?l=vi`,
          request.url
        )
      );
    }
    return NextResponse.rewrite(
      new URL(
        `https://play.google.com/store/apps/details?id=ufc.sieusaobongda.bongda.sieusao.fifa.game.thethao.online.vtc.game`,
        request.url
      )
    );
  }
}
export const config = {
  matcher: "/tai-game",
};
