import { apiHelper } from "@/services/server-side/api";
import type { Metadata, ResolvingMetadata } from "next";

// export async function generateMetadata(
//   { params, searchParams }: any,
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   const id = params.slug[1];
//   const seoTitle = await ApiServer({
//     func: "any",
//     url: "Event",
//     fromIP: "",
//     data: {},
//   });
//   const data = await seoTitle.res;

//   return {
//     title: data?.ArticleDetail?.MetaTitle || "Bài viết",
//     description: data?.ArticleDetail?.MetaDescription || "Chi tiết bài viết",
//   };
// }
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
