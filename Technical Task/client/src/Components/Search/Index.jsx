import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { setSearchValue } from "../../Store/Project/ProjectSlice";
import { useDispatch } from "react-redux";

export default function Search({ value, setValue, data, setData }) {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(setSearchValue(e.target.value));
    setValue(e.target.value);
  };
  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 300 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search projects by name"
        onChange={handleChange}
        value={value}
      />
      <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
