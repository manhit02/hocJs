import type { Metadata } from "next";
import { Suspense } from "react";
import Loading from "./loading";

// phần này để SEO, title là tiêu đề của trang, sẽ thay đổi khi chuyển page, desc là mô tả của page, nếu desc dài thì sẽ được đánh giá cao hơn
export const metadata: Metadata = {
  title: "About us",
  description:
    "mô tả của page demo mô tả của page demo mô tả của page demo mô tả của page demo mô tả của page demo mô tả của page demo mô tả của page demo",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
