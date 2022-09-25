import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    contacts: [] as Contact[],
  },
  reducers: {
    add: (state, action: PayloadAction<NewContact>) => {
      const contact = {
        id: state.contacts.length + 1,
        ...action.payload,
      };
      state.contacts.push(contact);
    },
    update: (
      state,
      action: PayloadAction<{
        id: ContactId;
        newData: NewContact;
      }>
    ) => {
      const { id, newData } = action.payload;
      const contact = state.contacts.find((contact) => contact.id === id);
      if (contact) {
        contact.name = newData.name;
      }
    },
    remove: (state, action: PayloadAction<{ id: ContactId }>) => {
      state.contacts = state.contacts.filter(
        (contact) => contact.id !== action.payload.id
      );
    },
  },
});

export const store = configureStore({
  reducer: {
    contacts: contactsSlice.reducer,
  },
});

export const {
  add: addContact,
  update: updateContact,
  remove: removeContact,
} = contactsSlice.actions;

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type NewContact = {
  name: string;
};

export type Contact = {
  id: ContactId;
  name: string;
};

export type ContactId = number;
