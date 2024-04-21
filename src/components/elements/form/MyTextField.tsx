import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";

interface Props {
  [x: string]: any;
  _label: string;
  setObjectField: (field: string, value: any) => void;
}

const MyTextField: React.FC<Props> = ({ _label, setObjectField, ...props }) => {
  const [label, setLabel] = useState("");
  const [field, setField] = useState("");

  useEffect(() => {
    setLabel(_label);
  }, [_label]);

  useEffect(() => {
    const f = props.field ? props.field : props.name;
    setField(f);
  }, [props]);

  const handleChange = (event: any) => {
    if (!setObjectField) return;
    setObjectField(field, event.target.value);
  };

  return (
    <TextField
      label={label}
      onFocus={handleChange}
      onChange={handleChange}
      {...props}
    />
  );
};

export { MyTextField };
