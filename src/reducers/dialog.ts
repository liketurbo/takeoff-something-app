import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppState } from "../store";
import { ContactId } from "./contacts";

const dialogSlice = createSlice({
  name: "dialog",
  initialState: {
    open: false,
    contactId: null as ContactId | null,
  },
  reducers: {
    open: (state, action: PayloadAction<{ contactId: ContactId | null }>) => {
      state.open = true;
      state.contactId = action.payload.contactId;
    },
    close: (state) => {
      state.open = false;
      state.contactId = null;
    },
  },
});

export const dialogReducer = dialogSlice.reducer;

export const dialogSelector = (state: AppState) => state.dialog;

export const { open: openDialog, close: closeDialog } = dialogSlice.actions;
