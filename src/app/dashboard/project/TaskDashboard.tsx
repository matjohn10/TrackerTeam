"use client";

import { Separator } from "@/components/ui/separator";
import { MessageSquare, PlusCircle, Share } from "lucide-react";
import TaskCardB from "./TaskCardB";
import AddTask from "./AddTask";
import { CustomDialog } from "@/components/CustomDialog";
import { useEffect, useState } from "react";
import TaskForm from "@/app/create-project/TaskForm";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/app/_trpc/client";
import { useChannel } from "ably/react";
import { v4 } from "uuid";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/server";
import Messages from "./Messages";
import ShareInput from "./ShareInput";

interface Props {
  isOpen: boolean;
  projectId: string;
  user: KindeUser;
}
type Task = {
  id?: number;
  projectId?: string | null;
  title: string;
  description: string;
  category: string;
  lastModifiedDate: string;
  createdId?: string;
  lastModifiedId?: string;
  senderId?: string;
};

export type Message = {
  id: string;
  projectId?: string;
  content: string;
  date: string;
  senderFN?: string;
  senderLN?: string;
  like: number;
  heart: number;
  eyes: number;
  dislike: number;
  senderId: string;
  User?: {
    firstname: string | null;
    lastname: string | null;
    colorSchema: string;
  };
};

const TaskDashboard = ({ projectId, isOpen, user }: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categ, setCateg] = useState("");
  const [tasks, setTasks] = useState<Task[] | undefined>();

  const [messages, setMessages] = useState<Message[]>([]);
  const addMessage = trpc.addMessage.useMutation();

  const [email, setEmail] = useState("");

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.currentTarget.value);

  const { channel } = useChannel(`task-added:${projectId}`, (event: any) => {
    // channel that updates the task manager in real time for every user
    console.log(event.data);
    setTasks((prev) => (prev ? [...prev, event.data] : prev));
    const id = v4();
    const content = `A new task was added to the ${event.data.category} manager.`;
    addMessage.mutate({
      message: { id, content },
      projectId,
      senderId: user.id!,
    });
    setMessages((prev) => [
      {
        id,
        content,
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
  });

  const { data, isLoading } = trpc.getProject.useQuery({
    projectId: projectId,
  });

  useEffect(() => {
    setTasks(data?.project.Tasks);
  }, [data]);
  const addTask = trpc.addTask.useMutation();
  const todoTasks =
    tasks &&
    tasks.map((task) =>
      task.category == "Todo" ? <TaskCardB task={task} /> : <></>
    );
  const doingTasks =
    tasks &&
    tasks.map((task) =>
      task.category == "Doing" ? <TaskCardB task={task} /> : <></>
    );
  const doneTasks =
    tasks &&
    tasks.map((task) =>
      task.category == "Done" ? <TaskCardB task={task} /> : <></>
    );

  const handleNewTask = () => {
    data &&
      addTask.mutate({
        task: { title, description, category: categ },
        project: { id: data.projectId },
      });
    channel.publish("new-task", {
      title,
      description,
      category: categ,
      lastModifiedDate: new Date().toISOString(),
    });
    setTitle("");
    setDescription("");
    setCateg("");
  };

  const dialogContent = (
    <div className="flex flex-col w-full gap-2 items-center">
      <TaskForm
        title={title}
        description={description}
        setTitle={setTitle}
        setDescription={setDescription}
        setCategory={setCateg}
        isOptional={false}
        isFirst={false}
      />
    </div>
  );
  const dialogAddBtn = (
    <DialogClose>
      <Button
        type="button"
        className={
          title.length === 0 || description.length === 0 || categ.length === 0
            ? "hidden"
            : ""
        }
        onClick={() => handleNewTask()}
      >
        Add
      </Button>
    </DialogClose>
  );
  return (
    <div
      className={
        isOpen
          ? "flex flex-col gap-2 p-4 mt-4 mx-10 w-10/12"
          : "flex flex-col gap-2 p-4 mt-4 mx-10 w-full"
      }
    >
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center w-full">
          <h2 className="font-bold text-3xl">{data?.project.name}</h2>
          <div className="flex items-center gap-4 w-fit">
            <CustomDialog
              child={
                <div className="flex items-center hover:underline hover:cursor-default">
                  Add Task &nbsp; <PlusCircle className="w-4 h-4" />
                </div>
              }
              title="Create Task"
              description={`Add a new task to your project manager.`}
              additionalClose={dialogAddBtn}
              contentChildren={dialogContent}
            />

            <CustomDialog
              child={
                <div className="flex items-center hover:underline hover:cursor-default">
                  Share &nbsp; <Share className="w-4 h-4" />
                </div>
              }
              title="Share your project"
              description={"Add a new member"}
              additionalClose={<></>}
              contentChildren={
                <ShareInput
                  name="Email"
                  placeholder="Enter email..."
                  buttonTitle="Send"
                  value={email}
                  onChange={onChangeEmail}
                  setEmail={setEmail}
                  projectId={projectId}
                  projectName={data?.project.name}
                />
              }
            />
            <CustomDialog
              child={
                <div className="flex items-center hover:underline hover:cursor-default">
                  Comments &nbsp; <MessageSquare className="w-4 h-4" />
                </div>
              }
              title={data?.project.name + " Messages" || "Project Messages"}
              description=""
              additionalClose={<></>}
              contentChildren={
                <Messages
                  projectId={projectId}
                  messages={messages}
                  setMessages={setMessages}
                  user={user}
                />
              }
            />
          </div>
        </div>
        <br />
        <Separator />
      </div>
      <div className="flex flex-col xl:flex-row xl:justify-between px-[12rem] py-6 w-full gap-4">
        <div className="flex flex-col w-full items-center" key="Todo">
          <h3 className="text-xl font-semibold mb-4">Todo</h3>
          {isLoading ? (
            <Skeleton className="w-full h-16" />
          ) : (
            <div className="flex flex-col items-center w-full gap-4">
              {todoTasks}
            </div>
          )}
          <AddTask
            setTasks={setTasks}
            category="Todo"
            projectId={data?.projectId}
            channel={channel}
          />
        </div>
        <div className="flex flex-col w-full items-center" key="Doing">
          <h3 className="text-xl font-semibold mb-4">Doing</h3>
          {isLoading ? (
            <Skeleton className="w-full h-16" />
          ) : (
            <div className="flex flex-col items-center w-full gap-4">
              {doingTasks}
            </div>
          )}
          <AddTask
            setTasks={setTasks}
            category="Doing"
            projectId={data?.projectId}
            channel={channel}
          />
        </div>
        <div className="flex flex-col w-full items-center" key="Done">
          <h3 className="text-xl font-semibold mb-4">Done</h3>
          {isLoading ? (
            <Skeleton className="w-full h-16" />
          ) : (
            <div className="flex flex-col items-center w-full gap-4">
              {doneTasks}
            </div>
          )}
          <AddTask
            setTasks={setTasks}
            category="Done"
            projectId={data?.projectId}
            channel={channel}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskDashboard;
