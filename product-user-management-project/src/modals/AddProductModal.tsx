import { useRef, useState } from "react";
import Sheet from "react-modal-sheet";
import { observer, useObserver } from "mobx-react-lite";
import styles from "./AddProductModal.module.scss";
import CloseIcon from "../assets/images/icons/close-icon.png";
import EditIcon from "../assets/images/icons/edit-icon.png";
import ConfirmIcon from "../assets/images/icons/checkmark-icon.png";
import DeleteIcon from "../assets/images/icons/delete-icon.png";
import { useStore } from "../store";
import { Box, Button, TextField } from "@mui/material";
import ConfirmationDialog from "../UI/ConfirmationDialog";

export const AddProductModal = observer((props: any) => {
  const {
    open,
    setOpen,
    title,
    description,
    brand,
    rating,
    discountPercentage,
    price,
  } = props;
  const {
    productStore: { singleProduct, removeSingleProduct, updateProduct },
  } = useStore();
  const [editMode, setEditMode] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: title || "",
    description: description || "",
    brand: brand || "",
    rating: rating || "",
    discountPercentage: discountPercentage || "",
    price: price || "",
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
    removeSingleProduct();
  };
  const onClickEditProduct = () => {
    setEditMode(true);
  };
  const onClickConfirmEditProduct = (event: any) => {
    event.preventDefault();
    updateProduct(singleProduct?.id, formData);
    setEditMode(false);
  };
  const onClickCloseEditProduct = () => {
    setEditMode(false);
  };
  const onClickDeleteProduct = () => {
    setDialogOpen(true);
  };
  return (
    <div className={styles.BottomContent}>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="title"
          label="Title"
          defaultValue={singleProduct?.title}
          onChange={handleChange}
        />
        <TextField
          id="description"
          label="Description"
          multiline
          rows={4}
          defaultValue={singleProduct?.description}
          onChange={handleChange}
        />
        <TextField
          id="brand"
          label="Brand"
          defaultValue={singleProduct?.brand}
          onChange={handleChange}
        />
        <div className={styles.RatingAndPrice}>
          <TextField
            id="rating"
            label="Rating"
            defaultValue={singleProduct?.rating}
            onChange={handleChange}
          />
          <TextField
            id="discountPercentage"
            label="Discount %"
            defaultValue={singleProduct?.discountPercentage}
            onChange={handleChange}
          />
          <TextField
            id="price"
            label="Price €"
            defaultValue={singleProduct?.price}
            onChange={handleChange}
          />
        </div>
      </Box>
    </div>
  );
});
