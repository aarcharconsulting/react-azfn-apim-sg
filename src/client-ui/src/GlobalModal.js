import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useGlobalState, useGlobalDispatch } from './Contexts/GlobalContext';
const GlobalModal = () => {
    const { modalOpen, modalContent } = useGlobalState();
    const dispatch = useGlobalDispatch();
  
    const handleClose = () => {
      dispatch({ type: 'CLOSE_MODAL' });
    };
  
    const handleButtonClick = (callback) => {
      handleClose(); 
      if (callback) callback(); 
    };
  
    const renderButtons = () => {
      const buttons = modalContent?.buttons?.length
        ? modalContent.buttons
        : [{ text: 'Close', callback: null }];
  
      return buttons.map((button, index) => (
        <Button
          key={index}
          onClick={() => handleButtonClick(button.callback)}
          color={button.type === 'primary' ? 'success' : 'error'}
        >
          {button.text}
        </Button>
      ));
    };

  return (
    <Dialog
      open={modalOpen}
      onClose={handleClose}
      maxWidth="md" 
      fullWidth={true} 
      sx={{
        '& .MuiDialog-paper': {
          width: '100%',
          maxWidth: '600px',
        },
      }}
    >
      <DialogTitle>{modalContent?.title || 'Modal Title'}</DialogTitle>
      <DialogContent>
        {modalContent?.content}
      </DialogContent>
      <DialogActions>
      {renderButtons()}
      </DialogActions>
    </Dialog>
  );
};

export default GlobalModal;
