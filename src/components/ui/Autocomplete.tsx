import * as React from "react";
import {
  useAutocomplete,
  UseAutocompleteProps,
} from "@mui/base/useAutocomplete";
import { Popper } from "@mui/base/Popper";
import { unstable_useForkRef as useForkRef } from "@mui/utils";
import Input from "./Input";

const Autocomplete = React.forwardRef(function Autocomplete(
  props: UseAutocompleteProps<any, false, false, false>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const {
    disableClearable = false,
    disabled = false,
    readOnly = false,
    options,
    isOptionEqualToValue,
    ...other
  } = props;

  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    dirty,
    id,
    popupOpen,
    anchorEl,
    setAnchorEl,
    groupedOptions,
  } = useAutocomplete({
    ...props,
    componentName: "BaseAutocompleteIntroduction",
  });

  const hasClearIcon = !disableClearable && !disabled && dirty && !readOnly;

  const rootRef = useForkRef(ref, setAnchorEl);

  return (
    <>
      <div {...getRootProps(other)} ref={rootRef}>
        <Input
          id={id}
          disabled={disabled}
          readOnly={readOnly}
          {...getInputProps()}
        />
      </div>
      {anchorEl && (
        <Popper
          open={popupOpen}
          anchorEl={anchorEl}
          slotProps={{
            root: {
              className: "relative z-[1001] w-[340px]",
            },
          }}
          modifiers={[
            { name: "flip", enabled: false },
            { name: "preventOverflow", enabled: false },
          ]}
        >
          <ul
            {...getListboxProps()}
            className="text-sm box-border p-1.5 mx-0 min-w-[320px] rounded-xl overflow-auto outline-0 max-h-[300px]
            z-[1] bg-white dark:bg-gray-800 border border-solid border-gray-200 dark:border-gray-900 text-gray-900 
            dark:text-gray-200 shadow-[0_4px_30px_transparent] shadow-gray-200 dark:shadow-gray-900"
          >
            {groupedOptions.map((option, index) => {
              const optionProps = getOptionProps({ option, index });

              return (
                <li
                  {...optionProps}
                  key={index}
                  className="list-none p-2 rounded-lg cursor-default last-of-type:border-b-0 hover:cursor-pointer
                   aria-selected:bg-violet-100 dark:aria-selected:bg-violet-900 aria-selected:text-violet-900
                   dark:aria-selected:text-violet-100 ui-focused:bg-gray-100 dark:ui-focused:bg-gray-700 
                   ui-focus-visible:bg-gray-100 dark:ui-focus-visible:bg-gray-800 ui-focused:text-gray-900
                   dark:ui-focused:text-gray-300 ui-focus-visible:text-gray-900 dark:ui-focus-visible:text-gray-300
                   ui-focus-visible:shadow-[0_0_0_3px_transparent] ui-focus-visible:shadow-violet-200 
                   dark:ui-focus-visible:shadow-violet-500 ui-focused:aria-selected:bg-violet-100 dark:ui-focused:aria-selected:bg-violet-900 
                   ui-focus-visible:aria-selected:bg-violet-100 dark:ui-focus-visible:aria-selected:bg-violet-900 
                   ui-focused:aria-selected:text-violet-900 dark:ui-focused:aria-selected:text-violet-100 ui-focus-visible:aria-selected:text-violet-900 
                   dark:ui-focus-visible:aria-selected:text-violet-100"
                >
                  {option.value || option.label}
                </li>
              );
            })}

            {groupedOptions.length === 0 && (
              <li className="list-none p-2 cursor-default">No results</li>
            )}
          </ul>
        </Popper>
      )}
    </>
  );
});

export default Autocomplete;
