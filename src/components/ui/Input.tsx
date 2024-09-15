"use client";
import { forwardRef, useId, useState } from "react";
import clsx from "clsx";
import { Input as BaseInput, InputProps } from "@mui/base/Input";

const resolveSlotProps = (fn: any, args: any) =>
  typeof fn === "function" ? fn(args) : fn;

type Props = {
  label?: React.ReactNode;
};

const Input = forwardRef((props: InputProps & Props, ref: any) => {
  const [isFocus, setIsFocus] = useState(false);
  const id = useId();

  return (
    <>
      {props.label && (
        <label
          className={clsx("inline-block mb-1 text-sm md:text-base", {
            "text-yankees-blue": isFocus,
            "text-taupe-gray": !isFocus,
          })}
          htmlFor={id}
        >
          {props.label}
        </label>
      )}
      <BaseInput
        onBlur={() => setIsFocus(false)}
        onFocus={() => setIsFocus(true)}
        id={id}
        ref={ref}
        slotProps={{
          ...props.slotProps,
          input: (ownerState) => {
            const resolvedSlotProps = resolveSlotProps(
              props.slotProps?.input,
              ownerState
            );
            return {
              ...resolvedSlotProps,
              className: clsx(
                "bg-transparent w-full py-1 outline-none focus:border-b-yankees-blue border-b-[#B1B1B1] border-b",
                resolvedSlotProps?.className
              ),
            };
          },
        }}
        {...props}
      />
    </>
  );
});

Input.displayName = "Input";

export default Input;
