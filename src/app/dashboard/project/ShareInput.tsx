import { trpc } from "@/app/_trpc/client";
import { InputWithButton } from "@/components/FormInputWithButton";
import { useChannel } from "ably/react";

interface Props {
  name: string;
  placeholder: string;
  buttonTitle: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  projectId: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  projectName: string | undefined;
}

const ShareInput = ({
  name,
  value,
  placeholder,
  buttonTitle,
  onChange,
  projectId,
  setEmail,
  projectName,
}: Props) => {
  const addMembers = trpc.addProjectMembers.useMutation();
  const { channel } = useChannel("connected");

  const onShareEmailClick = () => {
    addMembers.mutate({ emails: [value], projectId });
    channel.publish("send-project", {
      emails: [value],
      message: `You were added to a new project called ${projectName}.`,
    });
    setEmail("");
  };
  return (
    <InputWithButton
      name={name}
      placeholder={placeholder}
      buttonTitle={buttonTitle}
      value={value}
      onChange={onChange}
      onClick={onShareEmailClick}
    />
  );
};

export default ShareInput;
