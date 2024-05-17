import React from "react";
import { MessageTypes } from "tools/messagetypes";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
type Props = {
  _obj: any;
  _closeMessage: (obj: any) => void;
};
type Severity = "success" | "warning" | "error"
const MessageItem: React.FC<Props> = ({ _obj, _closeMessage, ...props }) => {
  const [obj, setObj] = React.useState(_obj);
  const [typeClass, setTypeClass] = React.useState<Severity
  >("success");

  const clMess = () => {
    if (!_closeMessage) return;
    _closeMessage(obj);
  };

  const processClassType = () => {
    let type:Severity = "success";

    if (obj && obj.mestype === MessageTypes.MESSAGE_SUCCESS) type = "success";
    if (obj && obj.mestype === MessageTypes.MESSAGE_WARNING) type = "warning";
    if (obj && obj.mestype === MessageTypes.MESSAGE_ERROR) type = "error";

    setTypeClass(type);
  };

  const processAutomatedClosed = () => {
    if (!obj) return;

    let exp = 10000;

    if (obj.mestype == MessageTypes.MESSAGE_SUCCESS)
      exp = parseInt(
        "10000"
      );
    if (obj.mestype == MessageTypes.MESSAGE_WARNING)
      exp = parseInt(
         "7000"
      );
    if (obj.mestype == MessageTypes.MESSAGE_ERROR)
      exp = parseInt(
        "5000"
      );
    if (isNaN(exp)) exp = 10000;

    const timer = setTimeout(() => {
      clMess();
    }, exp);
    return () => clearTimeout(timer);
  };

  // ----------------------------------------
  React.useEffect(() => {
    processClassType();
    processAutomatedClosed();
  }, [obj]);

  return obj ? (
    <Alert
      sx={{
        position: "absolute",
        fontSize: "12px",
        right: "10px",
        bottom: "10px",
        width: "350px",
      }}
      severity={typeClass}
      onClick={clMess}
      onClose={() => {}}
    >
      <AlertTitle>{obj.code}</AlertTitle>
      {obj.message}
    </Alert>
  ) : (
    <></>
  );
};

export { MessageItem };
