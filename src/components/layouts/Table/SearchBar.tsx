import * as React from "react";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import useForm from "@/hooks/useForm";
import Box from "@mui/material/Box";
import { searchBarSchema } from "@/lib/formSchemas";
import { useEffect } from "react";

interface SearchBarProps {
  submitSearch?: (value: string) => void;
}

export const SearchBar = ({ submitSearch }: SearchBarProps) => {
  const { handleSubmit, isError, handleChange, handleBlur, values } = useForm({
    initialValues: {
      search: "",
    },
    validationSchema: searchBarSchema,
    onSubmit: ({ search }) => {
      if (typeof submitSearch === "function") {
        submitSearch(search);
      }
    },
  });

  useEffect(() => {
    console.log(values);
  }, [values]);

  return (
    <Box
      component="form"
      className="p-0.5 flex items-center border border-solid rounded-md"
      onSubmit={handleSubmit}
      sx={{
        borderColor: ({ palette }) =>
          isError("search") ? palette.error.main : palette.primary.main,
      }}
    >
      <InputBase
        value={values.search}
        onChange={handleChange}
        onBlur={handleBlur}
        name="search"
        className="ml-2 flex-1"
        placeholder="Pencarian"
      />
      <IconButton type="button" className="p-1" aria-label="Pencarian">
        <SearchIcon />
      </IconButton>
    </Box>
  );
};
