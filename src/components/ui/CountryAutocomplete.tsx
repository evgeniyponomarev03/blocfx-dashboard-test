import { COUNTRY_LIST } from "@/constants/countries-list";
import Flag from "react-world-flags";
import Autocomplete from "./Autocomplete";

export default function CountryAutocomplete(props: any) {
  return (
    <Autocomplete
      options={COUNTRY_LIST.map((item) => ({
        ...item,
        value: (
          <div className="flex gap-4">
            <div className="w-6 h-6 rounded-full overflow-hidden shadow-md">
              <Flag className="w-full h-full object-cover" code={item.code} />
            </div>
            {item.label}
          </div>
        ),
      }))}
      isOptionEqualToValue={(option, value) =>
        option.label === value.label || option.value === value.value
      }
      {...props}
    />
  );
}
