import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Book } from "lucide-react";
import BookOverview from "@/components/BookOverview";
import BookList from "@/components/BookList";

export default function Home() {
  const book: Book = {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    genre: "Fantasy / Fiction",
    rating: 4.6,
    total_copies: 20,
    available_copies: 10,
    description:
      "A dazzling novel about all the choices that go into a life well lived, The Midnight Library tells the story of Nora Seed as she finds herself between life and death.",
    color: "#1c1f40",
    cover: "https://m.media-amazon.com/images/I/81J6APjwxlL.jpg",
    video: "/sample-video.mp4?updatedAt=1722593504152",
    summary:
      "A dazzling novel about all the choices that go into a life well lived, The Midnight Library tells the story of Nora Seed as she finds herself between life and death. A dazzling novel about all the choices that go into a life well lived, The Midnight Library tells the story of Nora Seed as she finds herself between life and death.",
  };
  return (
    <section>
      <BookOverview
        id={book.id}
        title={book.title}
        author={book.author}
        genre={book.genre}
        rating={book.rating}
        total_copies={book.total_copies}
        available_copies={book.available_copies}
        description={book.description}
        color={book.color}
        cover={book.cover}
        video={book.video}
        summary={book.summary}
      />
      <BookList />
      <Button> Click me !</Button>;
    </section>
  );
}
