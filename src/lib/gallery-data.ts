import { cache } from "react";
import fs from "fs/promises";
import path from "path";

type GalleryCategory = {
  slug: string;
  name: string;
  images: Array<{ src: string; alt: string }>;
};

const IMAGE_FILE_PATTERN = /\.(jpg|jpeg|png|webp|avif)$/i;

const formatDisplayName = (slug: string) =>
  slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export const getGalleryData = cache(async (): Promise<GalleryCategory[]> => {
  const galleryPath = path.join(process.cwd(), "public/images/gallery");

  try {
    const folders = await fs.readdir(galleryPath, { withFileTypes: true });

    return await Promise.all(
      folders.filter((dirent) => dirent.isDirectory()).map(async (dirent) => {
        const slug = dirent.name;
        const folderPath = path.join(galleryPath, slug);
        const files = await fs.readdir(folderPath);
        const displayName = formatDisplayName(slug);

        return {
          slug,
          name: displayName,
          images: files
            .filter((fileName) => IMAGE_FILE_PATTERN.test(fileName))
            .map((fileName) => ({
              src: `/images/gallery/${slug}/${fileName}`,
              alt: `Ảnh ${displayName}`,
            })),
        };
      }),
    );
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "ENOENT"
    ) {
      return [];
    }

    console.error("Failed to read gallery:", error);
    return [];
  }
});
