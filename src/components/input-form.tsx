import { cn } from "../utils/cn";

type InputFormProps = {
  placeholder?: string;
  type?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function InputForm({
  placeholder,
  type,
  className,
  onChange,
}: InputFormProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={cn(
        `border border-zinc-200 rounded-xl text-sm px-4 py-3`,
        className
      )}
      onChange={onChange}
    />
  );
}
