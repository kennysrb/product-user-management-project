import { useState } from "react";
import Sheet from "react-modal-sheet";
import { observer } from "mobx-react-lite";
import styles from "./CreateUserModal.module.scss";
import CloseIcon from "../assets/images/icons/close-icon.png";
import { Theme, useTheme } from "@mui/material/styles";

import { useStore } from "../store";
import {
  Box,
  Button,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";

export const CreateUserModal = observer((props: any) => {
  const { setOpen, open } = props;
  const {
    userStore: { createNewUser },
  } = useStore();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    age: "",
    email: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
    },
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    // If the ID starts with "address.", update the address property
    if (id.startsWith("address.")) {
      const addressKey = id.split(".")[1];
      const newAddress = {
        ...formData.address,
        [addressKey]: value,
      };
      setFormData({
        ...formData,
        address: newAddress,
      });
    } else {
      // Otherwise, update the regular property
      setFormData({
        ...formData,
        [id]: value,
      });
    }
  };

  const onClickCloseModal = () => {
    setOpen(false);
  };
  const handleSubmit = (event: any) => {
    event.preventDefault();
    createNewUser(formData);
    setOpen(false);
  };

  //SELECT
  const [userGender, setUserGender] = useState("");
  const handleSelectChange = (event: any) => {
    setUserGender(event.target.value);
    setFormData({
      ...formData,
      gender: event.target.value,
    });
  };
  const theme = useTheme();
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
  function getStyles(name: string, personName: string, theme: Theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  const genders = ["male", "female", "other"];

  return (
    <Sheet
      className={styles.BottomModal}
      isOpen={open}
      disableDrag={false}
      onClose={onClickCloseModal}
    >
      <Sheet.Container className={styles.Container}>
        <Sheet.Header>
          <div className={styles.CloseIconWrapper} onClick={onClickCloseModal}>
            <img
              className={styles.CloseIcon}
              src={CloseIcon}
              alt={"close"}
              onClick={onClickCloseModal}
            />
          </div>
        </Sheet.Header>
        <Sheet.Content className={styles.Content}>
          <div className={styles.BottomContent}>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <TextField id="firstName" label="Name" onChange={handleChange} />
              <TextField
                id="lastName"
                label="Last name"
                onChange={handleChange}
              />
              <Select
                displayEmpty
                value={userGender}
                onChange={handleSelectChange}
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
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem disabled value="">
                  <em>Gender</em>
                </MenuItem>
                {genders.map((gender) => (
                  <MenuItem
                    key={gender}
                    value={gender}
                    style={getStyles(gender, gender, theme)}
                  >
                    {gender}
                  </MenuItem>
                ))}
              </Select>
              <TextField
                id="age"
                label="Age"
                type="number"
                onChange={handleChange}
              />
              <TextField id="email" label="Email" onChange={handleChange} />
              <TextField id="phone" label="Phone" onChange={handleChange} />
              <div className={styles.RatingAndPrice}>
                <TextField
                  id="address.street"
                  label="Street"
                  onChange={handleChange}
                />
                <TextField
                  id="address.state"
                  label="State"
                  onChange={handleChange}
                />
                <TextField
                  id="address.city"
                  label="City"
                  onChange={handleChange}
                />
                <TextField
                  id="address.postalCode"
                  label="Postal code"
                  onChange={handleChange}
                />
              </div>
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Box>
          </div>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop onTap={onClickCloseModal} />
    </Sheet>
  );
});
