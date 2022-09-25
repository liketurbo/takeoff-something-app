import { configureStore } from "@reduxjs/toolkit";

import { contactsReducer } from "./reducers/contacts";
import { dialogReducer } from "./reducers/dialog";

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    dialog: dialogReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
