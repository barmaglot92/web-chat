import { useCallback, useEffect, useState } from "react";
import { ChatService } from "../services/ChatService/ChatService";
import constate from "constate";
import { IMessage, ISendMessage } from "../services/ChatService/types";
import { ChatApiConfig } from "../types";

interface IChatHookParams {
  apiConfig: ChatApiConfig;
  onTokenExpire?: () => void;
}

const DEFAULT_EXPIRE_TOKEN_HANDLER = () => {
  console.error("Token expired");
};

const useChat = ({
  apiConfig,
  onTokenExpire = DEFAULT_EXPIRE_TOKEN_HANDLER,
}: IChatHookParams) => {
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

  const sendMessage = (msg: ISendMessage, delay: number = 0) => {
    return new Promise((resolve) => {
      chatService.sendMessage(msg);
      setTimeout(resolve, delay);
    });
  };

  useEffect(() => {
    const f = async () => {
      try {
        const messages = await chatService.getMessageHistory(apiConfig.chatId);
        setMessages(messages);
      } catch (err) {
        onTokenExpire();
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
