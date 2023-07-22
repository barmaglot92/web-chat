export type ChatApiConfig = {
  wsUrl: string;
  apiUrl: string;
  token: string;
  chatId: number;
};

export type ChatProps = {
  apiConfig: ChatApiConfig;
};
