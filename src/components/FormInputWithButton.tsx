import { Button, ButtonProps } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface InputProps {
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  buttonTitle: string;
  onClick: () => void;
}

export function InputWithButton({
  name,
  placeholder,
  value,
  onChange,
  buttonTitle,
  onClick,
}: InputProps) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={name}>{name[0].toUpperCase() + name.slice(1)}</Label>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          type={name}
          id={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <Button variant="ghost" onClick={onClick}>
          {buttonTitle}
        </Button>
      </div>
    </div>
  );
}
