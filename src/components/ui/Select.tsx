"use client";

import Icons from "@/assets/icons";
import {
  Option as BaseOption,
  OptionOwnerState,
  OptionProps,
} from "@mui/base/Option";
import { Select as BaseSelect, SelectRootSlotProps } from "@mui/base/Select";
import clsx from "clsx";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useWindowSize } from "react-use";

const getOptionColorClasses = ({
  selected,
  highlighted,
  disabled,
}: Partial<OptionOwnerState<number>>) => {
  let classes = "";
  if (disabled) {
    classes += "text-slate-400 dark:text-slate-700";
  } else {
    if (selected) {
      classes += " bg-taupe-gray text-white";
    } else if (highlighted) {
      classes += " bg-gray-400";
    }
  }
  return classes;
};

export const Option = React.forwardRef<HTMLLIElement, OptionProps<unknown>>(
  (props, ref) => {
    return (
      <BaseOption
        ref={ref}
        {...props}
        slotProps={{
          root: ({ selected, highlighted, disabled }) => ({
            className: `list-none p-2 rounded-lg cursor-pointer last-of-type:border-b-0 ${getOptionColorClasses(
              { selected, highlighted, disabled }
            )}`,
          }),
        }}
      />
    );
  }
);

Option.displayName = "Option";

const Button = React.forwardRef(function Button<
  TValue extends object,
  Multiple extends boolean
>(
  props: SelectRootSlotProps<TValue, Multiple> & { isShowChevron: boolean },
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const { className, isShowChevron = true, ...other } = props;
  return (
    <button
      type="button"
      {...other}
      className={clsx(className, "flex justify-between items-center")}
      ref={ref}
    >
      {other.children}
      {isShowChevron && (
        <span>
          <Image src={Icons.Chevron} alt="chevron" />
        </span>
      )}
    </button>
  );
});

const resolveSlotProps = (fn: any, args: any) =>
  typeof fn === "function" ? fn(args) : fn;

export const Select = React.forwardRef(function CustomSelect(
  props: any,
  ref: any
) {
  const elementRef: React.MutableRefObject<HTMLButtonElement | null> =
    useRef(null);
  const { width: windowWidth } = useWindowSize();
  const [width, setWidth] = useState<number | null>(null);

  const updateWidth = () => {
    if (elementRef.current) {
      const newWidth = elementRef.current?.offsetWidth;
      setWidth(newWidth);
    }
  };

  useEffect(() => {
    updateWidth();
  }, [windowWidth]);

  return (
    <BaseSelect
      {...props}
      ref={(el) => {
        if (ref) ref.current = el;
        if (elementRef) elementRef.current = el;
      }}
      slots={{
        root: Button,
        ...props.slots,
      }}
      className={clsx("CustomSelect", props.className)}
      slotProps={{
        ...props.slotProps,
        root: (ownerstate: any) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.root,
            ownerstate
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              `relative border w-full p-2 text-left text-white bg-[#333] text-sm rounded-2xl`,
              resolvedSlotProps?.className
            ),
          };
        },
        listbox: (ownerstate: any) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.listbox,
            ownerstate
          );
          return {
            ...resolvedSlotProps,
            style: { width: `${width}px` },
            className: clsx(
              `bg-white text-black rounded-lg border`,
              resolvedSlotProps?.className
            ),
          };
        },
      }}
    />
  );
});
