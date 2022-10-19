import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Link_type } from "../../shared/types";
import { useForm, FieldValues } from "react-hook-form";
import useAddLink from "../../shared/hooks/db/useAddLink";

type Props = {
  link_types: Link_type[];
};

const Insert = ({ link_types }: Props) => {
  const [open, setOpen] = useState(false);
  const { mutate: add, isLoading } = useAddLink();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const insertHandler = (data: any) => {
    add(data, {
      onSettled: () => {
        close();
      },
    });
  };

  const close = () => {
    setOpen(false);
    reset();
  };
  return (
    <>
      <Fab
        onClick={() => setOpen(true)}
        color="info"
        aria-label="add"
        sx={{ position: "fixed", bottom: 50, right: 30 }}
      >
        <AddIcon />
      </Fab>

      <Dialog fullWidth={true} open={open}>
        {!isLoading ? (
          <form onSubmit={handleSubmit(insertHandler)}>
            <DialogTitle>Add Link 🐱‍🏍</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="title"
                label="title"
                type="text"
                fullWidth
                variant="standard"
                required
                error={!!errors?.title}
                helperText={
                  !!errors?.title ? (errors?.title?.message as string) : ""
                }
                sx={{ mb: "1rem" }}
                {...register("title", {
                  maxLength: {
                    value: 80,
                    message: "title can't be longer than 80 characters!",
                  },
                })}
              />
              <TextField
                autoFocus
                margin="dense"
                id="url"
                label="url"
                type="url"
                fullWidth
                variant="standard"
                required
                error={!!errors?.url}
                helperText={
                  !!errors?.url ? (errors?.url?.message as string) : ""
                }
                sx={{ mb: "3rem" }}
                {...register("url", {
                  maxLength: {
                    value: 2048,
                    message: "url is too long!",
                  },
                })}
              />
              <FormControl fullWidth>
                <InputLabel id="type_select">Type</InputLabel>
                <Select
                  labelId="type_select"
                  id="type_select1"
                  defaultValue={1}
                  label="type"
                  {...register("type")}
                >
                  {link_types.map((t) => (
                    <MenuItem key={t.id} value={t.id}>
                      {t.type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
      </Dialog>
    </>
  );
};

export default Insert;
