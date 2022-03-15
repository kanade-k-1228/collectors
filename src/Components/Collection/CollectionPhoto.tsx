import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { noimg } from "../../consts";
import { Collection, Item } from "../../Logic/firestore";
import { ItemDialog } from "./ItemDialog";

export function CollectionPhoto(props: {
  collection: Collection;
  editCollection?: (newCollectionData: Collection) => Promise<void>;
}) {
  return (
    <ImageList>
      {props.collection.items.map((item, i) => (
        <PhotoItem item={item} key={i} />
      ))}
    </ImageList>
  );
}

function PhotoItem(props: { item: Item }) {
  const img = props.item.img ? props.item.img[0] : noimg ?? noimg;
  const title = props.item.title;
  const subtitle = props.item.subtitle;
  const [open, setOpen] = useState(false);
  return (
    <>
      <ImageListItem onClick={() => setOpen(true)}>
        <img src={img} srcSet={img} alt={title} loading="lazy" />
        <ImageListItemBar title={title} subtitle={subtitle} />
      </ImageListItem>
      <ItemDialog isOpen={open} onClose={() => setOpen(false)} item={props.item} />
    </>
  );
}
