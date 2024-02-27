import React, { createContext, useReducer, useContext } from 'react';
import globalReducer from '../Reducers';

const GlobalStateContext = createContext();
const GlobalDispatchContext = createContext();

const initialState = {
  modalOpen: false,
  modalContent: null,
};

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  return (
    <GlobalDispatchContext.Provider value={dispatch}>
      <GlobalStateContext.Provider value={state}>
        {children}
      </GlobalStateContext.Provider>
    </GlobalDispatchContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);
export const useGlobalDispatch = () => useContext(GlobalDispatchContext);
