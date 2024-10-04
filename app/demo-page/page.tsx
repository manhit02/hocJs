"use client";
import { Each } from "@/components/elements/Each";
import { getLocation } from "@/services/client-side/services-api/service-api";
import { CityShort } from "@/types/apiTypes";
import { logInfo } from "@/utils/log-helper";
import Link from "next/link";
import { useEffect, useState } from "react";

const DemoPage = () => {
  const [cityList, setCityList] = useState<CityShort[]>();
  useEffect(() => {
    getLocation().then((res) => {
      logInfo("DemoPage", {}, { res: res.data.data.list });
      if (res.data.code > 0 && res.data.data && res.data.data.list) {
        setCityList(res.data.data.list);
      }
    });
  }, []);
  return (
    <div className="text-black">
      <div className="flex flex-col p-5">
        <h3>Demo Page</h3>
      </div>
      <div className="flex flex-col p-5">
        {
          cityList && <Each of={cityList} render={(e, i) =>
            <Link
              className="m-5 bg-slate-500 text-white"
              key={i}
              href={`/demo-page/${e.LocationID}`}
            >
              {e.LocationName}
            </Link>
          } />
        }
      </div>
    </div>
  );
};

export default DemoPage;
