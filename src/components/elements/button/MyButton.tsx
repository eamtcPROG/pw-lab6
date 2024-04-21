import React from "react";
import Button from "@mui/material/Button";

type MyButtonProps = {
  children: React.ReactNode;
  cb?:
    | ((event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | (() => void);
  type?: "button" | "submit" | "reset";
  [key: string]: any; // for the rest of the props which we do not have types for
};

const MyButton: React.FC<MyButtonProps> = ({
  children,
  cb,
  type,
  ...props
}) => {
  type = type ? type : "button";
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (type !== "submit") {
      e.stopPropagation();
      e.preventDefault();
    }

    if (cb !== undefined) {
      if (cb.length === 1) {
        cb(e);
      } else {
        cb();
      }
    }
  };

  return (
    <Button type={type} onClick={handleClick} {...props}>
      {children}
    </Button>
  );
};

export { MyButton };
