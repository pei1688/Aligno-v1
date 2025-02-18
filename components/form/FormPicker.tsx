"use client";

import { unsplash } from "@/lib/unsplash";
import { cn } from "@/lib/utils";
import { Check, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface FormPickerProps {
  id: string;
  isPending: boolean;
  images: Array<Record<string, any>>;
  setImages: React.Dispatch<React.SetStateAction<Array<Record<string, any>>>>;
  register: any;
  setValue: any;
}

const FormPicker = ({
  id,
  isPending,
  images,
  setImages,
  register,
  setValue,
}: FormPickerProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const result = await unsplash.photos.getRandom({
          collectionIds: ["317099"],
          count: 9,
        });
        if (result && result.response) {
          const newImgs = result.response as Array<Record<string, any>>;
          setImages(newImgs);
        }
      } catch (error) {
        console.log(error);
        setImages([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImage();
  }, [setImages]);

  if (isLoading) {
    return (
      <div className="flex justify-center p-6">
        <Loader2 className="animate-spin size-6 text-aligno-200" />
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-2 mb-4">
        {images.map((image) => {
          const imageValue = `${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`;

          return (
            <div
              key={image.id}
              onClick={() => {
                if (isPending) return;
                setSelectedImageId(image.id);
                setValue("image", imageValue); // 手動設置表單值
              }}
              className={cn(
                "cursor-pointer rounded-sm aspect-video relative hover:opacity-75 transition bg-muted group"
              )}
            >
              <input
                type="radio"
                id={id}
                name={id}
                className="hidden"
                disabled={isPending}
                readOnly
                required
                value={imageValue}
                {...register("image")}
              />
              <Image
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover rounded-sm"
                alt="Unsplash image"
                src={image.urls.thumb}
              />
              {selectedImageId === image.id && (
                <div className="absolute size-full bg-black/30 flex items-center justify-center rounded-sm">
                  <Check className="size-6 text-white" />
                </div>
              )}
              <Link
                href={image.links.html}
                target="_blank"
                className="opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white p-1 bg-black/50 hover:underline"
              >
                {image.user.name}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FormPicker;
