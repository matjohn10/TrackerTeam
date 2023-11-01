import WidthWrapper from "@/components/WidthWrapper";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookOpenCheck } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <WidthWrapper className="flex flex-col items-center mb-10 mt-15 md:mt-19 lg:mt-22">
      <div className="p-5 md:p-8 lg:p-10 mt-5">
        <h1 className="text-6xl">
          Tracker<span className="text-[#ff5416]">Team</span>
        </h1>
      </div>
      <div className="flex flex-col gap-1 mt-1 text-2xl text-center">
        <p>
          <strong>Effortless</strong>&nbsp;Collaboration,
        </p>
        <p>
          Seamless&nbsp; <strong>Progress!</strong>
        </p>
      </div>
      <div className="flex p-2 justify-center items-center w-4/12 mt-20">
        <Button
          asChild
          variant="default"
          className="p-3 text-lg min-w-min lg:p-3 lg:px-6"
        >
          <Link href="/api/auth/register">
            Start Now <BookOpenCheck className="ml-3 text-gray-100 h-5 w-5" />
          </Link>
        </Button>
      </div>
      <div className="flex flex-col p-10 text-center text-lg mt-10">
        <p>Plan with your team and we deliver</p>{" "}
        <p>
          real time updates using{" "}
          <Button
            asChild
            variant="ghost"
            className="group p-1 hover:bg-[#ff5416] mr-1"
          >
            <Link href="https://ably.com/docs" target="_blank">
              <span className="text-lg text-[#ff5416] group-hover:text-[#f4f4f5]">
                Ably&apos;s
              </span>
            </Link>
          </Button>
          services.
        </p>
      </div>
      <div className="relative p-4 w-3/4">
        <div className="absolute top-0 left-0 w-full bg-gray-200 border border-gray-300 opacity-60 rounded-lg -z-10 h-full" />
        <div>
          <Image
            className="rounded-lg border-2 border-[#ff54164a]"
            src="/Dashboard.png"
            alt="website-image"
            width={1805}
            height={1052}
          />
        </div>
      </div>

      {/* Esthetic stuff */}
      {/* <div className="absolute w-[30rem] h-[20rem] top-[25rem] left-[calc(50%-50rem)] aspect-[900/600] rotate-90">
        <div className="relative isolate">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            {/* This is where you add color and location 
            <div
              style={{
                clipPath:
                  "polygon(48% 8%, 72% 30%, 93% 41%, 100% 70%, 80% 83%, 49% 98%, 20% 90%, 0 93%, 3% 39%, 20% 14%)",
              }}
              className="relative left-[calc(50%-50rem)] aspect-[1122/900] w-[35rem] bg-gradient-to-tr from-[#ff5416] to-[#ef5b5b] opacity-25 sm:left-[calc(50%-30rem)] sm:w-[70rem]"
            />
          </div>
        </div>
      </div> */}
    </WidthWrapper>
  );
}
