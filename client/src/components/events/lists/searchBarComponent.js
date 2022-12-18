import {
  Chip,
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
import React from "react";
import { getAllTags } from "../../../utils/apis/event";

function SearchBar({ searchEvents }) {
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
  const [type, setType] = React.useState("");
  const showSortOptions = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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

  const applyFilters = () => {
    let query = "";
    if (searchInputTitle?.trim() !== "")
      query += "eventTitle=" + searchInputTitle;
    if (searchInputCity?.trim() !== "")
      query += "&eventLocation=" + searchInputCity;
    // if (searchTags.length > 0) query += "&eventTags=" + searchTags.join(",");
    searchEvents(query, { searchInputTitle, searchInputCity, searchTags });
  };

  return (
    <Paper elevation={3}>
      <div className="flex p-4 mb-3 justify-between">
        <div className="w-8/12">
          <button
            className="font-bold text-xl btn_default__filter"
            onClick={() => {
              type === "filter" ? setType("") : setType("filter");
            }}
          >
            <FilterListIcon />
            &nbsp;&nbsp;Filters
          </button>
          {type === "filter" && (
            <div className="mt-2">
              <div>
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
              <div>
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
                        size="small"
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
                Apply
              </button>
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
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={showSortOptions}
            onClose={handleClose}
            // MenuListProps={{
            //   "aria-labelledby": "basic-button",
            // }}
          >
            <MenuItem onClick={handleClose}>Start Date (descending)</MenuItem>
            <MenuItem onClick={handleClose}>Start Date (ascending)</MenuItem>
            <MenuItem onClick={handleClose}>Rating (high-low)</MenuItem>
          </Menu>
        </div>
      </div>
    </Paper>
  );
}

export default SearchBar;
