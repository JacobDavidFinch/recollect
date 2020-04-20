import React from 'react';
import CreatePage from '../../pages/create/create.page';
import {Dialog, DialogContent, DialogTitle} from '@material-ui/core';


export const EditModal = ({editCardMode, dispatch, user={}, tags, editCardIndex }) => {
    const {tests, userName, status, cards= []} = user;
    const handleClose = () => {
        dispatch({type: "edit", payload: undefined})
    }
    return (
        <Dialog
        open={editCardMode}
        onClose={handleClose}
        maxWidth='lg'
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Edit Card</DialogTitle>
        <DialogContent>
            <CreatePage/>
        </DialogContent>
      </Dialog>
    )
}

