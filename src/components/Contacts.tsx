import AccountIcon from "@mui/icons-material/AccountCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { cloneElement } from "react";

import { useAppDispatch, useAppSelector } from "../hooks";
import { contactsSelector, removeContact } from "../store";

export default function Contacts() {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(contactsSelector);

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} md={10}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Contacts
        </Typography>
        <List>
          {contacts.map((contact) => (
            <ListItem key={contact.id}>
              <ListItemAvatar>
                <Avatar>
                  <AccountIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={contact.name} />
              <Box sx={{ display: "flex" }}>
                <Tooltip title="Edit">
                  <IconButton
                    aria-label="edit"
                    onClick={() => {
                      dispatch({
                        type: "contacts/editContact",
                        payload: contact,
                      });
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton
                    aria-label="delete"
                    onClick={() => {
                      dispatch(removeContact({ id: contact.id }));
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
}
