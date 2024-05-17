import React, { useEffect, useState } from "react";


import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const MessagesContainerPopUpConfirmDelete = ({
  open,
  setOpen,
  handleConfirmDelete,
  handleCancelDelete,
  showField,
  _obj,
  ...props
}) => {
  
  const [obj, setObj] = useState();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (_obj === undefined) {
      setOpen(false);
      return;
    }
    setObj(_obj);
  }, [_obj]);

  useEffect(() => {
    if (obj === undefined) {
      setOpen(false);
      return;
    }
    handleSetMessage();
  }, [obj]);

  const handleClose = () => {
    if (handleCancelDelete === undefined) {
      setOpen(false);
      return;
    }

    handleCancelDelete();
    setMessage("");
  };

  const confirmDelete = () => {
    if (handleConfirmDelete === undefined) {
      setOpen(false);
      return;
    }
    handleConfirmDelete();
    setMessage("");
  };

  const handleSetMessage = () => {
    if (obj === undefined) setOpen(false);
    if (showField === undefined) {
      setOpen(false);
      return;
    }
    if (obj[showField] === undefined) {
      setMessage("object");
      return;
    }

    setMessage(obj[showField]);
  };

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Delete_confirm</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Do you want to delete this object:
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={confirmDelete} color="secondary">
          Delete
        </Button>
        <Button onClick={handleClose} color="primary" autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { MessagesContainerPopUpConfirmDelete };
