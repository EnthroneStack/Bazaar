import imagekit from "@/configs/imageKit";

export async function deleteImagesFromImageKit(urls: string[]) {
  if (!urls || urls.length === 0) return;

  await Promise.allSettled(
    urls.map(async (url) => {
      try {
        const fileId = url.split("/").pop()?.split(".")[0];
        if (!fileId) return;
        await imagekit.files.delete(fileId);
      } catch {}
    }),
  );
}
