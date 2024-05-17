import React from "react";
import { useResource } from "hooks/useResource";



import Button from "@mui/material/Button";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { Typography } from "@mui/material";



type ConfirmDialogProps = {

    open: boolean;
    setOpen: (open: boolean) => void;
    titleDialog: string;
    contentDialog: string;
    setTitleDialog: any
    setContentDialog: any
    handleConfirm: () => void;
    handleCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
    open,
    setOpen,
    titleDialog,
    contentDialog,
    setTitleDialog,
    setContentDialog,
    handleConfirm,
    handleCancel,
    ...props
}) => {




    const handleClose = () => {
        if (handleCancel === undefined) {
            setOpen(false);
            setTitleDialog('');
            setContentDialog('');
            return;
        }
        handleCancel();
        setTitleDialog('');
        setContentDialog('');
        setOpen(false); 
    };

    const confirmAction = () => {
        if (handleConfirm === undefined) { 
            setTitleDialog('');
            setContentDialog('');
            setOpen(false); 
            return; 
        }
        handleConfirm();
        setTitleDialog('');
        setContentDialog('');
        setOpen(false); 
    }

    return (
        <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{titleDialog}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Typography>{contentDialog}</Typography>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={confirmAction} color="secondary" >
                    Confirm
                </Button>
                <Button onClick={handleClose} color="primary" autoFocus>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export { ConfirmDialog };
