import React, { createContext, useReducer } from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Global styles for your application
import { RouterProvider } from "react-router-dom"; // Import RouterProvider to use the router
import { router } from "./routes"; // Import the router configuration

export const Context = createContext();

const reducter = (store, action) => {
  if (action.type === "CREATE_CONTACT") {
    const updatedContactList = [...store.contactList, action.value];
    return { ...store, contactList: updatedContactList };
  }
  if (action.type === "EDIT_CONTACT") {
    const updatedContactList = store.contactList.map((contact, index) => {
      if (index === action.position) {
        return action.value;
      }
      return contact;
    });
    return { ...store, contactList: updatedContactList };
  }

  if (action.type === "REMOVE_CONTACT") {
    const updatedContactList = store.contactList.filter((_, index) => {
      return action.position !== index;
    });
    return { ...store, contactList: updatedContactList };
  }
  return store;
};

const Main = () => {
  const [store, dispatch] = useReducer(reducter, {
    contactList: [
      {
        name: "",
        email: "ejemplo@mail.com",
        Phone: "",
        Adress: "",
      },
    ],
  });

  return (
    <React.StrictMode>
      {/* Provide global state to all components */}
      <Context.Provider value={{ store, dispatch }}>
        {/* Set up routing for the application */}
        <RouterProvider router={router}></RouterProvider>
      </Context.Provider>
    </React.StrictMode>
  );
};

// Render the Main component into the root DOM element.
ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
