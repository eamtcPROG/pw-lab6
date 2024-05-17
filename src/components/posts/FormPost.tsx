import { Box } from "@mui/material";
import { MyButton } from "components/elements/button/MyButton";
import { MyTextField } from "components/elements/form/MyTextField";
import { PostDto } from "dto/post.dto";
import useForm from "hooks/useForm";

import { AuthContext } from "providers/AuthProvider";
import React, { useContext } from "react";
import { CommonTools } from "tools/commontools";
import RequiredValidator from "validators/required.validator";

type Props = {
  handleClose: () => void;
  onSubmit: (obj: PostDto) => void;
  defaultObj?: PostDto;
};
const FormPost: React.FC<Props> = ({ handleClose, defaultObj, onSubmit }) => {
  const { user } = useContext(AuthContext);
  if (!defaultObj)
    defaultObj = new PostDto(CommonTools.processObjectField(user, ["id"]));
  const [obj, isDisabled, setObjField] = useForm(
    defaultObj,
    RequiredValidator.getValidators(["title", "content"])
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    onSubmit(obj);
    handleClose();
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Box>
          <MyTextField
            field={"title"}
            _label="Title"
            setObjectField={setObjField}
            value={obj.title}
          />
        </Box>
        <Box mt={3}>
          <MyTextField
            field={"content"}
            _label="Content"
            setObjectField={setObjField}
            value={obj.content}
          />
        </Box>
        <Box mt={3}>
          <MyButton disabled={isDisabled} type="submit" fullWidth>
            Post
          </MyButton>
        </Box>
      </form>
    </Box>
  );
};

export { FormPost };
