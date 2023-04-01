import { useRef, useState } from "react";
import Sheet from "react-modal-sheet";
import { observer, useObserver } from "mobx-react-lite";
import styles from "./EditProductModal.module.scss";
import CloseIcon from "../assets/images/icons/close-icon.png";
import EditIcon from "../assets/images/icons/edit-icon.png";
import ConfirmIcon from "../assets/images/icons/checkmark-icon.png";
import DeleteIcon from "../assets/images/icons/delete-icon.png";
import { useStore } from "../store";
import ConfirmationDialog from "./ConfirmationDialog";
import { Box, Button, TextField } from "@mui/material";

export const EditProductModal = observer((props: any) => {
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
    <>
      <Sheet
        className={styles.BottomModal}
        isOpen={open}
        disableDrag={false}
        onClose={onClickCloseModal}
      >
        <Sheet.Container className={styles.Container}>
          <Sheet.Header>
            <div
              className={styles.CloseIconWrapper}
              onClick={onClickCloseModal}
            >
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
                src={singleProduct?.thumbnail}
                alt={singleProduct?.thumbnail}
                className={styles.Image}
              />
            </div>
            <div className={styles.BottomContent}>
              <div className={styles.IconsWrapper}>
                {!editMode ? (
                  <img
                    className={styles.Edit}
                    src={EditIcon}
                    onClick={onClickEditProduct}
                  />
                ) : (
                  <img
                    className={styles.Edit}
                    src={ConfirmIcon}
                    onClick={onClickConfirmEditProduct}
                  />
                )}
                {!editMode ? (
                  <img
                    className={styles.Edit}
                    src={DeleteIcon}
                    onClick={onClickDeleteProduct}
                  />
                ) : (
                  <img
                    className={styles.Edit}
                    src={CloseIcon}
                    onClick={onClickCloseEditProduct}
                  />
                )}
              </div>
              {!editMode ? (
                <div className={styles.ContentContainer}>
                  <div className={styles.TitleEditWrapper}>
                    <h2 className={styles.Title}>{singleProduct?.title}</h2>
                  </div>
                  <p className={styles.SmallFont}>
                    Brand:
                    <span className={styles.BoldFont}>
                      {singleProduct?.brand}
                    </span>
                  </p>
                  <p className={styles.SmallFont}>Description:</p>
                  <p className={styles.Text}>{singleProduct?.description}</p>

                  <div className={styles.RatingAndPrice}>
                    <p className={styles.SmallFont}>
                      Rating:{" "}
                      <span className={styles.BoldFont}>
                        {singleProduct?.rating}
                      </span>
                    </p>
                    <p className={styles.SmallFont}>
                      Discount:{" "}
                      <span className={styles.BoldFont}>
                        {singleProduct?.discountPercentage}%
                      </span>
                    </p>
                    <p>
                      Price:{" "}
                      <span className={styles.BoldFont}>
                        {singleProduct?.price}€
                      </span>
                    </p>
                  </div>
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
              )}
            </div>
            <ConfirmationDialog
              dialogOpen={dialogOpen}
              setDialogOpen={setDialogOpen}
              id={singleProduct?.id}
              setOpen={setOpen}
              content={"product"}
            />
          </Sheet.Content>
        </Sheet.Container>

        <Sheet.Backdrop onTap={onClickCloseModal} />
      </Sheet>
    </>
  );
});
