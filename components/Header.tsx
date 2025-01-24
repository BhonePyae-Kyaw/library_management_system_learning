"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Session } from "next-auth";
import { getInitials } from "@/lib/utils";
const Header = ({ session }: { session: Session }) => {
  const pathname = usePathname();

  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/">
        <Image src="/icons/logo.svg" width={40} height={40} alt="logo" />
      </Link>
      <ul className="flex flex-row items-center gap-8">
        <li>
          <Link
            href="/"
            className={cn(
              "text-base cursor-pointer capitalize",
              pathname === "/" ? "text-light-200" : "text-light-100"
            )}
          >
            Library
          </Link>
        </li>
        {/* <li>
          <Link
            href="/book"
            className={cn(
              "text-base cursor-pointer capitalize",
              pathname === "/book" ? "text-light-200" : "text-light-100"
            )}
          >
            Book
          </Link>
        </li> */}
        <li>
          <Link
            href="/profile"
            className={cn(
              "text-base cursor-pointer capitalize",
              pathname === "/profile" ? "text-light-200" : "text-light-100"
            )}
          >
            <Avatar>
              <AvatarFallback className="text-white bg-slate-600">
                {getInitials(session?.user?.name || "")}
              </AvatarFallback>
            </Avatar>
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
