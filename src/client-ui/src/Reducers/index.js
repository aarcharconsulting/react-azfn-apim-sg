import { CLOSE_MODAL, OPEN_MODAL } from "../Constants";

const globalReducer = (state, action) => {
    switch (action.type) {
      case OPEN_MODAL:
        return { ...state, modalOpen: true, modalContent: action.payload };
      case CLOSE_MODAL:
        return { ...state, modalOpen: false, modalContent: null };
      default:
        return state;
    }
  };

  
  export default globalReducer;