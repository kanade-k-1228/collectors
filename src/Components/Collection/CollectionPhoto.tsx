import { Card, CardMedia, Grid, ImageListItem, ImageListItemBar, Typography } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { noimg } from "../../consts";
import { Collection, Item } from "../../Logic/firestore";
import { ItemDialog } from "./ItemDialog";

export function CollectionPhoto(props: { collection: Collection }) {
  return (
    <>
      <Grid container spacing={1} p={1}>
        {props.collection.items.map((item, i) => (
          <PhotoItem item={item} key={i} />
        ))}
      </Grid>
    </>
  );
}

function PhotoItem(props: { item: Item }) {
  const img = props.item.img ? props.item.img[0] : noimg ?? noimg;
  const title = props.item.title;
  const subtitle = props.item.subtitle;
  const [open, setOpen] = useState(false);
  return (
    <>
      <Grid item xs={6} sm={4} md={3} lg={2} xl={2}>
        <ImageListItem onClick={() => setOpen(true)}>
          <img src={img} srcSet={img} alt={title} loading="lazy" />
          <ImageListItemBar title={title} subtitle={subtitle} />
        </ImageListItem>
      </Grid>
      <ItemDialog isOpen={open} onClose={() => setOpen(false)} item={props.item} />
    </>
  );
}

function ItemCard(props: { item: Item }) {
  const img = props.item.img ? props.item.img[0] : noimg ?? noimg;
  const title = props.item.title;
  const subtitle = props.item.subtitle;
  const [open, setOpen] = useState(false);
  const [postFileData, setPostFileData] = useState({});
  const changeUploadFile = async (event: any) => {
    const { name, files } = event.target;
    setPostFileData({
      ...postFileData,
      [name]: files[0],
    });
    event.target.value = "";
  };
  return (
    <>
      <Grid item xs={6} sm={4} md={3} lg={2} xl={2}>
        <Card sx={{ padding: 0, height: "100%" }} onClick={() => setOpen(true)}>
          <div
            style={{
              height: 0,
              width: "100%",
              paddingBottom: "100%",
            }}
          >
            <div style={{ width: "100%", height: "100%", padding: "-100px" }}></div>
          </div>
          <CardMedia component="img" image={img} sx={{ objectFit: "cover", width: "100%" }} />
          <Typography gutterBottom variant="h5" align="center" m={0} sx={{ fontWeight: "bold" }}>
            {title}
          </Typography>
          <Typography gutterBottom variant="h6" align="center" m={0}>
            {subtitle}
          </Typography>
        </Card>
      </Grid>
      <ItemDialog isOpen={open} onClose={() => setOpen(false)} item={props.item} />
    </>
  );
}
