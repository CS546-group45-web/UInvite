import {
  Chip,
  Divider,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import FilterListIcon from "@mui/icons-material/FilterList";
import SortIcon from "@mui/icons-material/Sort";

import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { getAllTags } from "../../../utils/apis/event";

function SearchBar({ searchEvents, getAllData }) {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [searchInputTitle, setSearchTitle] = React.useState("");
  const [searchInputCity, setSearchInputCity] = React.useState("");
  const [searchTags, setSearchTags] = React.useState([]);
  const [allTags, setAllTags] = React.useState([]);
  const [showFilter, setShowFilter] = React.useState("");
  const [type, setType] = React.useState("");
  const showSortOptions = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (item) => {
    setType(item);
    setAnchorEl(null);
    applySort(item);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSearchTags(value);
  };

  React.useEffect(() => {
    getAllTags().then((res) => {
      const { data } = res;
      setAllTags(data?.data?.data);
    });
  }, []);

  const applySort = (item) => {
    setSearchTags([]);
    setSearchInputCity("");
    setSearchTitle("");
    let query = "";
    if (item?.trim() !== "") query += "sortType=" + item;
    searchEvents(query, {
      searchInputTitle,
      searchInputCity,
      searchTags,
      type,
    });
  };

  const applyFilters = () => {
    setType("");
    let query = "";
    if (searchInputTitle?.trim() !== "")
      query += "eventTitle=" + searchInputTitle;
    if (searchInputCity?.trim() !== "")
      query += "&eventLocation=" + searchInputCity;
    if (searchTags.length > 0) query += "&eventTags=" + searchTags.join(",");
    searchEvents(query, {
      searchInputTitle,
      searchInputCity,
      searchTags,
      type,
    });
  };

  const sortOptions = [
    { startDateDesc: "Start Date (descending)" },
    { startDateAsc: "Start Date (ascending)" },
    { rating: "Rating (high-low)" },
  ];

  return (
    <Paper elevation={3}>
      <div className="flex p-4 mb-3 justify-between">
        <div className="w-9/12">
          <div className="flex">
            <button
              className="font-semibold text-xl btn_default__filter mr-3"
              onClick={() => {
                setShowFilter(true);
              }}
            >
              <span>
                <FilterListIcon /> Filters
              </span>
            </button>
            {showFilter && (
              <button
                className="font-semibold text-xl btn_default__filter"
                onClick={() => {
                  getAllData();
                  setShowFilter(false);
                }}
              >
                <span>
                  <CloseIcon /> Close
                </span>
              </button>
            )}
          </div>
          {showFilter && (
            <div className="mt-2">
              <div className="flex mb-4">
                <div className="w-6/12 mr-2">
                  <TextField
                    id="title"
                    label="Title"
                    variant="outlined"
                    size="small"
                    type="text"
                    fullWidth
                    placeholder="Search by event title"
                    margin="dense"
                    name="title"
                    value={searchInputTitle}
                    onChange={(e) => {
                      let { value } = e.target;
                      setSearchTitle(value);
                    }}
                  />
                </div>
                <div className="w-6/12 ml-2">
                  <TextField
                    id="city"
                    label="City"
                    variant="outlined"
                    size="small"
                    type="text"
                    fullWidth
                    placeholder="Search by city"
                    margin="dense"
                    name="city"
                    value={searchInputCity}
                    onChange={(e) => {
                      let { value } = e.target;
                      setSearchInputCity(value);
                    }}
                  />
                </div>
              </div>
              <div>
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel id="invites">Search by Tags</InputLabel>
                  <Select
                    labelId="invites"
                    id="invites"
                    multiple={true}
                    value={searchTags}
                    onChange={handleChange}
                    input={
                      <OutlinedInput
                        id="invites"
                        label="Search by Tags"
                        fullWidth
                        // size="small"
                      />
                    }
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {allTags?.map((tag) => (
                      <MenuItem key={tag} value={tag}>
                        {tag}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <button
                className="font-semibold text-lg mt-2 btn_default__filter"
                onClick={applyFilters}
              >
                Apply filter
              </button>
              <Divider />
              <div>
                {(searchInputCity?.length > 0 ||
                  searchInputTitle?.length > 0) && (
                  <span>Search Inputs: &nbsp;&nbsp;&nbsp;</span>
                )}
                {searchInputTitle?.length > 0 && (
                  <Chip
                    variant="outlined"
                    className={"tags_chip"}
                    label={"Title: " + searchInputTitle}
                  />
                )}
                {searchInputCity?.length > 0 && (
                  <Chip
                    variant="outlined"
                    className={"tags_chip"}
                    label={"City: " + searchInputCity}
                  />
                )}
              </div>
            </div>
          )}
        </div>
        <div className="w-2/12">
          <button
            id="basic-button"
            className="font-semibold text-xl btn_default__sort"
            aria-controls={showSortOptions ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={showSortOptions ? "true" : undefined}
            onClick={handleClick}
          >
            <SortIcon />
            &nbsp;&nbsp;Sort by
          </button>
          {type && (
            <Chip variant="outlined" className={"tags_chip"} label={type} />
          )}
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={showSortOptions}
            onClose={handleClose}
          >
            {sortOptions.map((item, value) => (
              <MenuItem
                onClick={() => handleClose(Object.keys(item)[0])}
                key={value}
              >
                {Object.values(item)[0]}
              </MenuItem>
            ))}
          </Menu>
        </div>
      </div>
    </Paper>
  );
}

export default SearchBar;
