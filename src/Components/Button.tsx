type ButtonProps = {
  label: string;
  onClick?: (event: MouseEvent) => void;
};

export default function Button({ label }: ButtonProps) {
  return <button className="bg-accent px-1 py-2 text-black"> {label}</button>;
}
