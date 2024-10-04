import Header from "@/components/header/page";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/footer/page";
import { Providers } from "@/redux/provider";
// import { requireAuth } from "@/services/server-side/authen";
// import { GoogleTagManager  } from '@next/third-parties/google'
// import Script from "next/script";
import { WebVitals } from "@/components/web-vitals/webVitals";
import NextTopLoader from "nextjs-toploader";
import Provider from "@/store/Provider";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "TikTok",
  description: "TikTok",
};

export default async function asyncRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let token = undefined;
  // token = await requireAuth();
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <Providers>
            <WebVitals />
            <NextTopLoader color="#fc0505" />
            <Header token={token} />
            {children}
            <Footer />
          </Providers>
        </Provider>
      </body>
      {/* <Script id="js-jquery" async src={"/js/jquery-1.9.1.min.js"} />
      <Script
        id="header-login"
        async
        src="https://header.vtcgame.vn/headerJS/headjs.js?vs=13062023"
      />
      <Script
        id="body-login"
        async
        src="https://header.vtcgame.vn/headerJS/BodyCall.js?vs=20161227"
      /> */}

      {/* Sử dụng Google Analyst */}
      {/* <Script
        id="google-analyst"
        strategy="afterInteractive"
        defer
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-87CBSV8BCZ');
            `,
        }}
      /> */}
      {/* Sử dụng google tag manager */}
      {/* <GoogleTagManager gtmId="GTM-XYZ" /> */}
    </html>
  );
}
