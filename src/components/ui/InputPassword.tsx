import { forwardRef, useState } from "react";
import Image from "next/image";
import Input from "./Input";
import Icons from "@/assets/icons";
import { InputProps } from "@mui/base/Input";
import clsx from "clsx";

type Props = {
  label?: React.ReactNode;
};

const InputPassword = forwardRef((props: InputProps & Props, ref: any) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative">
      {/* @ts-ignore */}
      <Input
        {...props}
        className={clsx("pr-0", props.className)}
        ref={ref}
        label="Password"
        type={isVisible ? "text" : "password"}
      />
      <button
        onClick={() => setIsVisible(!isVisible)}
        type="button"
        className="absolute top-1/2 right-0 translate-y-1/2"
      >
        <Image src={Icons.PasswordEye} alt="show" />
      </button>
    </div>
  );
});

InputPassword.displayName = "InputPassword";

export default InputPassword;
