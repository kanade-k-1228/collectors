import AddIcon from "@mui/icons-material/Add";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Fab } from "@mui/material";
import { addDoc } from "firebase/firestore";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { CollectionTemplate, database } from "../../Logic/firestore";

export function AddCollection(props: { userId: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Fab color="primary" aria-label="sign-out" {...props} onClick={() => setOpen(true)}>
        <AddIcon />
      </Fab>
      <AddCollectionDialog open={open} onClose={() => setOpen(false)} userId={props.userId} />
    </>
  );
}

function AddCollectionDialog(props: { open: boolean; onClose: () => void; userId: string }) {
  const [newCollection, setNewCollection] = useState<CollectionTemplate | undefined>(undefined);
  const onFileDrop = (files: File[]) => {
    console.log(files);
    files[0]
      .text()
      .then((text) => JSON.parse(text) as CollectionTemplate)
      .then((obj) => setNewCollection(obj));
  };
  const onSubmit = () => {
    if (!newCollection) {
      alert();
      return;
    }
    addDoc(database.collections(props.userId), {
      cid: "aaa",
      ...newCollection,
      ownerUid: props.userId,
      isPrivate: true,
    }).finally(() => props.onClose());
  };
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Add Collection</DialogTitle>
      <DialogActions>
        <Drop onDrop={onFileDrop} />
      </DialogActions>
      <DialogContent>
        <h4>{newCollection?.name}</h4>
        <ul>
          {newCollection?.items.map((item, i) => (
            <li key={i}>{item.title}</li>
          ))}
        </ul>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onSubmit}>
          SUBMIT
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function Drop(props: { onDrop: (files: File[]) => void }) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: props.onDrop,
  });
  return (
    <div className="container">
      <div
        {...getRootProps({ className: "dropzone" })}
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
          borderWidth: "2px",
          borderRadius: "2px",
          borderColor: "#eeeeee",
          borderStyle: "dashed",
          backgroundColor: "#fafafa",
          color: "#bdbdbd",
          outline: "none",
          transition: "border .24s ease-in-out",
        }}
      >
        <input {...getInputProps()} />
        <p>{`Upload template file. (Drag & drop, or click to select file.)`} </p>
      </div>
    </div>
  );
}
