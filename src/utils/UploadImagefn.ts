import { MainDomain } from "./mainDomain";

export const UploadImage = async (formData: FormData) => {
  try {
    const res = await fetch(`${MainDomain}/api/upload`, {
      method: "POST",
      body: formData,
    });

    const imgUrl = (await res.json()) as { url: string };
    return imgUrl.url;
  } catch (error) {
    console.log("Error uploading File: ", error);
    return null;
  }
};
