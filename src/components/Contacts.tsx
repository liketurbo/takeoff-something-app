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

function generate(element: React.ReactElement) {
  return [0, 1, 2].map((value) =>
    cloneElement(element, {
      key: value,
    })
  );
}

export default function Contacts() {
  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} md={10}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Contacts
        </Typography>
        <List>
          {generate(
            <ListItem
              secondaryAction={
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Tooltip title="Edit">
                    <IconButton edge="end" aria-label="delete">
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              }
            >
              <ListItemAvatar>
                <Avatar>
                  <AccountIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Single-line item" />
            </ListItem>
          )}
        </List>
      </Grid>
    </Grid>
  );
}
