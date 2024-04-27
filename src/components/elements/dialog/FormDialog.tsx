import React from "react";

import { Dialog, IconButton, DialogContent, DialogTitle } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
type Props = {
  open: boolean;
  handleClose: () => void;
  title: string;
  children: React.ReactNode;
};

const FormDialog: React.FC<Props> = ({
  open,
  handleClose,
  title,
  children,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        {title}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
};

export { FormDialog };
