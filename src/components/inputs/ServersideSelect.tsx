import { dataFetcher } from "@/lib/utils";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useQuery } from "@tanstack/react-query";
import React, {
  Ref,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

type AutoCompleteOptionFormat = {
  name: number;
  label: string;
};

interface ServerSideSelectProps {
  url: string;
  label: string;
  initialValue?: number;
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: number | string) => void;
  helperText?: string;
  error?: boolean;
}

export interface ServerSideSelectHandles {
  resetValue: () => void;
}

const ServersideSelectContent = (
  {
    label,
    onChange,
    error,
    helperText,
    url,
    initialValue,
  }: ServerSideSelectProps,
  ref: Ref<ServerSideSelectHandles>
) => {
  const [value, setValue] = useState<AutoCompleteOptionFormat | null>(null);
  const [inputValue, setInputValue] = useState("");

  const { data, isLoading } = useQuery<AutoCompleteOptionFormat[]>({
    queryKey: [url],
    queryFn: () => dataFetcher(url),
    keepPreviousData: true,
  });

  useImperativeHandle(ref, () => ({
    resetValue: () => {
      setValue(null);
    },
  }));

  useEffect(() => {
    if (data && !isLoading && initialValue) {
      const findOptions = data.find((value) => value.name === initialValue);
      if (findOptions) {
        setValue(findOptions);
      }
    }
  }, [data, isLoading, initialValue]);

  return (
    <Autocomplete
      value={value}
      options={data || []}
      loading={isLoading}
      inputValue={inputValue}
      renderOption={(props, option) => {
        return (
          <li {...props} key={option.name}>
            {option.label}
          </li>
        );
      }}
      onInputChange={(event, value) => {
        setInputValue(value);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          error={error}
          helperText={helperText}
        />
      )}
      isOptionEqualToValue={(option, value) => option.name == value.name}
      onChange={(event, newValue) => {
        if (newValue) {
          setValue(newValue);
          if (typeof onChange === "function") {
            onChange(newValue.name);
          }
        }
      }}
    />
  );
};

const ServersideSelect = forwardRef(ServersideSelectContent);

export default ServersideSelect;
