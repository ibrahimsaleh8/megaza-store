"use client";
import { Input } from "@/components/ui/input";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

export default function AddNewImage({
  setNewimg,
  newImages,
  title,
}: {
  setNewimg: Dispatch<SetStateAction<File[] | null>>;
  newImages: File[] | null;
  title: string;
}) {
  const [newImage, setNewImage] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    setNewimg(newImage);

    // Generate object URLs for the new images
    const urls = newImage.map((file) => URL.createObjectURL(file));
    setImageUrls(urls);

    // Cleanup old object URLs when images change
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [newImage, setNewimg]);

  return (
    <>
      {imageUrls.length > 0 && newImages !== null ? (
        imageUrls.map((newImg, i) => (
          <div key={i} className="p-2 w-32 rounded-md bg-white">
            <img
              className="w-28 object-cover object-center"
              src={newImg}
              alt={`Uploaded Image ${i + 1}`}
            />
          </div>
        ))
      ) : (
        <>
          <label
            className="flex flex-col gap-2 items-center justify-center border-dashed border-2 w-26 h-32 cursor-pointer border-soft_border p-2"
            htmlFor="add-image">
            <FaCloudUploadAlt className="w-7 h-7" />
            <p className="text-sm">{title}</p>
          </label>
          <Input
            onChange={(e) => {
              if (e.target.files) {
                setNewImage(Array.from(e.target.files));
              }
            }}
            accept="image/*"
            id="add-image"
            multiple
            type="file"
            className="hidden"
          />
        </>
      )}
    </>
  );
}
