"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface InputProps {
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  buttonTitle: string;
  onClick: () => void;
  isShown?: boolean;
  setIsShown?: React.Dispatch<React.SetStateAction<boolean>>;
}

export function InputWithButton({
  name,
  placeholder,
  value,
  onChange,
  buttonTitle,
  onClick,
  isShown,
  setIsShown,
}: InputProps) {
  const { toast } = useToast();
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      {name.length !== 0 ? (
        <Label htmlFor={name}>{name[0].toUpperCase() + name.slice(1)}</Label>
      ) : (
        <></>
      )}
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          type={name}
          id={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <Button
          disabled={value.length == 0}
          variant="ghost"
          onClick={() => {
            onClick();
            !isShown
              ? toast({
                  variant: "destructive",
                  title: "Important!!",
                  description:
                    "If the email is already registered, the member will be automatically added. Otherwise, an email will be sent with a link.",
                })
              : void 0;
            setIsShown ? setIsShown(true) : void 0;
          }}
        >
          {buttonTitle}
        </Button>
      </div>
    </div>
  );
}
