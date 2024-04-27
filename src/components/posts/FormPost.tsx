import { Box } from "@mui/material";
import { MyButton } from "components/elements/button/MyButton";
import { MyTextField } from "components/elements/form/MyTextField";
import { PostDto } from "dto/post.dto";
import useForm from "hooks/useForm";
import { usePost } from "hooks/usePost";
import React from "react";
import RequiredValidator from "validators/required.validator";

type Props = {
    handleClose: () => void;
}
const FormPost: React.FC<Props> = ({handleClose}) => {
  const [obj, isDisabled, setObjField] = useForm(
    new PostDto(),
    RequiredValidator.getValidators(["title", "content"])
  );
  const { addPost } = usePost();
  
  const handleSubmit = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    addPost(obj);
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
