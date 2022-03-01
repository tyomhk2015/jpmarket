import { cls } from "libs/client/utils";

interface ButtonProps {
  large?: boolean;
  text: string;
  [key: string]: any;
}

export default function Button({
  large = false,
  onClick,
  text,
  loading,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      disabled={loading}
      className={cls(
        "w-full text-white  px-4 border border-transparent rounded-md shadow-sm font-medium focus:ring-2 focus:ring-offset-2 focus:outline-none",
        large ? "py-3 text-base" : "py-2 text-sm",
        loading ? "bg-gray-500 hover:bg-gray-600 focus:ring-gray-500" : "bg-orange-500 hover:bg-orange-600 focus:ring-orange-500"
      )}
    >
      {text}
    </button>
  );
}