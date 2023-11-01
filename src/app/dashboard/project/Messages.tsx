"use client";

import { trpc } from "@/app/_trpc/client";
import { Message } from "./TaskDashboard";
import { useEffect, useState } from "react";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/server";
import { InputWithButton } from "@/components/FormInputWithButton";
import { useChannel } from "ably/react";
import { v4 } from "uuid";

interface Props {
  messages: Message[];
  projectId: string;
  setMessages: (value: React.SetStateAction<Message[]>) => void;
  user: KindeUser;
}

const Messages = ({ messages, projectId, setMessages, user }: Props) => {
  const { data } = trpc.getMessages.useQuery({ projectId });
  const msgRender =
    data &&
    messages.map((msg) => (
      <div className="flex items-center justify-start w-full gap-2 p-2 rounded-sm bg-white">
        <div className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-300">
          {msg.User ? (
            <span className="text-sm">
              {msg.User.firstname?.[0].toUpperCase() ||
                "" + msg.User.lastname?.[0].toUpperCase()}
            </span>
          ) : (
            <span className="text-sm">
              {msg.senderFN?.[0].toUpperCase() ||
                "" + msg.senderLN?.[0].toUpperCase()}
            </span>
          )}
        </div>
        <p className="text-sm w-full">{msg.content}</p>
      </div>
    ));

  useEffect(() => {
    data && setMessages(data);
  }, [data]);

  const [message, setMessage] = useState("");
  const addMessage = trpc.addMessage.useMutation();
  const onMessageChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setMessage(e.currentTarget.value);
  const onMessageSend = () => {
    const id = v4();
    addMessage.mutate({
      message: { id, content: message },
      projectId,
      senderId: user.id!,
    });
    setMessages((prev) => [
      {
        id,
        content: message,
        date: new Date().toISOString(),
        senderFN: user.given_name || "",
        senderLN: user.family_name || "",
        senderId: user.id || "",
        like: 0,
        heart: 0,
        eyes: 0,
        dislike: 0,
      },
      ...prev,
    ]);
    setMessage("");
  };
  return (
    <div className="flex flex-col items-center gap-2 min-h-[300px] w-full mr-2">
      <div className="flex flex-col-reverse gap-2 p-2 w-full h-full max-h-[280px] 2xl:max-h-[400px] bg-gray-100 rounded-md overflow-auto">
        {msgRender}
      </div>
      <InputWithButton
        name=""
        placeholder="Comment..."
        buttonTitle="Send"
        value={message}
        onChange={onMessageChange}
        onClick={onMessageSend}
      />
    </div>
  );
};

export default Messages;
