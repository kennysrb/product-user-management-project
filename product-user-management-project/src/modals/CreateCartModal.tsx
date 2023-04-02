import { useState } from "react";
import Sheet from "react-modal-sheet";
import { observer } from "mobx-react-lite";
import styles from "./CreateCartModal.module.scss";
import CloseIcon from "../assets/images/icons/close-icon.png";

import { useStore } from "../store";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  TextField,
} from "@mui/material";

export const CreateCartModal = observer((props: any) => {
  const { setOpen, open } = props;
  const {
    productStore: { products },
    cartStore: { createNewCart },
  } = useStore();

  const [formData, setFormData] = useState({
    userId: "",
    products: [],
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    if (id === "userId") {
      setFormData({
        ...formData,
        userId: value,
      });
    } else {
      // Otherwise, update the regular property
      const newProductData = {
        ...formData,
        products: event.target.checked
          ? [...formData.products, { id: value, quantity: 1 }]
          : formData.products.filter(
              (productId: string) => productId !== value
            ),
      };
      setFormData(newProductData);
    }
  };

  const onClickCloseModal = () => {
    setOpen(false);
  };
  const handleSubmit = (event: any) => {
    event.preventDefault();
    createNewCart(formData);
    setFormData({
      userId: "",
      products: [],
    });
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
              <TextField
                type="number"
                InputProps={{
                  inputProps: { min: 1, max: 100 },
                  onKeyPress: (event: any) => {
                    const value = parseInt(event.target.value + event.key);
                    if (value > 100 || event.key === "-") {
                      event.preventDefault();
                    }
                  },
                }}
                id="userId"
                label="User ID values 1-100"
                onChange={handleChange}
              />
              <FormLabel component="legend">Select products:</FormLabel>
              <FormGroup>
                {products.map((product: any) => {
                  return (
                    <FormControlLabel
                      control={<Checkbox onChange={handleChange} />}
                      key={product.id}
                      value={product.id}
                      label={`${product.title} - ${product.price}$`}
                    />
                  );
                })}
              </FormGroup>
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
