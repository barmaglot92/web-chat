import { useCallback, useEffect, useState } from "react";
import { ChatService } from "../services/ChatService/ChatService";
import constate from "constate";
import { IMessage, ISendMessage } from "../services/ChatService/types";
import { ChatApiConfig } from "../types";

interface IChatHookParams {
  apiConfig: ChatApiConfig;
}

const useChat = ({ apiConfig }: IChatHookParams) => {
  const [messages, setMessages] = useState([] as IMessage[]);

  const handleMessage = useCallback((message: IMessage) => {
    setMessages((prevMessages) => [...prevMessages.slice(-499), message]);
  }, []);

  const [chatService] = useState(
    new ChatService().init({
      apiConfig,
      onMessage: handleMessage,
    }),
  );

  const sendMessage = (msg: ISendMessage) => {
    chatService.sendMessage(msg);
  };

  useEffect(() => {
    const f = async () => {
      try {
        const messages = await chatService.getMessageHistory(apiConfig.chatId);
        console.log("getMessageHistory", messages);
        setMessages(messages);
      } catch (err) {
        console.error("getMessageHistory", err);
      }

      chatService.connect();
    };

    f();

    return () => {
      chatService.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { messages, sendMessage };
};

export const [ChatProvider, useChatContext] = constate(useChat);
