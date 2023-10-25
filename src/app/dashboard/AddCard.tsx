"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const AddCard = ({ content }: { content: string }) => {
  const router = useRouter();
  return (
    <Card
      key={Math.random()}
      className="border-none justify-center items-center p-0 px-6 pt-6 pb-0"
    >
      <CardHeader className="justify-center items-center">
        <CardTitle className="text-xl">
          Create a new{" "}
          <span className="font-semibold text-[#ff5416]">Project</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="justify-center items-center text-center">
        <p>{content}</p>
      </CardContent>
      <CardFooter className="justify-center">
        <Button
          className="hover:bg-[black] hover:text-[white]"
          variant="ghost"
          onClick={(e) => {
            e.preventDefault();
            router.push("/create-project");
          }}
        >
          Add
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddCard;
