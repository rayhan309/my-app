import ImageKit from "imagekit";

export function isImageKitConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY?.trim() &&
      process.env.IMAGEKIT_PRIVATE_KEY?.trim() &&
      process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT?.trim()
  );
}

function getImageKitClient(): ImageKit {
  const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY?.trim();
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY?.trim();
  const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT?.trim();

  if (!publicKey || !privateKey || !urlEndpoint) {
    throw new Error("ImageKit is not configured.");
  }

  return new ImageKit({ publicKey, privateKey, urlEndpoint });
}

export async function uploadProjectImage(
  file: Buffer,
  fileName: string
): Promise<string> {
  const client = getImageKitClient();
  const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, "_");

  const result = await client.upload({
    file,
    fileName: safeName,
    folder: "/portfolio-projects",
    useUniqueFileName: true,
  });

  if (!result.url) {
    throw new Error("ImageKit upload did not return a URL.");
  }

  return result.url;
}
