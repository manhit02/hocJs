"use client";

import { logInfo } from "@/utils/log-helper";
import { useReportWebVitals } from "next/web-vitals";

export function WebVitals() {
  useReportWebVitals((metric) => {
    // logInfo(metric);
    console.log(metric);
    
  });
  return <></>;
}
