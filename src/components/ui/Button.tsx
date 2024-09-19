import clsx from "clsx";
import Spinner from "./Spinner";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  loading?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  className,
  loading = false,
  children,
  ...props
}) => {
  return (
    <button
      className={clsx(
        `font-bold text-[22px] text-white bg-black py-4 px-[74px] rounded-[20px]
        hover:bg-white hover:text-black transition-all duration-300 ease-in-out
        border-[1px] border-black`,
        className,
        {
          "bg-yankees-blue": loading,
        }
      )}
      disabled={loading}
      {...props}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
};

export default Button;
