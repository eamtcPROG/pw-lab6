import React from "react";
import { Fab, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

type Props = {
  handleOnClick: () => void;
};
const AddPostButton: React.FC<Props> = ({ handleOnClick }) => {
  return (
    <Fab
      color="secondary"
      aria-label="add"
      component={IconButton}
      onClick={handleOnClick}
      sx={{
        position: 'absolute',
        bottom: 16,
        right: 16,
      }}
    >
      <AddIcon />
    </Fab>
  );
};

export { AddPostButton };
