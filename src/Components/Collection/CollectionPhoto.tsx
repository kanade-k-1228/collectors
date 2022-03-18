import { Box, Card, CardMedia, Grid, Typography } from "@mui/material";
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
    <Grid container spacing={1} p={1}>
      {props.collection.items.map((item, i) => (
        <PhotoItem item={item} key={i} />
      ))}
    </Grid>
  );
}

function PhotoItem(props: { item: Item }) {
  const img = props.item.img ? props.item.img[0] : noimg ?? noimg;
  const title = props.item.title;
  const subtitle = props.item.subtitle;
  const [open, setOpen] = useState(false);
  return (
    <>
      <Grid
        item
        xs={6}
        sm={4}
        md={3}
        lg={2}
        xl={2}
        sx={{
          position: "relative",
          width: "100%",
          "&::after": {
            content: '""',
            display: "block",
            paddingBottom: "100%",
          },
        }}
        onClick={() => setOpen(true)}
      >
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            paddingRight: 1,
            paddingBottom: 1,
          }}
        >
          <Card
            sx={{
              padding: 0,
              height: "100%",
              borderRadius: 4,
              position: "relative",
            }}
          >
            <CardMedia height="100%" component="img" image={img} sx={{ objectFit: "cover", width: "100%" }} />
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                backgroundColor: "rgba(0,0,0,0.3)",
                padding: 1,
              }}
            >
              <Typography align="center" m={0} sx={{ color: "#FFFFFF" }}>
                {title}
              </Typography>
              <Typography align="center" m={0} sx={{ color: "#FFFFFF" }}>
                {subtitle}
              </Typography>
            </Box>
          </Card>
        </Box>
      </Grid>
      <ItemDialog isOpen={open} onClose={() => setOpen(false)} item={props.item} />
    </>
  );
}
