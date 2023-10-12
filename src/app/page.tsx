import WidthWrapper from "@/components/WidthWrapper";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookOpenCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <WidthWrapper className="flex flex-col items-center mb-10 mt-20 md:mt-24 lg:mt-26">
      <div className="p-10 md:p-15 lg:p-20">
        <h1 className="text-5xl">TrackerTeam</h1>
      </div>
      <div className="flex flex-col gap-1 mt-5 text-lg text-center">
        <p>
          <strong>Effortless</strong>&nbsp;Collaboration,
        </p>
        <p>
          Seamless&nbsp; <strong>Progress!</strong>
        </p>
      </div>
      <div className="flex p-5 justify-center items-center w-4/12">
        <Button asChild className="p-8 min-w-min md:p-6 lg:p-4 xl:p-2">
          <Link href="/dashboard">
            Start Now <BookOpenCheck className="ml-3 text-cyan-700 h-5 w-5" />
          </Link>
        </Button>
      </div>
      <div className="flex p-10 text-center mt-10">
        <p>
          Plan with your team and get real time updates with{" "}
          <Button
            asChild
            variant="ghost"
            className="group p-1 hover:bg-[#ff5416] mr-1"
          >
            <Link href="https://ably.com/docs" target="_blank">
              <span className="text-[#ff5416] group-hover:text-[#f4f4f5]">
                Ably&apos;s
              </span>
            </Link>
          </Button>
          services.
        </p>
      </div>

      {/* Esthetic stuff */}
      <div>
        <div className="relative isolate">
          <div aria-hidden="true" className="">
            {/* This is where you add color and location */}
            <div className=""></div>
          </div>
        </div>
      </div>
    </WidthWrapper>
  );
}
