import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styles from "./SingleProduct.module.scss";
import { BottomModal } from "../UI/BottomModal";
import { useStore } from "../store";

export default function SingleProduct(props: any) {
  const { title, description, price, images, id } = props;
  const {
    productStore: { getSinglePRoduct },
  } = useStore();
  const [isOpen, setOpen] = React.useState(false);

  const openModal = () => {
    getSinglePRoduct(id);
    //the above call here is unneccessary since at this point I already have all products stored, but it's just for the sake of the demo to show how to call get single product method
    setOpen(true);
  };
  return (
    <>
      <Card sx={{ maxWidth: 345 }} className={styles.Card}>
        <CardMedia sx={{ height: 140 }} image={images[0]} title={title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={openModal} size="small" className={styles.Button}>
            More details
          </Button>
        </CardActions>
      </Card>
      <BottomModal open={isOpen} setOpen={setOpen} {...props} />
    </>
  );
}
