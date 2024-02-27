import React, { createContext, useContext } from 'react';
import { crudServices } from '../Service/index';

const CrudContext = createContext();

export const useCrud = () => useContext(CrudContext);

export const CrudProvider = ({ children }) => {
  return (
    <CrudContext.Provider value={crudServices}>
      {children}
    </CrudContext.Provider>
  );
};
