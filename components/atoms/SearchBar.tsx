import React, { FC } from "react";
import { Searchbar } from "react-native-paper";

interface SearchBarProps {
  onChangeSearch: (query: string) => void;
  searchQuery: string;
}

const SearchBar: FC<SearchBarProps> = ({ onChangeSearch, searchQuery }) => {
  return (
    <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
      className="rounded-full"
    />
  );
};

export default SearchBar;
