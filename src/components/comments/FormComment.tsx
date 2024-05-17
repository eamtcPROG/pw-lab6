import { Box } from "@mui/material";
import { MyButton } from "components/elements/button/MyButton";
import { MyTextField } from "components/elements/form/MyTextField";
import { CommentDto } from "dto/comment.dto";

import useForm from "hooks/useForm";
import { AuthContext } from "providers/AuthProvider";

import React, { useContext, useState } from "react";
import { CommonTools } from "tools/commontools";
import RequiredValidator from "validators/required.validator";

type Props = {
  id: string;
  onSubmit: (obj: CommentDto) => void;
};
const FormComment: React.FC<Props> = ({ id, onSubmit }) => {
  const { user } = useContext(AuthContext);
  
  const [obj, isDisabled, setObjField] = useForm(
    new CommentDto(id, CommonTools.processObjectField(user, ["id"])),
    RequiredValidator.getValidators(["content"])
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    onSubmit(obj);
  };
  if (!user) return null;
  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <MyTextField
          field={"content"}
          _label="Comment"
          setObjectField={setObjField}
          value={obj.content}
        />
        <MyButton disabled={isDisabled} type="submit" ml={1}>
          Post
        </MyButton>
      </form>
    </Box>
  );
};

export { FormComment };
