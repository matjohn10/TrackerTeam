"use client";

import { trpc } from "@/app/_trpc/client";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/server";
import { usePresence } from "ably/react";
import { Circle } from "lucide-react";

interface Props {
  projectId: string;
  user: KindeUser;
}

const Members = ({ projectId, user }: Props) => {
  const { presenceData } = usePresence("task-added");
  const ids = presenceData.map((m) => m.clientId);
  const { data } = trpc.getMembers.useQuery({ ids, projectId });
  const elements =
    data &&
    data.map((d) => (
      <div className="flex gap-2 items-center">
        <Circle
          className={
            ids.includes(d.userId)
              ? "text-green-500 w-5 h-5 font-semibold shadow-inner shadow-green-400 rounded-full"
              : "text-gray-600 w-5 h-5 font-semibold"
          }
        />
        {user.id === d.userId ? (
          <span>{d.user.firstname + " (me)"}</span>
        ) : (
          <span>{d.user.firstname}</span>
        )}
      </div>
    ));
  return <div className="flex flex-col gap-2">{elements}</div>;
};

export default Members;
