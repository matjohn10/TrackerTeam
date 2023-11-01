"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/server";
import { useChannel } from "ably/react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { trpc } from "@/app/_trpc/client";

interface Props {
  user: KindeUser;
}

const Notifications = ({ user }: Props) => {
  const [notifications, setNotifications] = useState<
    {
      message: string;
    }[]
  >([]);
  const bgColorN = notifications.length === 0 ? "bg-gray-200" : "bg-red-400";
  const { data } = trpc.getNotifications.useQuery();
  const addNotif = trpc.addNotification.useMutation();
  const deleteNotif = trpc.deleteNotifications.useMutation();

  useEffect(() => {
    data && setNotifications(data);
  }, [data]);

  const {} = useChannel("connected", (event: any) => {
    if (event.data.emails.includes(user.email)) {
      // make a notification maybe in the header since it is always on the screen

      addNotif.mutate({ message: event.data.message });
      setNotifications((prev) => [...prev, { message: event.data.message }]);
    }
    // channel.history((err: any, resultPage: any) => {
    //   console.log(resultPage);
    // });
  });

  const handleClick = () => {
    // update the db
    deleteNotif.mutate();
    setNotifications([]);
  };

  const notifs = notifications.map((notif) => (
    <div className="flex items-center justify-center p-3 rounded-md bg-gray-100 text-sm">
      {notif.message}
    </div>
  ));

  return (
    <Popover>
      <PopoverTrigger>
        <div
          className={cn(
            "absolute flex items-center justify-center p-2 w-5 h-5 top-2 left-[30px] rounded-full",
            bgColorN
          )}
        >
          <span className="text-xs">{notifications.length}</span>
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col w-full gap-2 itemx-center">
          {notifications.length === 0 ? <p>No notifications.</p> : notifs}
          <Button variant="destructive" size="sm" onClick={handleClick}>
            Clear
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Notifications;
