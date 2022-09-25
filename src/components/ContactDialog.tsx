import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import { set } from "immer/dist/internal";
import { setRevalidateHeaders } from "next/dist/server/send-payload";
import { useCallback, useEffect, useMemo } from "react";
import { FieldValues, useForm } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "../hooks";
import {
  addContact,
  contactsSelector,
  updateContact,
} from "../reducers/contacts";
import { closeDialog, dialogSelector, openDialog } from "../reducers/dialog";

export default function AddContact() {
  const dispatch = useAppDispatch();

  const contacts = useAppSelector(contactsSelector);
  const { contactId, open } = useAppSelector(dialogSelector);

  const contact = useMemo(() => {
    if (contactId) {
      return contacts.find((contact) => contact.id === contactId);
    }
  }, [contactId, contacts]);

  const {
    register,
    handleSubmit: handleSubmitForm,
    reset,
    setValue,
  } = useForm();

  useEffect(() => {
    if (contact) {
      setValue("name", contact.name);
    } else {
      setValue("name", "");
    }
  }, [contact, setValue]);

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
        <DialogTitle>{contact ? "Update" : "Add"}&nbsp;Contact</DialogTitle>
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
              <Button type="submit">{contact ? "Update" : "Add"}</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
