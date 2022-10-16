import Button from "@mui/material/Button";
import React from "react";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import CircularProgress from "@mui/material/CircularProgress";
import useMagicLink from "../shared/hooks/auth/useMagicLink";
import { useState } from "react";

const MagicLink = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const { mutate, isLoading } = useMagicLink();

  const close = () => {
    setOpen(false);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(email, {
      onSuccess: () => setDone(true),
    });
  };

  return (
    <>
      <Button
        variant="outlined"
        color="info"
        sx={{
          p: "1rem",
          mb: "1rem",
          width: "100%",
        }}
        startIcon={<AutoFixHighIcon />}
        onClick={() => setOpen(true)}
      >
        Sign in via magic link
      </Button>
      <Dialog fullWidth={true} open={open} onClose={close}>
        <DialogTitle>Magic Link</DialogTitle>
        {!done ? (
          <>
            {!isLoading ? (
              <form onSubmit={submitHandler}>
                <DialogContent>
                  <DialogContentText mb="1rem">
                    pleses enter your email to get the link!
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="standard"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={close} color="error">
                    Cancel
                  </Button>
                  <Button type="submit">Send</Button>
                </DialogActions>
              </form>
            ) : (
              <DialogContent sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
              </DialogContent>
            )}
          </>
        ) : (
          <DialogContent>
            <DialogContentText mb="1rem">
              magic link has been sent!
            </DialogContentText>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
};

export default MagicLink;
