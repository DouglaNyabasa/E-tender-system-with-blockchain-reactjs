import React, { createContext } from "react";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {








  return (
    <AdminContext.Provider >
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
