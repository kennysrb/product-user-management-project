import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import styles from "./ProductsFiltersBar.module.scss";
import { useStore } from "../store";
import { CreateUserModal } from "../modals/CreateUserModal";
import {
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "15ch",
    },
  },
}));
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

export default function UsersFilterBar() {
  const {
    userStore: { searchUsers, getFilteredUsers },
  } = useStore();
  const [inputValue, setInputValue] = React.useState("");
  const [isOpen, setOpen] = React.useState(false);
  let timeout: any;

  React.useEffect(() => {
    searchUsers(inputValue);
  }, [inputValue]);

  const handleInputChange = (e: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setInputValue(e.target.value);
    }, 500);
  };

  const opeCreateUserModal = () => {
    setOpen(true);
  };
  const [selectedGender, setSelectedGender] = React.useState("");
  const handleChange = (event: SelectChangeEvent<typeof selectedGender>) => {
    setSelectedGender(event.target.value);
    getFilteredUsers(event.target.value);
  };
  const genderOptions = ["male", "female", "other"];

  function getStyles(name: string, personName: string, theme: Theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  const theme = useTheme();
  return (
    <>
      <Box className={styles.FiltersBarWrapper} sx={{ flexGrow: 1 }}>
        <AppBar position="static" className={styles.FiltersBar}>
          <span className={styles.Link} onClick={opeCreateUserModal}>
            Create new user
          </span>
          <Select
            displayEmpty
            value={selectedGender}
            onChange={handleChange}
            input={<OutlinedInput />}
            className={styles.Select}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <em>Gender</em>;
              } else {
                return <em>{selected}</em>;
              }
            }}
            MenuProps={MenuProps}
            style={{ minWidth: 150 }}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem disabled value="">
              <em>Gender</em>
            </MenuItem>
            {genderOptions.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, selectedGender, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
          <Search style={{ display: "flex" }}>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={handleInputChange}
            />
          </Search>
        </AppBar>
      </Box>
      <CreateUserModal open={isOpen} setOpen={setOpen} />
    </>
  );
}
