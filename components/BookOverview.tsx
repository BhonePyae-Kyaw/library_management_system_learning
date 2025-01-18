import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import BookCover from "./BookCover";

const BookOverview = ({
  title,
  author,
  genre,
  rating,
  total_copies,
  available_copies,
  description,
  color,
  cover,
  video,
  summary,
}: Book) => {
  return (
    <section className="book-overview">
      <div className="flex flex-1 flex-col gap-5">
        <h1>{title}</h1>

        <div className="book-info">
          <p>
            By <span className="font-semibold text-light-200">{author}</span>
          </p>

          <p>
            Genre: <span className="font-semibold text-light-200">{genre}</span>
          </p>
          <div className="flex flex-row gap-1">
            <Image src="/icons/star.svg" width={22} height={22} alt="star" />
            <p className="text-light-200">{rating}</p>
          </div>
          <div>
            <p className="text-light-200">
              Total Copies: <span>{total_copies}</span> |{" "}
              <span>Available Copies: </span>
              {available_copies}
            </p>
          </div>
          <p className="book-description">{description}</p>
        </div>

        <Button className="book-overview_btn">
          <Image src="/icons/book.svg" width={22} height={22} alt="book" />
          BORROW
        </Button>
      </div>
      <div className="relative flex flex-1 justify-center">
        <div className="relative">
          <BookCover
            color={color}
            cover={cover}
            variant="wide"
            className="z-10"
          />
          <div className="absolute left-16 top-10 rotate-12 opacity-40 max-sm:hidden">
            <BookCover variant="wide" cover={cover} color={color} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookOverview;
