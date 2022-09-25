import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

const contactsSlice = createSlice({
  name: "contacts",
  initialState: [
    {
      id: 0,
      name: "John Doe",
    },
    {
      id: 1,
      name: "Jane Doe",
    },
  ] as Contact[],
  reducers: {
    add: (state, action: PayloadAction<NewContact>) => {
      const contact = {
        id: state.length + 1,
        ...action.payload,
      };
      state.push(contact);
    },
    update: (
      state,
      action: PayloadAction<{
        id: ContactId;
        newData: NewContact;
      }>
    ) => {
      const { id, newData } = action.payload;
      const contact = state.find((contact) => contact.id === id);
      if (contact) {
        contact.name = newData.name;
      }
    },
    remove: (state, action: PayloadAction<{ id: ContactId }>) => {
      const { id } = action.payload;
      const index = state.findIndex((contact) => contact.id === id);
      if (index !== -1) {
        state.splice(index, 1);
      }
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

export const contactsSelector = (state: AppState) => state.contacts;

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
