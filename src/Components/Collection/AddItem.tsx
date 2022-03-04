import AddIcon from "@mui/icons-material/Add";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Fab, Stack, TextField } from "@mui/material";
import { useState } from "react";

export function AddItem(props: any) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Fab color="primary" aria-label="sign-out" {...props} onClick={() => setOpen(true)}>
        <AddIcon />
      </Fab>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>User</DialogTitle>
        <DialogContent>
          <Stack spacing={2} direction="row">
            <TextField margin="dense" id="name" label="New User Name" type="user" fullWidth variant="standard" />
            <Button type="submit" variant="contained">
              Send
            </Button>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button fullWidth variant="contained">
            signout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
