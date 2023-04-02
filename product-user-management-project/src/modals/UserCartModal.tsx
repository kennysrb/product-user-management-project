import { useState } from "react";
import Sheet from "react-modal-sheet";
import { observer } from "mobx-react-lite";
import styles from "./UserInfoModal.module.scss";
import CloseIcon from "../assets/images/icons/close-icon.png";
import EditIcon from "../assets/images/icons/edit-icon.png";
import DeleteIcon from "../assets/images/icons/delete-icon.png";
import ConfirmIcon from "../assets/images/icons/checkmark-icon.png";
import { useStore } from "../store";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import ConfirmationDialog from "../UI/ConfirmationDialog";

export const UserCartModal = observer((props: any) => {
  const { open, setOpen } = props;
  const {
    cartStore: { singleCart, updateCart, removeSingleCart },
  } = useStore();
  const [editMode, setEditMode] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    userId: singleCart?.userId || "",
    products: singleCart?.products || [],
  });
  const handleChange = (event: any) => {
    const { id, value } = event.target;
    const newProductData = {
      ...formData,
      products: event.target.checked
        ? [...formData.products, { id: value, quantity: 1 }]
        : formData.products.filter((productId: string) => productId !== value),
    };
    setFormData(newProductData);
  };

  const onClickCloseModal = () => {
    setOpen(false);
    setEditMode(false);
    removeSingleCart();
  };
  const onClickEditCart = () => {
    setEditMode(true);
  };
  const onClickConfirmEditCart = (event: any) => {
    event.preventDefault();
    updateCart(singleCart?.id, formData);
    setEditMode(false);
  };
  const onClickCloseEditCart = () => {
    setEditMode(false);
  };
  const onClickDeleteCart = () => {
    setDialogOpen(true);
  };
  let totalPrice = 0;
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
            <div className={styles.IconsWrapper}>
              {!editMode ? (
                <img
                  className={styles.Edit}
                  src={EditIcon}
                  onClick={onClickEditCart}
                />
              ) : (
                <img
                  className={styles.Edit}
                  src={ConfirmIcon}
                  onClick={onClickConfirmEditCart}
                />
              )}
              {!editMode ? (
                <img
                  className={styles.Edit}
                  src={DeleteIcon}
                  onClick={onClickDeleteCart}
                />
              ) : (
                <img
                  className={styles.Edit}
                  src={CloseIcon}
                  onClick={onClickCloseEditCart}
                />
              )}
            </div>
            {!editMode ? (
              <div className={styles.ContentContainer}>
                Products:
                <ul>
                  {singleCart?.products?.map((product: any, index: number) => (
                    <li key={index} className={styles.ProductWrapper}>
                      {(totalPrice += product?.price)}
                      {product?.title} {product?.price}$
                    </li>
                  ))}
                </ul>
                <hr></hr>
                <p className={styles.SmallFont}>
                  Total price:
                  <span className={styles.BoldFont}>
                    {singleCart?.discountedTotal}$
                  </span>
                </p>
                <p className={styles.SmallFont}>
                  Discount value:
                  <span className={styles.BoldFont}>
                    {totalPrice - singleCart?.discountedTotal}$
                  </span>
                </p>
                <p className={styles.SmallFont}>
                  Discounted price:
                  <span className={styles.BoldFont}>{totalPrice}$</span>
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
                <FormLabel component="legend">Select products:</FormLabel>
                <FormGroup>
                  {singleCart?.products?.map((product: any) => {
                    return (
                      <FormControlLabel
                        control={
                          <Checkbox onChange={handleChange} defaultChecked />
                        }
                        key={product.id}
                        value={product.id}
                        label={`${product.title} - ${product.price}$`}
                      />
                    );
                  })}
                </FormGroup>
              </Box>
            )}
          </div>
          <ConfirmationDialog
            dialogOpen={dialogOpen}
            setDialogOpen={setDialogOpen}
            id={singleCart?.id}
            setOpen={setOpen}
            content={"cart"}
          />
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop onTap={onClickCloseModal} />
    </Sheet>
  );
});
