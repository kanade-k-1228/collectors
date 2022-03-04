import AddIcon from "@mui/icons-material/Add";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Fab } from "@mui/material";
import { addDoc } from "firebase/firestore";
import { useState } from "react";
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
  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    e.target.files
      ?.item(0)
      ?.text()
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
      <DialogContent>Upload template file</DialogContent>
      <DialogActions>
        <input type="file" id="file" accept="application/json" onChange={onFileInputChange} />
      </DialogActions>
      <DialogContent>
        <h4>{newCollection?.name}</h4>
        <ul>
          {newCollection?.items.map((item, i) => (
            <li key={i}>
              {item.title} - {item.subtitle}
            </li>
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
