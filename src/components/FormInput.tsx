import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputProps {
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputWithLabel({
  name,
  placeholder,
  value,
  onChange,
}: InputProps) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={name}>{name[0].toUpperCase() + name.slice(1)}</Label>
      <Input
        type={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
