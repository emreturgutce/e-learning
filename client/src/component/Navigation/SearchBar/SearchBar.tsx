import { useState } from 'react';
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import {useNavigate, createSearchParams} from "react-router-dom";
import {InputAdornment, TextField} from "@mui/material";

const SearchBar = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate({
          pathname: "/search-courses",
          search: createSearchParams({
              search,
          }).toString()
      });
  }

  const handleEnter = (e: any) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
    e.target.focus()
  }

  return (
    <div style={{ width: '60%' }}>
      <TextField
          inputProps={{
            startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
            ),
          }}
          sx={{width: '100%'}}
        placeholder="Dilediğiniz şeyi arayın"
        value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => handleEnter(e)}
      />
    </div>
  );
};

export default SearchBar;
