import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Book } from "lucide-react";
import BookOverview from "@/components/BookOverview";
import BookList from "@/components/BookList";
import { sampleBooks } from "@/constants";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { books } from "@/database/schema";
import { desc } from "drizzle-orm";
import { late } from "zod";

const Home = async () => {
  const latestBooks = (await db
    .select()
    .from(books)
    .limit(10)
    .orderBy(desc(books.createdAt))) as Book[];

  return (
    <section>
      <BookOverview {...latestBooks[0]} />

      <BookList
        title="Latest Books"
        books={latestBooks.slice(1)}
        containerClassName="mt-28"
      />
    </section>
  );
};

export default Home;
