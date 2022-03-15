import { Button, CardMedia, Dialog, DialogContent, Typography } from "@mui/material";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import * as React from "react";
import ReactMarkdown from "react-markdown";
import { noimg } from "../../consts";
import { storage } from "../../Logic/firebase";
import { Item } from "../../Logic/firestore";

export function ItemDialog(props: { isOpen: boolean; onClose: () => void; item: Item; addImg?: (file: File) => void }) {
  const img = props.item.img ? props.item.img[0] : noimg ?? noimg;
  const title = props.item.title;
  const subtitle = props.item.subtitle;
  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0);
    if (file) {
      // props.addImg?(file);
      const date = new Date();
      const time = date.getTime();
      const fileType = file.name.split(".").pop();
      const storageRef = ref(storage, `${time}.${fileType}`);
      uploadBytes(storageRef, file)
        .then((snapshot) => getDownloadURL(snapshot.ref))
        .then((url) => console.log(url));
    }
  };
  return (
    <Dialog open={props.isOpen} onClose={props.onClose}>
      <Button component="label" sx={{ padding: 0 }}>
        <CardMedia component="img" image={img} width={720} />
        <input type="file" accept="image" style={{ display: "none" }} onChange={onFileInputChange} />
      </Button>
      <DialogContent sx={{ padding: "0 1em" }}>
        <Typography gutterBottom variant="h4" align="center" m={0} sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>
        <Typography gutterBottom variant="h5" align="center" m={0} sx={{ fontWeight: "bold" }}>
          {subtitle}
        </Typography>
        <Typography gutterBottom variant="h6" align="center" m={0} sx={{ fontWeight: "bold" }}>
          {props.item.date}
        </Typography>
        <ReactMarkdown>{props.item.note?.replaceAll("\\n", "\n") ?? ""}</ReactMarkdown>
      </DialogContent>
    </Dialog>
  );
}
