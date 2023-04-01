import { useState } from "react";
import Sheet from "react-modal-sheet";
import { observer } from "mobx-react-lite";
import styles from "./UserInfoModal.module.scss";
import CloseIcon from "../assets/images/icons/close-icon.png";
import EditIcon from "../assets/images/icons/edit-icon.png";
import DeleteIcon from "../assets/images/icons/delete-icon.png";
import ConfirmIcon from "../assets/images/icons/checkmark-icon.png";
import { useStore } from "../store";
import { Box, Button, TextField } from "@mui/material";
import ConfirmationDialog from "../UI/ConfirmationDialog";

export const UserInfoModal = observer((props: any) => {
  const { setOpen, open } = props;
  const {
    productStore: { createNewProduct },
    userStore: { singleUser, updateUser, removeSingleUser },
  } = useStore();
  const [editMode, setEditMode] = useState(false);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    createNewProduct(formData);
    setOpen(false);
  };

  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: singleUser?.firstName || "",
    age: singleUser?.age || "",
    email: singleUser?.email || "",
    phone: singleUser?.phone || "",
    gender: singleUser?.gender || "",
    lastName: singleUser?.lastName || "",
  });
  const handleChange = (event: any) => {
    const { id, value } = event.target;
    const updatedFormData = {
      ...formData,
      [id]: value,
    };

    setFormData(updatedFormData);
  };

  const onClickCloseModal = () => {
    setOpen(false);
    setEditMode(false);
    removeSingleUser();
  };
  const onClickEditUser = () => {
    setEditMode(true);
  };
  const onClickConfirmEditUser = (event: any) => {
    event.preventDefault();
    updateUser(singleUser?.id, formData);
    setEditMode(false);
  };
  const onClickCloseEditUser = () => {
    setEditMode(false);
  };
  const onClickDeleteUser = () => {
    setDialogOpen(true);
  };

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
          <div className={styles.ImageWrapper}>
            <img
              src={singleUser?.image}
              alt={singleUser?.image}
              className={styles.Image}
            />
          </div>
          <div className={styles.BottomContent}>
            <div className={styles.IconsWrapper}>
              {!editMode ? (
                <img
                  className={styles.Edit}
                  src={EditIcon}
                  onClick={onClickEditUser}
                />
              ) : (
                <img
                  className={styles.Edit}
                  src={ConfirmIcon}
                  onClick={onClickConfirmEditUser}
                />
              )}
              {!editMode ? (
                <img
                  className={styles.Edit}
                  src={DeleteIcon}
                  onClick={onClickDeleteUser}
                />
              ) : (
                <img
                  className={styles.Edit}
                  src={CloseIcon}
                  onClick={onClickCloseEditUser}
                />
              )}
            </div>
            {!editMode ? (
              <div className={styles.ContentContainer}>
                <div className={styles.TitleEditWrapper}>
                  <h2 className={styles.Title}>
                    {singleUser?.firstName} {singleUser?.lastName}
                  </h2>
                </div>
                <p className={styles.SmallFont}>
                  Age:
                  <span className={styles.BoldFont}>{singleUser?.age}</span>
                </p>
                <p className={styles.SmallFont}>
                  Email:
                  <span className={styles.BoldFont}>{singleUser?.email}</span>
                </p>
                <p className={styles.SmallFont}>
                  Gender:
                  <span className={styles.BoldFont}>{singleUser?.gender}</span>
                </p>
                <p className={styles.SmallFont}>
                  Phone:
                  <span className={styles.BoldFont}>{singleUser?.phone}</span>
                </p>
              </div>
            ) : (
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="firstName"
                  label="First Name"
                  defaultValue={singleUser?.firstName}
                  onChange={handleChange}
                />
                <TextField
                  id="lastName"
                  label=" Last Name"
                  defaultValue={singleUser?.lastName}
                  onChange={handleChange}
                />
                <TextField
                  id="age"
                  label="Age"
                  type="number"
                  defaultValue={singleUser?.age}
                  onChange={handleChange}
                />
                <div className={styles.RatingAndPrice}>
                  <TextField
                    id="gender"
                    label="Gender"
                    defaultValue={singleUser?.gender}
                    onChange={handleChange}
                  />
                  <TextField
                    id="email"
                    label="Email"
                    defaultValue={singleUser?.email}
                    onChange={handleChange}
                  />
                  <TextField
                    id="phone"
                    label="Phone"
                    defaultValue={singleUser?.phone}
                    onChange={handleChange}
                  />
                </div>
              </Box>
            )}
          </div>
          <ConfirmationDialog
            dialogOpen={dialogOpen}
            setDialogOpen={setDialogOpen}
            id={singleUser?.id}
            setOpen={setOpen}
            content={"user"}
          />
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop onTap={onClickCloseModal} />
    </Sheet>
  );
});
