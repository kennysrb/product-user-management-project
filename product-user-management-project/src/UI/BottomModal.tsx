import * as React from "react";
import Sheet from "react-modal-sheet";
import { observer } from "mobx-react-lite";
import styles from "./BottomModal.module.scss";
import CloseIcon from "../assets/images/icons/close-icon.png";

export const BottomModal = observer((props: any) => {
  const { open, setOpen, title, description, images } = props;
  const onClickCloseModal = () => {
    setOpen(false);
  };

  return (
    <>
      <Sheet
        className={styles.BottomModal}
        isOpen={open}
        disableDrag={false}
        onClose={() => {
          setOpen(false);
        }}
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
            <img src={images[0]} alt={images[0]} className={styles.Image} />
            <h1 className={styles.Title}>{title}</h1>
            <p className={styles.Text}>{description}</p>
          </Sheet.Content>
        </Sheet.Container>

        <Sheet.Backdrop onTap={onClickCloseModal} />
      </Sheet>
    </>
  );
});
