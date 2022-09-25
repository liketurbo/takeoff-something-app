import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import { useCallback } from "react";
import { FieldValues, useForm } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "../hooks";
import { addContact, updateContact } from "../reducers/contacts";
import { closeDialog, dialogSelector, openDialog } from "../reducers/dialog";

export default function AddContact() {
  const dispatch = useAppDispatch();
  const { contactId, open } = useAppSelector(dialogSelector);

  const { register, handleSubmit: handleSubmitForm, reset } = useForm();

  const handleOpen = useCallback(() => {
    dispatch(openDialog({ contactId: null }));
  }, [dispatch]);

  const handleClose = useCallback(() => {
    dispatch(closeDialog());
  }, [dispatch]);

  const handleSubmit = useCallback(
    (data: FieldValues) => {
      if (contactId === null) {
        dispatch(addContact({ name: data.name }));
      } else {
        dispatch(
          updateContact({ id: contactId, newData: { name: data.name } })
        );
      }

      reset();
      handleClose();
    },
    [reset, handleClose, contactId, dispatch]
  );

  return (
    <>
      <Tooltip title="Add">
        <IconButton aria-label="add" onClick={handleOpen}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Contact</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmitForm(handleSubmit)}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
              required
              {...register("name")}
            />
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Add</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
