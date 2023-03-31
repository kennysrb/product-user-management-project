import * as React from "react";
import Sheet from "react-modal-sheet";
import { observer } from "mobx-react-lite";
import styles from "./BottomModal.module.scss";
import CloseIcon from "../assets/images/icons/close-icon.png";
import EditIcon from "../assets/images/icons/edit-icon.png";
import ConfirmIcon from "../assets/images/icons/checkmark-icon.png";
import { useStore } from "../store";

export const BottomModal = observer((props: any) => {
  const { open, setOpen } = props;
  const {
    productStore: { singleProduct, removeSingleProduct },
  } = useStore();
  const [editMode, setEditMode] = React.useState(false);
  const onClickCloseModal = () => {
    setOpen(false);
    setEditMode(false);
    removeSingleProduct();
  };
  const onClickEditProduct = () => {
    setEditMode(true);
  };
  const onClickConfirmEditProduct = () => {
    setEditMode(false);
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
            <img
              src={singleProduct?.thumbnail}
              alt={singleProduct?.thumbnail}
              className={styles.Image}
            />
            <div className={styles.ContentContainer}>
              <div className={styles.TitleEditWrapper}>
                {!editMode ? (
                  <h2 className={styles.Title}>{singleProduct?.title}</h2>
                ) : (
                  <input
                    className={styles.Input}
                    value={singleProduct?.title}
                  />
                )}
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
              </div>
              <p className={styles.SmallFont}>
                Brand:{" "}
                {!editMode ? (
                  <span className={styles.BoldFont}>
                    {singleProduct?.brand}
                  </span>
                ) : (
                  <input
                    className={styles.Input}
                    value={singleProduct?.brand}
                  />
                )}
              </p>
              <p className={styles.SmallFont}>Description:</p>
              {!editMode ? (
                <p className={styles.Text}>{singleProduct?.description}</p>
              ) : (
                <textarea
                  className={styles.Textarea}
                  value={singleProduct?.description}
                />
              )}

              <div className={styles.RatingAndPrice}>
                <p className={styles.SmallFont}>
                  Rating:{" "}
                  {!editMode ? (
                    <span className={styles.BoldFont}>
                      {singleProduct?.rating}
                    </span>
                  ) : (
                    <input
                      className={styles.Input}
                      value={singleProduct?.rating}
                    />
                  )}
                </p>
                <p className={styles.SmallFont}>
                  Discount:{" "}
                  {!editMode ? (
                    <span className={styles.BoldFont}>
                      {singleProduct?.discountPercentage}%
                    </span>
                  ) : (
                    <input
                      className={styles.Input}
                      value={singleProduct?.rating}
                    />
                  )}
                </p>
                <p>
                  Price:{" "}
                  {!editMode ? (
                    <span className={styles.BoldFont}>
                      {singleProduct?.price}€
                    </span>
                  ) : (
                    <input
                      className={styles.Input}
                      value={singleProduct?.rating}
                    />
                  )}
                </p>
              </div>
            </div>
          </Sheet.Content>
        </Sheet.Container>

        <Sheet.Backdrop onTap={onClickCloseModal} />
      </Sheet>
    </>
  );
});
