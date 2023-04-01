import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useStore } from "../store";

export default function ConfirmationDialog(props: any) {
  const { dialogOpen, setDialogOpen, id, setOpen, content } = props;
  const {
    productStore: { deleteProduct },
    userStore: { deleteUser },
  } = useStore();
  const handleClose = () => {
    setDialogOpen(false);
  };
  const handleDelete = async () => {
    switch (content) {
      case "product":
        await deleteProduct(id);
        break;
      case "user":
        await deleteUser(id);
        break;
      // case "cart":
      //   deleteCart(id);
      //   break;
    }
    setDialogOpen(false);
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete selected {content}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} autoFocus>
            Yes
          </Button>
          <Button onClick={handleClose}>No</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
