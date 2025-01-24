"use client";
import React from "react";
import { cn } from "@/lib/utils";
import BookCoverSvg from "./BookCoverSvg";
import Image from "next/image";
import config from "@/lib/config";
import { IKImage } from "imagekitio-next";

type BookCoverVariant = "extraSmall" | "small" | "medium" | "regular" | "wide";

const variantStyles: Record<BookCoverVariant, string> = {
  extraSmall: "book-cover_extra_small",
  small: "book-cover_small",
  medium: "book-cover_medium",
  regular: "book-cover_regular",
  wide: "book-cover_wide",
};

interface Props {
  className?: string;
  cover: string;
  color: string;
  variant?: BookCoverVariant;
}

const BookCover = ({
  className,
  cover = "https://m.media-amazon.com/images/I/81J6APjwxlL.jpg",
  color = "#012B48",
  variant = "regular",
}: Props) => {
  console.log("BookCover", cover);
  console.log("BookCover", color);
  return (
    <div
      className={cn(
        "relative transition-all duration-300",
        variantStyles[variant],
        className
      )}
    >
      <BookCoverSvg coverColor={color} />
      <div
        className="absolute z-10"
        style={{ left: "12%", width: "87.5%", height: "88%" }}
      >
        <IKImage
          path={cover}
          urlEndpoint={config.env.imagekit.urlEndpoint}
          alt="Book cover"
          fill
          className="rounded-sm object-fill"
          loading="lazy"
          lqip={{ active: true }}
        />
        {/* <Image
          src={cover}
          alt="book cover"
          fill
          className="rounded-sm object-fill"
        /> */}
      </div>
    </div>
  );
};

export default BookCover;
