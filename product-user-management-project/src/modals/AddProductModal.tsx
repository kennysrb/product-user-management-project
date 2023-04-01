import { useState } from "react";
import Sheet from "react-modal-sheet";
import { observer } from "mobx-react-lite";
import styles from "./AddProductModal.module.scss";
import CloseIcon from "../assets/images/icons/close-icon.png";

import { useStore } from "../store";
import { Box, Button, TextField } from "@mui/material";

export const AddProductModal = observer((props: any) => {
  const { setOpen, open } = props;
  const {
    productStore: { createNewProduct },
  } = useStore();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    brand: "",
    rating: "",
    discountPercentage: "",
    price: "",
    stock: "",
  });
  const handleChange = (event: any) => {
    const { id, value } = event.target;
    const newProductData = {
      ...formData,
      [id]: value,
    };
    setFormData(newProductData);
  };

  const onClickCloseModal = () => {
    setOpen(false);
  };
  const handleSubmit = (event: any) => {
    event.preventDefault();
    createNewProduct(formData);
    setOpen(false);
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
              <TextField id="title" label="Title" onChange={handleChange} />
              <TextField
                id="description"
                label="Description"
                multiline
                rows={4}
                onChange={handleChange}
              />
              <TextField id="brand" label="Brand" onChange={handleChange} />
              <div className={styles.RatingAndPrice}>
                <TextField
                  id="rating"
                  label="Rating"
                  type="number"
                  onChange={handleChange}
                />
                <TextField
                  id="stock"
                  label="Stock"
                  type="number"
                  onChange={handleChange}
                />
                <TextField
                  id="discountPercentage"
                  label="Discount %"
                  type="number"
                  onChange={handleChange}
                />
                <TextField
                  id="price"
                  label="Price €"
                  type="number"
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
