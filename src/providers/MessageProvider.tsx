import { createContext, useState, useEffect } from "react";

import GeneralRepository from "repositories/general.repository";
import { MessageItem } from "components/message/MessageItem";

import Box from "@mui/material/Box";
import { CommonTools } from "tools/commontools";
import MessageDto from "dto/app/message.dto";
import { IProvider } from "interfaces/iprovider.interface";
import { ConfirmDialog } from "components/message/ConfirmDialog";

type Props = {
    RegisterMessage: (obj: MessageDto) => void;
    registerDialog: (
      title: any,
      content: any,
      actionConfirm: any,
      actionCancel?: any
    ) => void;
};
export const MessageContext = createContext<Props>({
    RegisterMessage: () => {},
    registerDialog: () => {},
});

export const MessageProvider: React.FC<IProvider> = ({ children }) => {
  const [messages, setMessages] = useState<any>([]);
  const [mesinfo, setMesInfo] = useState<any>(false);

  const RegisterMessage = (obj: MessageDto) => {
    if (!obj.code || obj.code == undefined || obj.code == null) return;
    obj.id = CommonTools.generateRandomString(10);

    const _m: any = [...messages, obj];
    setMessages(_m);
    const mi: any = obj.message === undefined ? false : obj.message;
    setMesInfo(mi);
  };

  const CloseMessage = (obj: MessageDto) => {
    let t: any = [];
    for (var i in messages) {
      if (messages[i].id == obj.id) continue;
      t.push(messages[i]);
    }
    setMessages(t);
  };

  // ----------------------------------------
  useEffect(() => {
    GeneralRepository.setMessagesF(RegisterMessage);
  }, []);

  const [openDialog, setOpenDialog] = useState<any>(false);
  const [titleDialog, setTitleDialog] = useState<any>("");
  const [contentDialog, setContentDialog] = useState<any>("");
  const [actionConfirmDialog, setActionConfirmDialog] = useState<any>(null);
  const [actionCancelDialog, setActionCancelDialog] = useState<any>(null);

  const registerDialog = (
    title: any,
    content: any,
    actionConfirm: any,
    actionCancel: any
  ) => {
    if (!title) return;
    if (!content) return;
    if (!actionConfirm) return;
    if (actionCancel) setActionCancelDialog(actionCancel);
    setTitleDialog(title);
    setContentDialog(content);
    setActionConfirmDialog(actionConfirm);
    setOpenDialog(true);
  };

  const handleConfirmActionDialog = () => {
    if (!actionConfirmDialog || !actionConfirmDialog.cb) return;
    actionConfirmDialog.cb();
    setOpenDialog(false);
    setTitleDialog("");
    setContentDialog("");
    setActionConfirmDialog(null);
    setActionCancelDialog(null);
  };
  const handleCancelActionDialog = () => {
    if (actionCancelDialog && actionCancelDialog.cb) actionCancelDialog.cb();
    setOpenDialog(false);
    setTitleDialog("");
    setContentDialog("");
    setActionConfirmDialog(null);
    setActionCancelDialog(null);
  };

  const processDialog = () => {
    if (!openDialog || !actionConfirmDialog) return <></>;
    return (
      <ConfirmDialog
        open={openDialog}
        setOpen={setOpenDialog}
        titleDialog={titleDialog}
        contentDialog={contentDialog}
        setTitleDialog={setTitleDialog}
        setContentDialog={setContentDialog}
        handleConfirm={handleConfirmActionDialog}
        handleCancel={handleCancelActionDialog}
      />
    );
  };
  // ----------------------------------------
  const processMessageList = () => {
    if (!messages) return <></>;
    if (!messages.length) return <></>;

    return (
      <Box sx={{ position: "fixed", bottom: "10px", right: "10px" }}>
        {messages.map((obj:any, i:any) => {
          return (
            <MessageItem _obj={obj} _closeMessage={CloseMessage} key={obj.id} />
          );
        })}
      </Box>
    );
  };

  const value = { RegisterMessage, registerDialog };

  return (
    <MessageContext.Provider value={value} >
      {children}

      {processMessageList()}
      {processDialog()}
    </MessageContext.Provider>
  );
};
