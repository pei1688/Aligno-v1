"use client";

import { unsplash } from "@/lib/unsplash";
import { cn } from "@/lib/utils";
import { Check, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";

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
        <Loader2 className="size-6 animate-spin text-aligno-200" />
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="mb-4 grid grid-cols-3 gap-2">
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
                "group relative aspect-video cursor-pointer rounded-sm bg-muted transition hover:opacity-75",
              )}
            >
              <Input
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
                className="rounded-sm object-cover"
                alt="Unsplash image"
                src={image.urls.thumb}
              />
              {selectedImageId === image.id && (
                <div className="absolute flex size-full items-center justify-center rounded-sm bg-black/30">
                  <Check className="size-6 text-white" />
                </div>
              )}
              <Link
                href={image.links.html}
                target="_blank"
                className="absolute bottom-0 w-full truncate bg-black/50 p-1 text-[10px] text-white opacity-0 hover:underline group-hover:opacity-100"
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
