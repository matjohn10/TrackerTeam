import { MinusCircle } from "lucide-react";

interface EmailTagProps {
  email: string;
  handleRemoveEmail: (emailRemove: string) => void;
}

const EmailTag = ({ email, handleRemoveEmail }: EmailTagProps) => {
  return (
    <div
      className="flex w-full justify-between items-center gap-1"
      key={Math.random()}
    >
      <div className="flex justify-start items-center px-2 rounded-md bg-zinc-300">
        <p className="text-sm font-semibold text-zinc-950">{email}</p>
      </div>
      <MinusCircle
        className="w-4 h-4 font-semibold hover:cursor-pointer hover:opacity-80"
        onClick={() => handleRemoveEmail(email)}
      />
    </div>
  );
};

export default EmailTag;
