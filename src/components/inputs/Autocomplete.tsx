import React, { Ref, forwardRef, useImperativeHandle, useState } from "react";
import MuiAutoComplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";

type AutoCompleteOptionFormat = {
  name: string;
  label: string;
};

export interface AutocompleteHandles {
  resetSelection: () => void;
}

type TAutoComplete = (
  props: {
    options: AutoCompleteOptionFormat[];
    label: string;
    onChange?: (value: string[]) => void;
    initialValue?: string[];
  },
  ref: Ref<AutocompleteHandles>
) => React.ReactElement;

const AutocompleteContent: TAutoComplete = (
  { options, label, onChange, initialValue },
  ref
) => {
  const [value, setValue] = useState<AutoCompleteOptionFormat[]>(() => {
    return initialValue
      ? initialValue.map((value) => ({
          name: value,
          label:
            options.find((optionValue) => optionValue.name == value)?.label ||
            value,
        }))
      : [];
  });
  const [inputValue, setInputValue] = useState("");

  useImperativeHandle(ref, () => ({
    resetSelection: () => {
      setValue([]);
      setInputValue("");
    },
  }));

  return (
    <MuiAutoComplete
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        if (typeof onChange === "function") {
          onChange(newValue.map((value) => value.name));
        }
      }}
      multiple
      renderOption={(props, option) => {
        return (
          <li {...props} key={option.name}>
            {option.label}
          </li>
        );
      }}
      inputValue={inputValue}
      onInputChange={(event, value) => {
        setInputValue(value);
      }}
      isOptionEqualToValue={(option, value) => option.name == value.name}
      renderTags={(tagValue, getTagProps) => {
        return tagValue.map((option, index) => (
          <Chip
            {...getTagProps({ index })}
            color="primary"
            key={option.name}
            label={option.label}
          />
        ));
      }}
      renderInput={(params) => <TextField {...params} label={label} />}
      options={options}
    />
  );
};

const Autocomplete = forwardRef(AutocompleteContent);

export default Autocomplete;
