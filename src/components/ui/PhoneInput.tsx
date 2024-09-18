import React, { useState, forwardRef, useMemo, useEffect } from "react";
import { Select, Option } from "@mui/base";
import Input from "./Input";
import { COUNTRY_LIST as countryList } from "@/constants/countries-list";
import Flag from "react-world-flags";

const PhoneNumberInput = forwardRef<HTMLInputElement, any>(
  (props: any, ref: any) => {
    const COUNTRY_LIST = useMemo(() => {
      return countryList.toSorted((a, b) => +a.dialingCode - +b.dialingCode);
    }, []);

    const [countryCode, setCountryCode] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");

    useEffect(() => {
      if (props.onChange) props.onChange(null, `${countryCode}${phoneNumber}`);
    }, [countryCode, phoneNumber, props]);

    const handleCountryChange = (_: unknown, newValue: string | null) => {
      if (newValue) setCountryCode(newValue);
    };

    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const formattedValue = event.target.value.replace(/\D/g, "");
      setPhoneNumber(formattedValue);
    };

    return (
      <div>
        {props.label && (
          <label className="inline-block mb-1 text-sm md:text-base text-grey">
            {props.label}
          </label>
        )}
        <div className="flex">
          <Select
            value={countryCode}
            onChange={handleCountryChange}
            className="block w-[40px] border-b-[#B1B1B1] border-b pr-3 font-bold"
            slotProps={{
              listbox: () => {
                return {
                  className:
                    "max-h-[200px] overflow-y-scroll flex flex-col gap-1",
                };
              },
            }}
            placeholder="+XX"
          >
            {COUNTRY_LIST.map((country) => (
              <Option
                className="cursor-pointer rounded-md backdrop-saturate-[180%] backdrop-blur-xl bg-black bg-opacity-10"
                key={country.code}
                value={country.dialingCode}
              >
                <div className="flex gap-2 p-2 text-grey font-bold">
                  <div className="w-6 h-6 rounded-full overflow-hidden shadow-md">
                    <Flag
                      className="w-full h-full object-cover"
                      code={country.code}
                    />
                  </div>
                  {country.dialingCode}
                </div>
              </Option>
            ))}
          </Select>

          <Input
            ref={ref}
            className="w-full"
            placeholder="Enter phone number"
            type="tel"
            slotProps={{
              input: {
                maxLength: 10,
              },
            }}
            {...props}
            label={undefined}
            value={phoneNumber}
            onChange={handlePhoneChange}
          />
        </div>
      </div>
    );
  }
);

PhoneNumberInput.displayName = "PhoneNumberInput";

export default PhoneNumberInput;
