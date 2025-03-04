import cloudinary from "@/utils/Cloudnairy";
import { NextRequest, NextResponse } from "next/server";

type FormDataFile = Blob & {
  name?: string;
};
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as FormDataFile | null;
    const pathName = formData.get("pathName") as string;

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ message: "Invalid file" }, { status: 400 });
    }
    // Conver File to format cloudnairy can handle
    const fileBuffer = await file.arrayBuffer();
    const base64File = Buffer.from(fileBuffer).toString("base64");
    // Upload file to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(
      `data:${file.type};base64,${base64File}`,
      { folder: pathName }
    );

    return NextResponse.json(
      { url: uploadResponse.secure_url },
      { status: 200 }
    );
  } catch (error) {
    console.log("Uploading Error");
    return NextResponse.json(
      { message: "Uploading Error " + error },
      { status: 500 }
    );
  }
}
