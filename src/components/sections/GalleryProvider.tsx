import GalleryTeaserSection from "./GalleryTeaserSection";
import { getGalleryData } from "@/lib/gallery-data";

export default async function GalleryProvider() {
  const categories = await getGalleryData();
  return <GalleryTeaserSection categories={categories} />;
}
