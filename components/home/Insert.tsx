//MUI
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
//types
import { Link_type } from "../../shared/types";
//hooks
import { useForm, Controller } from "react-hook-form";
import useAddLink from "../../shared/hooks/db/useAddLink";
import useEditLink from "../../shared/hooks/db/useEditLink";
import { useEdit } from "../../shared/store";
import { useEffect } from "react";

type Props = {
  link_types: Link_type[];
};

const Insert = ({ link_types }: Props) => {
  const isOpen = useEdit((store) => store.isOpen);
  const closeModal = useEdit((store) => store.close);
  const openModal = useEdit((store) => store.open);
  const EditLink = useEdit((store) => store.EditLink);
  const ClearEdit = useEdit((store) => store.clearEdit);
  const { mutate: Add, isLoading: AddLoading } = useAddLink();
  const { mutate: Edit, isLoading: EdiLoading } = useEditLink();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    control,
  } = useForm({
    defaultValues: {
      title: "",
      url: "",
      type: 1,
    },
  });

  const insertHandler = (data: any) => {
    if (!EditLink) {
      Add(data, {
        onSettled: () => {
          close();
        },
      });
    } else {
      Edit(
        { ...data, id: EditLink.id },
        {
          onSettled: () => {
            close();
          },
        }
      );
    }
  };

  const close = () => {
    if (EditLink) ClearEdit();
    closeModal();
    reset();
  };

  useEffect(() => {
    if (EditLink) {
      setValue("title", EditLink.title);
      setValue("url", EditLink.url);
      setValue("type", EditLink.tid);
    }
  }, [EditLink]);

  return (
    <>
      <Fab
        onClick={openModal}
        color="info"
        aria-label="add"
        sx={{ position: "fixed", bottom: 15, right: 25 }}
      >
        <AddIcon />
      </Fab>

      <Dialog fullWidth={true} open={isOpen}>
        {!(AddLoading || EdiLoading) ? (
          <form onSubmit={handleSubmit(insertHandler)}>
            <DialogTitle>{EditLink ? "Edit" : "Add"} Link 👇</DialogTitle>
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
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel id="type_select">Type</InputLabel>
                    <Select
                      labelId="type_select"
                      id="type_select1"
                      label="type"
                      {...field}
                    >
                      {link_types.map((t) => (
                        <MenuItem key={t.id} value={t.id}>
                          {t.type}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={close} color="error">
                Cancel
              </Button>
              <Button type="submit">{EditLink ? "update" : "send"}</Button>
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
